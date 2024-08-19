import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  }, [filteredGames, watchDateRange, selectedLeague]);

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

  const renderGameInfo = (game, index) => {
    const watchLocationTimezone = getWatchLocationTimezone();
    const gameTimezone = teamDetails[game.Home]?.timezone || userTimezone;

    const isSelected = selectedGame && selectedGame.id === game.id;

    const homeTeam = game.Home || 'TBA';
    const awayTeam = game.Away || 'TBA';

    return (
      <Card 
        key={index} 
        className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${isSelected ? 'border-2 border-blue-500' : ''}`}
        onClick={() => handleGameClick(game)}
      >
        <CardContent className="p-6">
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
        </CardContent>
      </Card>
    );
  };
 
  return (
    <div className="space-y-4">
      {gamesInRange.length > 0 && (
        <div className="bg-blue-100 p-4 rounded-md shadow-sm">
          <p className="text-blue-800 font-medium">
            Showing data for {summary.games} game{summary.games !== 1 ? 's' : ''} between {summary.teams} team{summary.teams !== 1 ? 's' : ''} at {summary.locations} location{summary.locations !== 1 ? 's' : ''}:
          </p>
        </div>
      )}
      {gamesInRange.map((game, index) => renderGameInfo(game, index))}
    </div>
  );
};

export default GameSchedule;