// src/components/SportSelector.js

import React from 'react';

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

const SportSelector = ({ sports, selectedSport, setSelectedSport }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Select a Sport</h2>
      <div className="flex flex-wrap gap-2">
        {sports.map((sport) => (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport)}
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
    </div>
  );
};

export default SportSelector;