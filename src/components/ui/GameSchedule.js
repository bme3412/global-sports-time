import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { formatInTimeZone } from 'date-fns-tz';
import { parseISO } from 'date-fns';
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
  'uk': 'uk',
  'ca': 'canada',
  'au': 'australia',
  'in': 'india',
  'fr': 'france',
  'de': 'germany',
  'es': 'spain',
  'br': 'brazil',
  'mx': 'mexico',
  'cn': 'china',
  'jp': 'japan',
  // Add more mappings as needed
};

const GameSchedule = ({
  filteredGames,
  watchLocation,
  locations,
  viewingOptions,
  teamDetails,
  selectedLeague,
  userTimezone,
  isPremierLeague,
  userCountry
}) => {
  const [currentViewingInfo, setCurrentViewingInfo] = useState({});

  useEffect(() => {
    if (isPremierLeague && viewingOptions && userCountry) {
      const mappedCountry = countryCodeMapping[userCountry] || userCountry;
      const countryInfo = viewingOptions[mappedCountry] || viewingOptions['us'] || {};
      setCurrentViewingInfo(countryInfo);
      console.log("Updated viewing info for country:", mappedCountry, countryInfo); // Debug log
    } else {
      setCurrentViewingInfo(viewingOptions || {});
    }
  }, [isPremierLeague, viewingOptions, userCountry]);

  const getTeamName = (teamId) => teamDetails[teamId]?.name || teamId;
  
  const formatGameTime = (time) => {
    if (!time) return 'Time TBA';
    try {
      const date = typeof time === 'string' ? parseISO(time) : new Date(time);
      return formatInTimeZone(date, userTimezone, 'MMM d, HH:mm');
    } catch (error) {
      console.error('Error formatting game time:', error);
      return 'Invalid Date';
    }
  };

  return (
    <div className="space-y-4">
      {filteredGames.map((game, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                label="Date & Time"
                value={isPremierLeague
                  ? `${game.Date}, ${game.Time}`
                  : formatGameTime(game.time)
                }
              />
              <IconLabel
                icon={MapPin}
                label="Venue"
                value={isPremierLeague
                  ? `${game.Home} Stadium`
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
      ))}
    </div>
  );
};

export default GameSchedule;