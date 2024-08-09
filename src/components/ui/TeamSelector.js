// TeamSelector.js
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const TeamSelector = ({ teams, selectedLeague, selectedTeams, handleTeamToggle }) => (
  <div className="grid grid-cols-2 gap-4">
    {teams
      .filter((team) => team.league === selectedLeague)
      .map((team) => (
        <div key={team.id} className="flex items-center space-x-2">
          <Checkbox
            id={team.id}
            checked={selectedTeams.includes(team.id)}
            onCheckedChange={() => handleTeamToggle(team.id)}
          />
          <label htmlFor={team.id} className="text-sm">
            {team.name}
          </label>
        </div>
      ))}
  </div>
);

export default TeamSelector;