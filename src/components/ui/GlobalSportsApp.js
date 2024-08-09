"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import SportSelector from "./SportSelector";
import LeagueSelector from "./LeagueSelector";
import TeamSelector from "./TeamSelector";
import TeamInfo from "./TeamInfo";
import LocationSelector from "./LocationSelector";
import GameSchedule from "./GameSchedule";

import { leagues, teams, locations, games, viewingOptions } from "../../data/mockData";

// Group leagues by sport
const sportGroups = leagues.reduce((acc, league) => {
  const [, sport] = league.name.match(/\((.*?)\)/) || [null, 'Other'];
  if (!acc[sport]) {
    acc[sport] = [];
  }
  acc[sport].push(league);
  return acc;
}, {});

const sports = Object.keys(sportGroups);

// Create an object with team names as keys for easier lookup
const teamDetails = teams.reduce((acc, team) => {
  acc[team.name] = team;
  return acc;
}, {});

const teamCities = teams.reduce((acc, team) => {
  acc[team.id] = {
    city: team.city,
    state: team.state,
    country: team.country,
    timezone: team.timezone,
  };
  return acc;
}, {});

export default function GlobalSportsApp() {
  const [selectedSport, setSelectedSport] = useState(sports[0]);
  const [selectedLeague, setSelectedLeague] = useState(sportGroups[sports[0]][0].id);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [watchLocation, setWatchLocation] = useState("");
  const [watchDate, setWatchDate] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    const now = new Date();
    const newFilteredGames = games.filter((game) => {
      const gameDate = new Date(game.time);
      return (
        game.league === selectedLeague &&
        (selectedTeams.length === 0 ||
          selectedTeams.includes(game.team1) ||
          selectedTeams.includes(game.team2)) &&
        (watchDate
          ? gameDate.toDateString() === new Date(watchDate).toDateString()
          : gameDate >= now)
      );
    });
    newFilteredGames.sort((a, b) => new Date(a.time) - new Date(b.time));
    setFilteredGames(newFilteredGames);
  }, [selectedLeague, selectedTeams, watchDate]);

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
    setSelectedLeague(sportGroups[sport][0].id);
    setSelectedTeams([]);
  };

  const handleTeamToggle = (teamId) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const getTeamLocation = () => {
    if (selectedTeams.length === 1) {
      const teamInfo = teamCities[selectedTeams[0]];
      return `${teamInfo.city}, ${teamInfo.state ? teamInfo.state + ", " : ""}${
        teamInfo.country
      }`;
    }
    return "";
  };

  const getTeamTimezone = () => {
    if (selectedTeams.length === 1) {
      return teamCities[selectedTeams[0]].timezone;
    }
    return "";
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <MapPin className="mr-2 text-red-500" />
              Team Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SportSelector
              sports={sports}
              selectedSport={selectedSport}
              setSelectedSport={handleSportChange}
            />
            <LeagueSelector
              leagues={sportGroups[selectedSport]}
              selectedLeague={selectedLeague}
              setSelectedLeague={setSelectedLeague}
            />
            <TeamSelector
              teams={teams.filter(team => sportGroups[selectedSport].some(league => league.id === team.league))}
              selectedLeague={selectedLeague}
              selectedTeams={selectedTeams}
              handleTeamToggle={handleTeamToggle}
            />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <MapPin className="mr-2 text-red-500" />
              Game Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TeamInfo
              getTeamLocation={getTeamLocation}
              getTeamTimezone={getTeamTimezone}
            />
            <LocationSelector
              locations={locations}
              setWatchLocation={setWatchLocation}
              watchDate={watchDate}
              setWatchDate={setWatchDate}
            />
          </CardContent>
        </Card>
      </div>

      <GameSchedule
        filteredGames={filteredGames}
        watchDate={watchDate}
        watchLocation={watchLocation}
        locations={locations}
        viewingOptions={viewingOptions}
        teamCities={teamCities}
        teams={teams}
        teamDetails={teamDetails}
      />
    </div>
  );
}