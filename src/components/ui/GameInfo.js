import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import ViewingGuide from "./ViewingGuide";

const GameInfo = ({
  game,
  userTimezone,
  watchLocation,
  viewingOptions,
  teamCities,
  locations,
  teams,
  teamDetails
}) => {
  const gameTime = new Date(game.time);
  const options = {
    timeZone: userTimezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const localTime = gameTime.toLocaleString("en-US", options);
  const originalTime = gameTime.toLocaleString("en-US", {
    ...options,
    timeZone: "UTC",
  });

  const team1Info = teamCities[game.team1] || {};
  const team2Info = teamCities[game.team2] || {};

  const watchLocationInfo = watchLocation
    ? locations.find((l) => l.id === watchLocation)
    : null;

  const team1 = teams.find((t) => t.id === game.team1);
  const team2 = teams.find((t) => t.id === game.team2);

  return (
    <Card className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {team1 ? team1.name : "Team 1"} vs {team2 ? team2.name : "Team 2"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center mb-2">
              <Clock className="mr-2 text-blue-500" />
              <span className="text-sm">Local Time: {localTime}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 text-green-500" />
              <span className="text-sm">
                Original Time (UTC): {originalTime}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <MapPin className="mr-2 text-red-500" />
              <span className="text-sm">
                Your Location:{" "}
                {watchLocationInfo ? watchLocationInfo.name : "Not set"}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 text-purple-500" />
              <span className="text-sm">
                Teams: {team1Info.city || "Unknown"} vs {team2Info.city || "Unknown"}
              </span>
            </div>
          </div>
        </div>
        {watchLocationInfo && (
          <ViewingGuide
            league={game.league}
            teams={[team1?.name, team2?.name].filter(Boolean)}
            location={watchLocationInfo.country.toLowerCase()}
            viewingOptions={viewingOptions}
            teamDetails={teamDetails}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default GameInfo;