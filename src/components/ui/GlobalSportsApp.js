import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import SportLeagueSelector from "./SportSelector";
import TeamSelector from "./TeamSelector";
import LocationSelector from "./LocationSelector";
import GameSchedule from "./GameSchedule";

// Import JSON data
import leaguesData from "@/data/leagues.json";
import locationsData from "@/data/locations.json";
import nbaTeamsData from "@/data/teams/nba_teams.json";
import premierLeagueTeamsData from "@/data/teams/premierleague_teams.json";
import euroLeagueTeamsData from "@/data/teams/euroleague_teams.json";
import laLigaTeamsData from "@/data/teams/laliga_teams.json";
import bundesligaTeamsData from "@/data/teams/bundesliga_teams.json";
import serieATeamsData from "@/data/teams/seriea_teams.json";
import ligue1TeamsData from "@/data/teams/ligue1_teams.json";
import mlsTeamsData from "@/data/teams/mls_teams.json";
import nbaViewingOptionsData from "@/data/viewingOptions/nba_viewing.json";
import mlsViewingOptionsData from "@/data/viewingOptions/mls_viewing.json";

// Safely process imported data
const leagues = Array.isArray(leaguesData.leagues) ? leaguesData.leagues : [];
const locations = Array.isArray(locationsData.locations) ? locationsData.locations : [];
const nbaTeams = Array.isArray(nbaTeamsData.teams) ? nbaTeamsData.teams : [];
const premierLeagueTeams = Array.isArray(premierLeagueTeamsData.teams) ? premierLeagueTeamsData.teams : [];
const euroLeagueTeams = Array.isArray(euroLeagueTeamsData.teams) ? euroLeagueTeamsData.teams : [];
const laLigaTeams = Array.isArray(laLigaTeamsData.teams) ? laLigaTeamsData.teams : [];
const bundesligaTeams = Array.isArray(bundesligaTeamsData.teams) ? bundesligaTeamsData.teams : [];
const serieATeams = Array.isArray(serieATeamsData.teams) ? serieATeamsData.teams : [];
const ligue1Teams = Array.isArray(ligue1TeamsData.teams) ? ligue1TeamsData.teams : [];
const mlsTeams = Array.isArray(mlsTeamsData.teams) ? mlsTeamsData.teams : [];
const nbaViewingOptions = nbaViewingOptionsData || {};
const mlsViewingOptions = mlsViewingOptionsData || {};

// Combine team data
const teams = [
  ...nbaTeams,
  ...premierLeagueTeams,
  ...euroLeagueTeams,
  ...laLigaTeams,
  ...bundesligaTeams,
  ...serieATeams,
  ...ligue1Teams,
  ...mlsTeams
];

// Group leagues by sport
const sportGroups = leagues.reduce((acc, league) => {
  const [, sport] = league.name.match(/\((.*?)\)/) || [null, "Other"];
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
    state: team.state, // Keep state for MLS teams
    country: team.country,
    timezone: team.timezone,
  };
  return acc;
}, {});

// Generate mock game data
const generateMockGames = () => {
  const mockGames = [];
  const leagueIds = leagues.map((league) => league.id);

  for (let i = 0; i < 20; i++) {
    const randomLeague =
      leagueIds[Math.floor(Math.random() * leagueIds.length)];
    const leagueTeams = teams.filter((team) => team.league === randomLeague);

    if (leagueTeams.length < 2) continue;

    const team1 = leagueTeams[Math.floor(Math.random() * leagueTeams.length)];
    let team2 = leagueTeams[Math.floor(Math.random() * leagueTeams.length)];
    while (team2.id === team1.id) {
      team2 = leagueTeams[Math.floor(Math.random() * leagueTeams.length)];
    }

    const gameDate = new Date();
    gameDate.setDate(gameDate.getDate() + Math.floor(Math.random() * 14)); // Random date within next 2 weeks

    mockGames.push({
      id: `game-${i + 1}`,
      league: randomLeague,
      team1: team1.id,
      team2: team2.id,
      time: gameDate.toISOString(),
    });
  }

  return mockGames;
};

export default function GlobalSportsApp() {
  const [selectedSport, setSelectedSport] = useState(sports[0] || "");
  const [selectedLeague, setSelectedLeague] = useState(
    sportGroups[sports[0]]?.[0]?.id || ""
  );
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [watchLocation, setWatchLocation] = useState("");
  const [watchDate, setWatchDate] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [userTimezone, setUserTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const [games, setGames] = useState([]);

  useEffect(() => {
    // Generate mock games when the component mounts
    setGames(generateMockGames());
  }, []);

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
  }, [selectedLeague, selectedTeams, watchDate, games]);

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
    setSelectedLeague(sportGroups[sport]?.[0]?.id || "");
    setSelectedTeams([]);
  };

  const handleTeamToggle = (teamId) => {
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const getFilteredTeams = () => {
    return teams.filter((team) => team.league === selectedLeague);
  };

  const getViewingOptions = (league) => {
    switch (league) {
      case 'nba':
        return nbaViewingOptions;
      case 'mls':
        return mlsViewingOptions;
      default:
        return {};
    }
  };

  if (sports.length === 0 || teams.length === 0) {
    console.error("No sports or teams data available.");
    console.error("Sports:", sports);
    console.error("Teams:", teams);
    return (
      <div>
        Error: No sports or teams data available. Please check your data files and the console for more information.
      </div>
    );
  }

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
            <SportLeagueSelector
              sports={sports}
              sportGroups={sportGroups}
              selectedSport={selectedSport}
              setSelectedSport={setSelectedSport}
              selectedLeague={selectedLeague}
              setSelectedLeague={setSelectedLeague}
            />
            {selectedLeague && (
              <TeamSelector
                teams={getFilteredTeams()}
                selectedLeague={selectedLeague}
                selectedTeams={selectedTeams}
                handleTeamToggle={handleTeamToggle}
              />
            )}
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
        viewingOptions={getViewingOptions(selectedLeague)}
        teamCities={teamCities}
        teams={teams}
        teamDetails={teamDetails}
        selectedLeague={selectedLeague}
        userTimezone={userTimezone}
      />
    </div>
  );
}