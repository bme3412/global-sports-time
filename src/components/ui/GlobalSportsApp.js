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

// Import Premier League schedule data
import premierLeagueSchedule from "@/data/schedules/schedule_premierleague.csv";
import premierLeagueViewingOptionsData from "@/data/viewingOptions/premierleague_viewing.json";

// Safely process imported data
const leagues = Array.isArray(leaguesData.leagues) ? leaguesData.leagues : [];
const locations = Array.isArray(locationsData.locations)
  ? locationsData.locations
  : [];
const nbaTeams = Array.isArray(nbaTeamsData.teams) ? nbaTeamsData.teams : [];
const premierLeagueTeams = Array.isArray(premierLeagueTeamsData.teams)
  ? premierLeagueTeamsData.teams
  : [];
const euroLeagueTeams = Array.isArray(euroLeagueTeamsData.teams)
  ? euroLeagueTeamsData.teams
  : [];
const laLigaTeams = Array.isArray(laLigaTeamsData.teams)
  ? laLigaTeamsData.teams
  : [];
const bundesligaTeams = Array.isArray(bundesligaTeamsData.teams)
  ? bundesligaTeamsData.teams
  : [];
const serieATeams = Array.isArray(serieATeamsData.teams)
  ? serieATeamsData.teams
  : [];
const ligue1Teams = Array.isArray(ligue1TeamsData.teams)
  ? ligue1TeamsData.teams
  : [];
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
  ...mlsTeams,
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
  const [userCountry, setUserCountry] = useState("us"); // Default to US
  const [watchDate, setWatchDate] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [userTimezone, setUserTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const [premierLeagueGames, setPremierLeagueGames] = useState([]);

  useEffect(() => {
    // Set Premier League games
    setPremierLeagueGames(
      premierLeagueSchedule.map((game, index) => ({
        ...game,
        id: `pl-${index}`,
        league: "premier-league",
        onSky: game["On Sky Sports"] === "Yes",
      }))
    );

    // Update userCountry when watchLocation changes
    if (watchLocation) {
        const selectedLocation = locations.find(loc => loc.id === watchLocation);
        if (selectedLocation && selectedLocation.country) {
          setUserCountry(selectedLocation.country);
          console.log("Updated userCountry:", selectedLocation.country); // Debug log
        }
      } else {
        // If no location is selected, attempt to determine user's country
        fetch('https://ipapi.co/json/')
          .then(res => res.json())
          .then(data => {
            setUserCountry(data.country_code.toLowerCase());
            console.log("Updated userCountry from IP:", data.country_code.toLowerCase()); // Debug log
          })
          .catch(error => {
            console.error('Error fetching user country:', error);
            // Keep the default "us" if there's an error
          });
      }
    }, [watchLocation]);

    const handleLocationChange = (newLocation) => {
        setWatchLocation(newLocation);
        console.log("New watch location:", newLocation); // Debug log
      };

  useEffect(() => {
    let newFilteredGames = [];

    if (selectedLeague === "premier-league" && selectedTeams.length > 0) {
      newFilteredGames = premierLeagueGames.filter(
        (game) =>
          selectedTeams.includes(game.Home) || selectedTeams.includes(game.Away)
      );
    }

    if (watchDate) {
      const watchDateObj = new Date(watchDate);
      newFilteredGames = newFilteredGames.filter((game) => {
        const gameDate = new Date(game.Date);
        return gameDate.toDateString() === watchDateObj.toDateString();
      });
    }

    newFilteredGames.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    setFilteredGames(newFilteredGames);
  }, [selectedLeague, selectedTeams, watchDate, premierLeagueGames]);

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
    if (selectedLeague === "premier-league") {
      const uniqueTeams = new Set([
        ...premierLeagueGames.map((game) => game.Home),
        ...premierLeagueGames.map((game) => game.Away),
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
      case 'nba':
        return nbaViewingOptions;
      case 'mls':
        return mlsViewingOptions;
      case 'premier-league':
        return premierLeagueViewingOptionsData.premierLeague;
      default:
        return {};
    }
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
              setWatchLocation={setWatchLocation}
              watchDate={watchDate}
              setWatchDate={setWatchDate}
            />
          </CardContent>
        </Card>
      </div>

      {selectedTeams.length > 0 && (
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
            isPremierLeague={selectedLeague === 'premier-league'}
            userCountry={userCountry}
          />
        )}
      </div>
    );
}