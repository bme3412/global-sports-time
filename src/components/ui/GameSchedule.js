// src/components/ui/GameSchedule.js

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import GameInfo from "./GameInfo";

const GameSchedule = ({
  filteredGames,
  watchDate,
  watchLocation,
  locations,
  viewingOptions,
  teamCities,
  teams,
  teamDetails
}) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">
      {watchDate
        ? `Games on ${new Date(watchDate).toDateString()}`
        : "Upcoming Games"}
    </h2>
    {filteredGames.map((game) => (
      <GameInfo
        key={game.id}
        game={game}
        userTimezone={
          watchLocation
            ? locations.find((loc) => loc.id === watchLocation).timezone
            : "UTC"
        }
        watchLocation={watchLocation}
        viewingOptions={viewingOptions}
        teamCities={teamCities}
        locations={locations}
        teams={teams}
        teamDetails={teamDetails}  // Pass the teamDetails
      />
    ))}
    {filteredGames.length === 0 && (
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-gray-600 dark:text-gray-300">
            No games found for the selected criteria. Try selecting a
            different date or teams.
          </p>
        </CardContent>
      </Card>
    )}
  </div>
);

export default GameSchedule;