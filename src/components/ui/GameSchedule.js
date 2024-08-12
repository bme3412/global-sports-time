import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { formatInTimeZone } from 'date-fns-tz';
import { parse, format, isWithinInterval } from 'date-fns';
import { MapPin, Clock, Tv, Calendar, DollarSign, AlertTriangle, Info } from "lucide-react";

const IconLabel = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-2 text-sm">
    <Icon className="w-4 h-4 text-gray-500" />
    <span className="text-gray-500">{label}:</span>
    <span className="font-semibold">{value}</span>
  </div>
);

const countryCodeMapping = {
  'us': 'us',
  'gb': 'gb',
  'ca': 'ca',
  'au': 'au',
  'in': 'in',
  'fr': 'fr',
  'de': 'de',
  'es': 'es',
  'br': 'br',
  'mx': 'mx',
  'cn': 'cn',
  'jp': 'jp',
  'nl': 'nl',
  'se': 'se',
  'no': 'no',
  'dk': 'dk',
  'za': 'za',
  'ae': 'ae',
  'sg': 'sg',
  'th': 'th',
  'eg': 'eg',
  'kr': 'kr',
  'tr': 'tr',
  'ru': 'ru'
};

const GameSchedule = ({
    filteredGames,
    watchDateRange,
    watchLocation,
    locations,
    viewingOptions,
    teamDetails,
    selectedLeague,
    userTimezone,
    isPremierLeague,
    userCountry,
    premierLeagueTeams,
    onGameSelect,
    selectedGame
  }) => {
  const [currentViewingInfo, setCurrentViewingInfo] = useState({});
  const [gamesInRange, setGamesInRange] = useState([]);

  useEffect(() => {
    if (isPremierLeague && viewingOptions && userCountry) {
      const mappedCountry = countryCodeMapping[userCountry] || userCountry;
      const countryInfo = viewingOptions[mappedCountry] || viewingOptions['us'] || {};
      setCurrentViewingInfo(countryInfo);
    } else {
      setCurrentViewingInfo(viewingOptions || {});
    }
  }, [isPremierLeague, viewingOptions, userCountry]);

  useEffect(() => {
    if (watchDateRange && watchDateRange.start && watchDateRange.end) {
      const startDate = parse(watchDateRange.start, 'yyyy-MM-dd', new Date());
      const endDate = parse(watchDateRange.end, 'yyyy-MM-dd', new Date());
      
      const filteredGamesInRange = filteredGames.filter(game => {
        const gameDate = parse(game.Date, 'EEEE d MMMM yyyy', new Date());
        return isWithinInterval(gameDate, { start: startDate, end: endDate });
      });

      setGamesInRange(filteredGamesInRange);
    } else {
      setGamesInRange(filteredGames);
    }
  }, [filteredGames, watchDateRange]);

  const formatGameTime = (dateString, timeString, sourceTimezone, targetTimezone) => {
    if (!dateString || !timeString) return 'Time TBA';
    try {
      const parsedDate = parse(dateString, 'EEEE d MMMM yyyy', new Date());
      const [hours, minutes] = timeString.split(':');
      const gameDate = new Date(parsedDate);
      gameDate.setHours(parseInt(hours), parseInt(minutes));
      return formatInTimeZone(gameDate, targetTimezone, 'MMM d, HH:mm zzz');
    } catch (error) {
      console.error('Error formatting game time:', error);
      return 'Invalid Date';
    }
  };

  const getStadiumInfo = (teamName) => {
    if (!Array.isArray(premierLeagueTeams)) {
      console.error('premierLeagueTeams is not an array:', premierLeagueTeams);
      return `${teamName} Stadium`;
    }
    const team = premierLeagueTeams.find(t => t.name === teamName);
    if (team) {
      console.log(`Found team: ${team.name}, Stadium: ${team.homeStadium}`); // Debug log
      return `${team.homeStadium}, ${team.city}`;
    } else {
      console.log(`Team not found: ${teamName}`); // Debug log
      return `${teamName} Stadium`;
    }
  };

  const getWatchLocationTimezone = () => {
    const selectedLocation = locations.find(loc => loc.id === watchLocation);
    return selectedLocation ? selectedLocation.timezone : userTimezone;
  };

  const handleGameClick = (game) => {
    console.log("Game clicked:", game); // Debug log
    onGameSelect(game);
  };

  return (
    <div className="space-y-4">
      {gamesInRange.map((game, index) => {
        const watchLocationTimezone = getWatchLocationTimezone();
        const gameTimezone = isPremierLeague 
          ? teamDetails[game.Home]?.timezone || userTimezone
          : teamDetails[game.team1]?.timezone || userTimezone;

        const isSelected = selectedGame && selectedGame.id === game.id;

        return (
          <Card 
            key={index} 
            className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${isSelected ? 'border-2 border-blue-500' : ''}`}
            onClick={() => handleGameClick(game)}
          >
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {isPremierLeague
                  ? `${game.Home} vs ${game.Away}`
                  : `${getTeamName(game.team1)} vs ${getTeamName(game.team2)}`
                }
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <IconLabel
                  icon={Calendar}
                  label="Game Time"
                  value={isPremierLeague
                    ? formatGameTime(game.Date, game.Time, gameTimezone, gameTimezone)
                    : formatGameTime(game.date, game.time, gameTimezone, gameTimezone)
                  }
                />
                {watchLocation && (
                  <IconLabel
                    icon={Clock}
                    label="Your Local Time"
                    value={isPremierLeague
                      ? formatGameTime(game.Date, game.Time, gameTimezone, watchLocationTimezone)
                      : formatGameTime(game.date, game.time, gameTimezone, watchLocationTimezone)
                    }
                  />
                )}
                <IconLabel
                  icon={MapPin}
                  label="Venue"
                  value={isPremierLeague
                    ? getStadiumInfo(game.Home)
                    : (game.venue || `${getTeamName(game.team1)} Stadium`)
                  }
                />
                <IconLabel
                  icon={Tv}
                  label="Broadcast"
                  value={currentViewingInfo.services ? currentViewingInfo.services.join(", ") : "TBA"}
                />
                {watchLocation && (
                  <IconLabel
                    icon={MapPin}
                    label="Your Watch Location"
                    value={locations.find((loc) => loc.id === watchLocation)?.name || "N/A"}
                  />
                )}
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
      })}
    </div>
  );
};

export default GameSchedule;