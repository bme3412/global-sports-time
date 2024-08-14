// TeamSelector.js
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const TeamSelector = ({ teams, selectedTeams, handleTeamToggle }) => (
  <div>
    <h2 className="text-lg font-semibold mb-2">Select Teams</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {teams.map((team) => (
        <div key={team.id} className="flex items-center space-x-2">
          <Checkbox
            id={team.id}
            checked={selectedTeams.includes(team.id)}
            onCheckedChange={() => handleTeamToggle(team.id)}
          />
          <label htmlFor={team.id} className="text-sm cursor-pointer">
            {team.name}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default TeamSelector;