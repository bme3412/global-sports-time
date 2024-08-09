// src/data/restructuredSportsData.js

import { leagues, teams } from './mockData';

const groupLeaguesBySport = () => {
  const sportGroups = {};
  
  leagues.forEach(league => {
    const [, sport] = league.name.match(/\((.*?)\)/) || [null, 'Other'];
    if (!sportGroups[sport]) {
      sportGroups[sport] = [];
    }
    sportGroups[sport].push(league);
  });

  return Object.entries(sportGroups).map(([sport, leagues]) => ({
    sport,
    leagues: leagues.map(league => ({
      ...league,
      teams: teams.filter(team => team.league === league.id)
    }))
  }));
};

export const sportsData = groupLeaguesBySport();