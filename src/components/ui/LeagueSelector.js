// LeagueSelector.js
import React from "react";
import { Button } from "@/components/ui/button";

const LeagueSelector = ({ leagues, selectedLeague, setSelectedLeague }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {leagues.map((league) => (
      <Button
        key={league.id}
        variant={selectedLeague === league.id ? "default" : "outline"}
        onClick={() => setSelectedLeague(league.id)}
      >
        {league.name}
      </Button>
    ))}
  </div>
);

export default LeagueSelector;