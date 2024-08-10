// src/components/ui/GameSchedule.js
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatInTimeZone } from 'date-fns-tz';
import { MapPin, Clock, Tv } from "lucide-react";

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3 mb-3 p-3 bg-gray-50 rounded-lg shadow-sm">
    <div className={`p-2 rounded-full ${label.includes("Location") ? "bg-blue-100" : "bg-green-100"}`}>
      <Icon className={`w-5 h-5 ${label.includes("Location") ? "text-blue-600" : "text-green-600"}`} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const GameSchedule = ({
  filteredGames,
  watchDate,
  watchLocation,
  locations,
  viewingOptions,
  teamCities,
  teams,
  teamDetails,
  selectedLeague,
  userTimezone
}) => {
  const getTeamName = (teamId) => {
    return teamDetails[teamId]?.name || `Team ${teamId}`;
  };

  const getTeamCity = (teamId) => {
    return teamCities[teamId] || { city: "Unknown", country: "Unknown", timezone: "UTC" };
  };

  return (
    <div className="space-y-4">
      {filteredGames.map((game) => (
        <Card key={game.id} className="mb-4">
          <CardHeader>
            <CardTitle>
              {getTeamName(game.team1)} vs {getTeamName(game.team2)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Game Time</h3>
                <InfoItem
                  icon={Clock}
                  label="Kickoff"
                  value={formatInTimeZone(new Date(game.time), userTimezone, 'yyyy-MM-dd HH:mm zzz')}
                />
              </div>

              <div>
                <h3 className="font-semibold mb-2">Viewing Details</h3>
                {watchLocation && (
                  <InfoItem
                    icon={MapPin}
                    label="Watch Location"
                    value={locations.find((loc) => loc.id === watchLocation)?.name || "N/A"}
                  />
                )}
                <InfoItem
                  icon={Tv}
                  label="Viewing Options"
                  value={viewingOptions[selectedLeague]?.services?.join(", ") || "N/A"}
                />
              </div>

              <div>
                <h3 className="font-semibold mb-2">Venue Information</h3>
                <InfoItem icon={MapPin} label="Venue" value={game.venue || "N/A"} />
                <InfoItem
                  icon={MapPin}
                  label="Location"
                  value={`${getTeamCity(game.team1).city}, ${getTeamCity(game.team1).country}`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GameSchedule;