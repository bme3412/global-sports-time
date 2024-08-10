// src/components/SportSelector.js

import React from 'react';
import { Button } from "@/components/ui/button";

const sportEmojis = {
  'Basketball': '🏀',
  'Soccer': '⚽',
  'American Football': '🏈',
  'Baseball': '⚾',
  'Ice Hockey': '🏒',
  'Cricket': '🏏',
  'Rugby': '🏉',
  'Motorsport': '🏎️',
  'Mixed Martial Arts': '🥋',
  'Other': '🎾'
};

const SportLeagueSelector = ({ sports, sportGroups, selectedSport, setSelectedSport, selectedLeague, setSelectedLeague }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Select a Sport</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {sports.map((sport) => (
          <button
            key={sport}
            onClick={() => {
              setSelectedSport(sport);
              setSelectedLeague(sportGroups[sport][0].id);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out
              ${selectedSport === sport
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            {sportEmojis[sport] || sportEmojis['Other']} {sport}
          </button>
        ))}
      </div>

      {selectedSport && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Select a League</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {sportGroups[selectedSport].map((league) => (
              <Button
                key={league.id}
                variant={selectedLeague === league.id ? "default" : "outline"}
                onClick={() => setSelectedLeague(league.id)}
              >
                {league.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {selectedLeague && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Select Team</h2>
          {/* Team checkboxes will be rendered here */}
        </div>
      )}
    </div>
  );
};

export default SportLeagueSelector;