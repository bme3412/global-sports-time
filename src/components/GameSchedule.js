import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatInTimeZone } from "date-fns-tz";
import { parse, format, isWithinInterval } from "date-fns";
import {
  MapPin,
  Clock,
  Tv,
  Calendar,
  DollarSign,
  AlertTriangle,
  Info,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const IconLabel = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-2 text-sm">
    <Icon className="w-4 h-4 text-gray-500" />
    <span className="text-gray-500">{label}:</span>
    <span className="font-semibold">{value}</span>
  </div>
);

const GameSchedule = ({
  filteredGames,
  watchDateRange,
  watchLocation,
  locations,
  viewingOptions,
  teamDetails,
  selectedLeague,
  userTimezone,
  userCountry,
  onGameSelect,
  selectedGame,
}) => {
  const [currentViewingInfo, setCurrentViewingInfo] = useState({});
  const [gamesInRange, setGamesInRange] = useState([]);
  const [summary, setSummary] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(5);

  useEffect(() => {
    console.log("ViewingOptions:", viewingOptions);
    console.log("UserCountry:", userCountry);
    if (viewingOptions && userCountry) {
      const countryInfo =
        viewingOptions[userCountry.toLowerCase()] || viewingOptions["us"] || {};
      console.log("Selected Country Info:", countryInfo);
      setCurrentViewingInfo(countryInfo);
    } else {
      setCurrentViewingInfo({});
    }
  }, [viewingOptions, userCountry]);

  useEffect(() => {
    if (watchDateRange && watchDateRange.start && watchDateRange.end) {
      const startDate = parse(watchDateRange.start, "yyyy-MM-dd", new Date());
      const endDate = parse(watchDateRange.end, "yyyy-MM-dd", new Date());

      const filteredGamesInRange = filteredGames.filter((game) => {
        const gameDate = parseGameDate(game.Date || game.date);
        return isWithinInterval(gameDate, { start: startDate, end: endDate });
      });

      setGamesInRange(filteredGamesInRange);
      updateSummary(filteredGamesInRange);
    } else {
      setGamesInRange(filteredGames);
      updateSummary(filteredGames);
    }
    setCurrentPage(1); // Reset to first page when games change
  }, [filteredGames, watchDateRange, selectedLeague]);

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('gameFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const updateSummary = (games) => {
    const teams = new Set();
    const locations = new Set();
    games.forEach(game => {
      teams.add(game.Home);
      teams.add(game.Away);
      locations.add(getStadiumInfo(game.Home));
    });
    setSummary({
      games: games.length,
      teams: teams.size,
      locations: locations.size
    });
  };

  const parseGameDate = (dateString) => {
    return parse(dateString, 'EEEE d MMMM yyyy', new Date());
  };

  const formatGameTime = (dateString, timeString, sourceTimezone, targetTimezone) => {
    if (!dateString || !timeString) return 'Time TBA';
    try {
      const parsedDate = parseGameDate(dateString);
      const [hours, minutes] = timeString.split(':');
      parsedDate.setHours(parseInt(hours), parseInt(minutes));
      
      return formatInTimeZone(parsedDate, targetTimezone, 'MMM d, yyyy HH:mm zzz');
    } catch (error) {
      console.error('Error formatting game time:', error, { dateString, timeString, sourceTimezone, targetTimezone });
      return 'Invalid Date';
    }
  };

  const getStadiumInfo = (teamName) => {
    const team = teamDetails[teamName];
    if (!team) return `${teamName} Stadium`;

    const venueName = team.homeArena || team.venue || team.stadium || team.ground || team.homeStadium;
    const cityName = team.city || team.location;

    if (venueName && cityName) {
      return `${venueName}, ${cityName}`;
    } else if (venueName) {
      return venueName;
    } else {
      return `${teamName} Stadium`;
    }
  };

  const getWatchLocationTimezone = () => {
    const selectedLocation = locations.find((loc) => loc.id === watchLocation);
    return selectedLocation ? selectedLocation.timezone : userTimezone;
  };

  const handleGameClick = (game) => {
    console.log("Game clicked:", game);
    onGameSelect(game);
  };

  const getTeamName = (teamId) => {
    const team = teamDetails[teamId];
    return team ? team.name : teamId;
  };

  const toggleFavorite = (gameId) => {
    const newFavorites = favorites.includes(gameId)
      ? favorites.filter(id => id !== gameId)
      : [...favorites, gameId];
    
    setFavorites(newFavorites);
    localStorage.setItem('gameFavorites', JSON.stringify(newFavorites));
  };

  const renderGameInfo = (game, index) => {
    const watchLocationTimezone = getWatchLocationTimezone();
    const gameTimezone = teamDetails[game.Home]?.timezone || userTimezone;

    const isSelected = selectedGame && selectedGame.id === game.id;
    const isFavorite = favorites.includes(game.id);

    const homeTeam = game.Home || 'TBA';
    const awayTeam = game.Away || 'TBA';

    return (
      <Card 
        key={index} 
        className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${isSelected ? 'border-2 border-blue-500' : ''}`}
      >
        <CardContent className="p-6 relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(game.id);
            }}
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <Heart
              className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            />
          </button>
          <div onClick={() => handleGameClick(game)}>
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {`${getTeamName(homeTeam)} vs ${getTeamName(awayTeam)}`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <IconLabel
                icon={Calendar}
                label="Game Time"
                value={formatGameTime(game.Date, game.Time, gameTimezone, gameTimezone)}
              />
              <IconLabel
                icon={Clock}
                label="Your Local Time"
                value={formatGameTime(game.Date, game.Time, gameTimezone, watchLocationTimezone)}
              />
              <IconLabel
                icon={MapPin}
                label="Venue"
                value={getStadiumInfo(homeTeam)}
              />
              <IconLabel
                icon={Tv}
                label="Broadcast"
                value={
                  currentViewingInfo.services
                    ? currentViewingInfo.services.map((s) => s.name).join(", ")
                    : "TBA"
                }
              />
              <IconLabel
                icon={MapPin}
                label="Your Watch Location"
                value={
                  locations.find((loc) => loc.id === watchLocation)?.name ||
                  "Not specified"
                }
              />
              {currentViewingInfo.cost && (
                <IconLabel
                  icon={DollarSign}
                  label="Viewing Cost"
                  value={currentViewingInfo.cost}
                />
              )}
              {currentViewingInfo.restrictions && (
                <IconLabel
                  icon={AlertTriangle}
                  label="Restrictions"
                  value={currentViewingInfo.restrictions}
                />
              )}
              {currentViewingInfo.additionalInfo && (
                <IconLabel
                  icon={Info}
                  label="Additional Info"
                  value={currentViewingInfo.additionalInfo}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Pagination logic
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = gamesInRange.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(gamesInRange.length / gamesPerPage);

  return (
    <div className="space-y-4">
      {gamesInRange.length > 0 && (
        <div className="bg-blue-100 p-4 rounded-md shadow-sm">
          <p className="text-blue-800 font-medium">
            Showing data for {summary.games} game{summary.games !== 1 ? 's' : ''} between {summary.teams} team{summary.teams !== 1 ? 's' : ''} at {summary.locations} location{summary.locations !== 1 ? 's' : ''}:
          </p>
        </div>
      )}
      {currentGames.map((game, index) => renderGameInfo(game, index))}
      
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameSchedule;