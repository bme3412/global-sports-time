import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import SportLeagueSelector from "./SportSelector";
import TeamSelector from "./TeamSelector";
import LocationSelector from "./LocationSelector";
import GameSchedule from "./GameSchedule";
import GameTimeConverter from "./GameTimeConverter";

// Import JSON data
import leaguesData from "@/data/leagues/leagues.json";
import locationsData from "@/data/locations/locations.json";
import nbaTeamsData from "@/data/teams/nba_teams.json";
import mlbTeamsData from "@/data/teams/mlb_teams.json";
import nhlTeamsData from "@/data/teams/nhl_teams.json";
import premierLeagueTeamsData from "@/data/teams/premierleague_teams.json";
import bundesligaTeamsData from "@/data/teams/bundesliga_teams.json";
import nflTeamsData from "@/data/teams/nfl_teams.json";
import laLigaTeamsData from "@/data/teams/laliga_teams.json";
import nbaViewingOptionsData from "@/data/viewingOptions/nba_viewing.json";
import mlsViewingOptionsData from "@/data/viewingOptions/mls_viewing.json";

// Import schedule data
import premierLeagueSchedule from "@/data/schedules/premierleague/schedule_premierleague.csv";
import bundesligaSchedule from "@/data/schedules/bundesliga/schedule_bundesliga.csv";
import nflSchedule from "@/data/schedules/nfl/schedule_nfl.csv";
import mlbSchedule from "@/data/schedules/mlb/schedule_mlb.csv";
import laLigaSchedule from "@/data/schedules/laliga/schedule_laliga.csv";

// Import viewing options data
import premierLeagueViewingOptionsData from "@/data/viewingOptions/premierleague_viewing.json";
import bundesligaViewingOptionsData from "@/data/viewingOptions/bundesliga_viewing.json";
import nflViewingOptionsData from "@/data/viewingOptions/nfl_viewing.json";
import mlbViewingOptionsData from "@/data/viewingOptions/mlb_viewing.json";
import laLigaViewingOptionsData from "@/data/viewingOptions/laliga_viewing.json";

// Safely process imported data
const leagues = Array.isArray(leaguesData.leagues) ? leaguesData.leagues : [];
const locations = Array.isArray(locationsData.locations)
  ? locationsData.locations
  : [];
const nbaTeams = Array.isArray(nbaTeamsData.teams) ? nbaTeamsData.teams : [];
const nflTeams = Array.isArray(nflTeamsData.teams) ? nflTeamsData.teams : [];
const mlbTeams = Array.isArray(mlbTeamsData.teams) ? mlbTeamsData.teams : [];
const nhlTeams = Array.isArray(nhlTeamsData.teams) ? nhlTeamsData.teams : [];
const premierLeagueTeams = Array.isArray(premierLeagueTeamsData.teams)
  ? premierLeagueTeamsData.teams
  : [];
const bundesligaTeams = Array.isArray(bundesligaTeamsData.teams)
  ? bundesligaTeamsData.teams
  : [];
const laLigaTeams = Array.isArray(laLigaTeamsData.teams)
  ? laLigaTeamsData.teams
  : [];

// Combine team data
const teams = [
  ...nbaTeams,
  ...nflTeams,
  ...mlbTeams,
  ...nhlTeams,
  ...premierLeagueTeams,
  ...bundesligaTeams,
  laLigaTeams,
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
    state: team.state,
    country: team.country,
    timezone: team.timezone,
  };
  return acc;
}, {});

export default function GlobalSportsApp() {
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [watchLocation, setWatchLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [userCountry, setUserCountry] = useState("us");
  const [watchDateRange, setWatchDateRange] = useState({ start: "", end: "" });
  const [filteredGames, setFilteredGames] = useState([]);
  const [userTimezone, setUserTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameViewingOptions, setGameViewingOptions] = useState(null);
  const [premierLeagueGames, setPremierLeagueGames] = useState([]);
  const [broadcastData, setBroadcastData] = useState({});
  const [bundesligaGames, setBundesligaGames] = useState([]);
  const [nflGames, setNflGames] = useState([]);
  const [mlbGames, setMlbGames] = useState([]);
  const [laLigaGames, setLaLigaGames] = useState([]);

  useEffect(() => {
    setPremierLeagueGames(
      premierLeagueSchedule.map((game, index) => ({
        ...game,
        id: `pl-${index}`,
        league: "premier-league",
        onSky: game["On Sky Sports"] === "Yes",
      }))
    );
    setBundesligaGames(
      bundesligaSchedule.map((game, index) => ({
        ...game,
        id: `bundesliga-${index}`,
        league: "bundesliga",
      }))
    );
    setMlbGames(
      mlbSchedule.map((game, index) => ({
        ...game,
        id: `mlb-${index}`,
        league: "mlb",
      }))
    );
    setNflGames(
      nflSchedule.map((game, index) => ({
        ...game,
        id: `nfl-${index}`,
        league: "nfl",
      }))
    );
    setLaLigaGames(
      laLigaSchedule.map((game, index) => ({
        ...game,
        id: `laliga-${index}`,
        league: "la-liga",
      }))
    );
    if (!watchLocation) {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          setUserCountry(data.country_code.toLowerCase());
          console.log(
            "Updated userCountry from IP:",
            data.country_code.toLowerCase()
          );
        })
        .catch((error) => {
          console.error("Error fetching user country:", error);
        });
    }
  }, []);

  useEffect(() => {
    setBroadcastData(getViewingOptions(selectedLeague));
  }, [selectedLeague]);

  const handleLocationChange = (newLocation) => {
    setWatchLocation(newLocation);
    setSelectedLocation(newLocation);
    console.log("New watch location:", newLocation);

    const selectedLocationData = locations.find(
      (loc) => loc.id === newLocation
    );
    if (selectedLocationData && selectedLocationData.country) {
      const newCountry = selectedLocationData.country.toLowerCase();
      setUserCountry(newCountry);
      console.log("Updated userCountry:", newCountry);
    }
  };

  useEffect(() => {
    let newFilteredGames = [];
  
    if (selectedLeague === "premier-league" && selectedTeams.length > 0) {
      newFilteredGames = premierLeagueGames.filter(
        (game) =>
          selectedTeams.includes(game.Home) || selectedTeams.includes(game.Away)
      );
    } else if (selectedLeague === "bundesliga" && selectedTeams.length > 0) {
      newFilteredGames = bundesligaGames.filter(
        (game) =>
          selectedTeams.includes(game.Home) || selectedTeams.includes(game.Away)
      );
    } else if (selectedLeague === "nfl" && selectedTeams.length > 0) {
      newFilteredGames = nflGames.filter(
        (game) =>
          selectedTeams.includes(game.Home) || selectedTeams.includes(game.Away)
      );
    } else if (selectedLeague === "la-liga" && selectedTeams.length > 0) {
      newFilteredGames = laLigaGames.filter(
        (game) =>
          selectedTeams.includes(game.Home) || selectedTeams.includes(game.Away)
      );
    } else if (selectedLeague === "mlb" && selectedTeams.length > 0) {
      newFilteredGames = mlbGames.filter(
        (game) =>
          selectedTeams.includes(game.Home) || selectedTeams.includes(game.Away)
      );
    }

    if (watchDateRange.start && watchDateRange.end) {
      const startDate = new Date(watchDateRange.start);
      const endDate = new Date(watchDateRange.end);
      newFilteredGames = newFilteredGames.filter((game) => {
        const gameDate = new Date(game.Date);
        return gameDate >= startDate && gameDate <= endDate;
      });
    }

    newFilteredGames.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    setFilteredGames(newFilteredGames);
  }, [
    selectedLeague,
    selectedTeams,
    watchDateRange,
    premierLeagueGames,
    bundesligaGames,
    nflGames,
    mlbGames,
    laLigaGames
  ]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
    setSelectedLeague("");
    setSelectedTeams([]);
  };

  const handleLeagueChange = (league) => {
    setSelectedLeague(league);
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
    const leagueGames = {
      "premier-league": premierLeagueGames,
      "bundesliga": bundesligaGames,
      "nfl": nflGames,
      "mlb": mlbGames,
      "la-liga": laLigaGames  // Add this line
    };
  
    if (leagueGames[selectedLeague]) {
      const uniqueTeams = new Set([
        ...leagueGames[selectedLeague].map((game) => game.Home),
        ...leagueGames[selectedLeague].map((game) => game.Away),
      ]);
      return Array.from(uniqueTeams).map((teamName) => ({
        id: teamName,
        name: teamName,
      }));
    } else {
      return teams.filter((team) => team.league === selectedLeague);
    }
  };

  const getViewingOptions = (league) => {
    switch (league) {
      case "nba":
        return nbaViewingOptions;
      case "mls":
        return mlsViewingOptions;
      case "premier-league":
        return premierLeagueViewingOptionsData.premierLeague;
      case "bundesliga":
        return bundesligaViewingOptionsData.bundesliga;
      case "nfl":
        return nflViewingOptionsData.nfl;
      case "la-liga":
        return laLigaViewingOptionsData.laLiga;
      case "mlb":
        return mlbViewingOptionsData.mlb;
      default:
        return {};
    }
  };

  useEffect(() => {
    if (selectedGame && selectedLeague) {
      const leagueViewingOptions = getViewingOptions(selectedLeague);
      const countryOptions = leagueViewingOptions[userCountry.toLowerCase()];
      setGameViewingOptions(countryOptions);
    } else {
      setGameViewingOptions(null);
    }
  }, [selectedGame, selectedLeague, userCountry]);

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
              setSelectedSport={handleSportChange}
              selectedLeague={selectedLeague}
              setSelectedLeague={handleLeagueChange}
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
              setWatchLocation={handleLocationChange}
              watchDateRange={watchDateRange}
              setWatchDateRange={setWatchDateRange}
              selectedLocation={selectedLocation}
            />
            <GameTimeConverter
              gameTime={selectedGame ? selectedGame.Time : null}
              gameDate={selectedGame ? selectedGame.Date : null}
              gameTimezone={
                selectedGame && selectedGame.Home
                  ? teamDetails[selectedGame.Home]?.timezone
                  : userTimezone
              }
              watchLocation={watchLocation}
              locations={locations}
              broadcastData={broadcastData}
              venue={selectedGame ? getStadiumInfo(selectedGame.Home) : null}
              matchName={
                selectedGame
                  ? `${selectedGame.Home} vs ${selectedGame.Away}`
                  : null
              }
              userCountry={userCountry}
            />
          </CardContent>
        </Card>
      </div>

      {selectedTeams.length > 0 && (
        <GameSchedule
          filteredGames={filteredGames}
          watchDateRange={watchDateRange}
          watchLocation={watchLocation}
          locations={locations}
          viewingOptions={broadcastData}
          teamCities={teamCities}
          teams={teams}
          teamDetails={teamDetails}
          selectedLeague={selectedLeague}
          userTimezone={userTimezone}
          isPremierLeague={selectedLeague === "premier-league"}
          userCountry={userCountry}
          premierLeagueTeams={premierLeagueTeamsData.teams}
          onGameSelect={handleGameSelect}
          selectedGame={selectedGame}
        />
      )}
    </div>
  );
}

function getStadiumInfo(teamName) {
  const team =
    premierLeagueTeams.find((t) => t.name === teamName) ||
    mlbTeams.find((t) => t.name === teamName) ||
    laLigaTeams.find((t) => t.name === teamName);  // Add this line
  return team ? `${team.homeStadium}, ${team.city}` : `${teamName} Stadium`;
}