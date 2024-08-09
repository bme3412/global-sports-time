"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Globe, Calendar } from "lucide-react";
import ViewingGuide from "@/components/ui/ViewingGuide";

// Mock data (in a real app, this would come from an API or database)
const leagues = [
  { id: "nba", name: "NBA (Basketball)" },
  { id: "premier", name: "Premier League (Soccer)" },
  { id: "nfl", name: "NFL (American Football)" },
];

const teams = [
  {
    id: "celtics",
    name: "Boston Celtics",
    league: "nba",
    city: "Boston",
    state: "Massachusetts",
    country: "USA",
    timezone: "America/New_York",
  },
  {
    id: "lakers",
    name: "LA Lakers",
    league: "nba",
    city: "Los Angeles",
    state: "California",
    country: "USA",
    timezone: "America/Los_Angeles",
  },
  {
    id: "warriors",
    name: "Golden State Warriors",
    league: "nba",
    city: "San Francisco",
    state: "California",
    country: "USA",
    timezone: "America/Los_Angeles",
  },
  {
    id: "man_utd",
    name: "Manchester United",
    league: "premier",
    city: "Manchester",
    country: "UK",
    timezone: "Europe/London",
  },
  {
    id: "liverpool",
    name: "Liverpool",
    league: "premier",
    city: "Liverpool",
    country: "UK",
    timezone: "Europe/London",
  },
  {
    id: "arsenal",
    name: "Arsenal",
    league: "premier",
    city: "London",
    country: "UK",
    timezone: "Europe/London",
  },
  {
    id: "packers",
    name: "Green Bay Packers",
    league: "nfl",
    city: "Green Bay",
    state: "Wisconsin",
    country: "USA",
    timezone: "America/Chicago",
  },
  {
    id: "chiefs",
    name: "Kansas City Chiefs",
    league: "nfl",
    city: "Kansas City",
    state: "Missouri",
    country: "USA",
    timezone: "America/Chicago",
  },
];

const locations = [
  { id: "nyc", name: "New York City, USA", timezone: "America/New_York" },
  { id: "london", name: "London, UK", timezone: "Europe/London" },
  { id: "tokyo", name: "Tokyo, Japan", timezone: "Asia/Tokyo" },
  { id: "sydney", name: "Sydney, Australia", timezone: "Australia/Sydney" },
  {
    id: "los_angeles",
    name: "Los Angeles, USA",
    timezone: "America/Los_Angeles",
  },
  { id: "chicago", name: "Chicago, USA", timezone: "America/Chicago" },
];

const games = [
  // NBA Games
  {
    id: 1,
    league: "nba",
    team1: "celtics",
    team2: "lakers",
    time: "2024-08-10T19:00:00Z",
  },
  {
    id: 2,
    league: "nba",
    team1: "warriors",
    team2: "lakers",
    time: "2024-08-12T22:00:00Z",
  },
  {
    id: 3,
    league: "nba",
    team1: "celtics",
    team2: "warriors",
    time: "2024-08-15T23:30:00Z",
  },
  {
    id: 4,
    league: "nba",
    team1: "lakers",
    team2: "celtics",
    time: "2024-08-18T20:00:00Z",
  },
  {
    id: 5,
    league: "nba",
    team1: "warriors",
    team2: "celtics",
    time: "2024-08-20T21:00:00Z",
  },

  // Premier League Games
  {
    id: 6,
    league: "premier",
    team1: "man_utd",
    team2: "liverpool",
    time: "2024-08-11T14:00:00Z",
  },
  {
    id: 7,
    league: "premier",
    team1: "arsenal",
    team2: "man_utd",
    time: "2024-08-13T15:00:00Z",
  },
  {
    id: 8,
    league: "premier",
    team1: "liverpool",
    team2: "arsenal",
    time: "2024-08-17T16:30:00Z",
  },
  {
    id: 9,
    league: "premier",
    team1: "man_utd",
    team2: "arsenal",
    time: "2024-08-19T19:00:00Z",
  },
  {
    id: 10,
    league: "premier",
    team1: "liverpool",
    team2: "man_utd",
    time: "2024-08-22T18:45:00Z",
  },

  // NFL Games
  {
    id: 11,
    league: "nfl",
    team1: "packers",
    team2: "chiefs",
    time: "2024-08-14T18:00:00Z",
  },
  {
    id: 12,
    league: "nfl",
    team1: "chiefs",
    team2: "packers",
    time: "2024-08-16T20:30:00Z",
  },
  {
    id: 13,
    league: "nfl",
    team1: "packers",
    team2: "chiefs",
    time: "2024-08-21T17:00:00Z",
  },

  // Mixed League Days
  {
    id: 14,
    league: "nba",
    team1: "lakers",
    team2: "warriors",
    time: "2024-08-25T22:00:00Z",
  },
  {
    id: 15,
    league: "premier",
    team1: "arsenal",
    team2: "liverpool",
    time: "2024-08-25T13:30:00Z",
  },
  {
    id: 16,
    league: "nfl",
    team1: "chiefs",
    team2: "packers",
    time: "2024-08-25T18:00:00Z",
  },
];

const viewingOptions = {
  nba: {
    usa: {
      services: ["NBA League Pass", "ESPN+", "ABC", "TNT"],
      cost: "$28.99/month for NBA League Pass",
      restrictions: "Some games may be blacked out locally",
    },
    uk: {
      services: ["Sky Sports", "NBA League Pass International"],
      cost: "£24.99/month for Sky Sports",
      restrictions: "No local blackouts",
    },
    australia: {
      services: ["ESPN", "NBA League Pass"],
      cost: "A$39.99/month for NBA League Pass",
      restrictions: "No local blackouts",
    },
  },
  premier: {
    usa: {
      services: ["Peacock", "NBC Sports", "USA Network"],
      cost: "$4.99/month for Peacock",
      restrictions: "Not all games are televised",
    },
    uk: {
      services: ["Sky Sports", "BT Sport", "Amazon Prime Video"],
      cost: "£25/month for NOW TV Sky Sports Pass",
      restrictions: "Saturday 3pm games are not televised",
    },
    australia: {
      services: ["Optus Sport"],
      cost: "A$24.99/month for Optus Sport",
      restrictions: "No local blackouts",
    },
  },
  nfl: {
    usa: {
      services: ["NFL Sunday Ticket", "CBS", "FOX", "NBC", "ESPN"],
      cost: "$73.49/month for NFL Sunday Ticket",
      restrictions: "Local games may be blacked out",
    },
    uk: {
      services: ["Sky Sports", "NFL Game Pass"],
      cost: "£14.99/month for NFL Game Pass",
      restrictions: "No local blackouts",
    },
    australia: {
      services: ["ESPN", "NFL Game Pass"],
      cost: "A$28.99/month for NFL Game Pass",
      restrictions: "No local blackouts",
    },
  },
};

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
  const [selectedLeague, setSelectedLeague] = useState(leagues[0].id);
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
          : gameDate >= now) // Show future games if no date is selected
      );
    });
    newFilteredGames.sort((a, b) => new Date(a.time) - new Date(b.time));
    setFilteredGames(newFilteredGames);
  }, [selectedLeague, selectedTeams, watchDate]);

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
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <MapPin className="mr-2 text-red-500" />
            Team Info
          </CardTitle>
        </CardHeader>
        <CardContent>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <MapPin className="mr-2 text-red-500" />
            Game Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Selected Team Info</h3>
              {getTeamLocation() && (
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="text-blue-500" />
                  <span className="text-sm">
                    Team Location: {getTeamLocation()}
                  </span>
                </div>
              )}
              {getTeamTimezone() && (
                <div className="flex items-center space-x-2">
                  <Clock className="text-green-500" />
                  <span className="text-sm">
                    Team Timezone: {getTeamTimezone()}
                  </span>
                </div>
              )}
            </div>
            <div>
            <h3 className="text-lg font-semibold mb-2">Where will you be watching?</h3>
              <Select onValueChange={setWatchLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2 mt-2">
                <Calendar className="text-purple-500" />
                <Input
                  type="date"
                  placeholder="Select viewing date"
                  value={watchDate}
                  onChange={(e) => setWatchDate(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={() => setWatchDate('')}
                  className="ml-2"
                >
                  Clear Date
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Schedule */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {watchDate ? `Games on ${new Date(watchDate).toDateString()}` : 'Upcoming Games'}
        </h2>
        {filteredGames.map(game => (
          <GameInfo 
            key={game.id} 
            game={game} 
            userTimezone={watchLocation ? locations.find(loc => loc.id === watchLocation).timezone : 'UTC'}
            watchLocation={watchLocation}
            viewingOptions={viewingOptions}
            teamCities={teamCities}
          />
        ))}
        {filteredGames.length === 0 && (
          <Card>
            <CardContent className="p-4">
              <p className="text-center text-gray-600 dark:text-gray-300">
                No games found for the selected criteria. Try selecting a different date or teams.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

const GameInfo = ({ game, userTimezone, watchLocation, viewingOptions, teamCities }) => {
  const gameTime = new Date(game.time);
  const options = { timeZone: userTimezone, hour: '2-digit', minute: '2-digit', hour12: true, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const localTime = gameTime.toLocaleString('en-US', options);
  const originalTime = gameTime.toLocaleString('en-US', { ...options, timeZone: 'UTC' });

  const team1Info = teamCities[game.team1];
  const team2Info = teamCities[game.team2];

  return (
    <Card className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {teams.find(t => t.id === game.team1).name} vs {teams.find(t => t.id === game.team2).name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center mb-2">
              <Clock className="mr-2 text-blue-500" />
              <span className="text-sm">Local Time: {localTime}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 text-green-500" />
              <span className="text-sm">Original Time (UTC): {originalTime}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <MapPin className="mr-2 text-red-500" />
              <span className="text-sm">Your Location: {watchLocation ? locations.find(l => l.id === watchLocation).name : 'Not set'}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 text-purple-500" />
              <span className="text-sm">Teams: {team1Info.city} vs {team2Info.city}</span>
            </div>
          </div>
        </div>
        {watchLocation && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Viewing Guide</h4>
            <ViewingGuide 
              league={game.league}
              team1={teams.find(t => t.id === game.team1).name}
              team2={teams.find(t => t.id === game.team2).name}
              location={locations.find(l => l.id === watchLocation).name.split(',')[1].trim().toLowerCase()}
              viewingOptions={viewingOptions}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};