import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { formatInTimeZone } from 'date-fns-tz';
import { parseISO } from 'date-fns';
import { MapPin, Clock, Tv, Calendar } from "lucide-react";

const IconLabel = ({ icon: Icon, label }) => (
  <div className="flex items-center space-x-1 text-sm text-gray-500">
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </div>
);

const GameSchedule = ({
  filteredGames,
  watchLocation,
  locations,
  viewingOptions,
  teamCities,
  teamDetails,
  selectedLeague,
  userTimezone,
  isPremierLeague
}) => {
  const getTeamName = (teamId) => teamDetails[teamId]?.name || teamId;
  const getTeamCity = (teamId) => teamCities[teamId] || { city: "Unknown", country: "Unknown" };
  
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
        <Card key={index} className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
            <h2 className="text-xl font-bold">
              {isPremierLeague 
                ? `${game.Home} vs ${game.Away}`
                : `${getTeamName(game.team1)} vs ${getTeamName(game.team2)}`
              }
            </h2>
          </div>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <IconLabel icon={Calendar} label="Date & Time" />
                <p className="font-semibold">
                  {isPremierLeague
                    ? `${game.Date}, ${game.Time}`
                    : formatGameTime(game.time)
                  }
                </p>
              </div>
              <div>
                <IconLabel icon={MapPin} label="Venue" />
                <p className="font-semibold">
                  {isPremierLeague 
                    ? `${game.Home} Stadium`
                    : (game.venue || `${getTeamName(game.team1)} Stadium`)
                  }
                </p>
              </div>
              <div>
                <IconLabel icon={Tv} label="Broadcast" />
                <p className="font-semibold">
                  {isPremierLeague
                    ? (game.onSky ? "Sky Sports" : "Not on Sky Sports")
                    : (viewingOptions[selectedLeague]?.services?.join(", ") || "TBA")
                  }
                </p>
              </div>
            </div>
            {watchLocation && (
              <div className="mt-4 p-2 bg-blue-50 rounded-md">
                <IconLabel icon={MapPin} label="Your Watch Location" />
                <p className="font-semibold">{locations.find((loc) => loc.id === watchLocation)?.name || "N/A"}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GameSchedule;