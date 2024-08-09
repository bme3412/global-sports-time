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
  {
    id: "bulls",
    name: "Chicago Bulls",
    league: "nba",
    city: "Chicago",
    state: "Illinois",
    country: "USA",
    timezone: "America/Chicago",
  },
  {
    id: "heat",
    name: "Miami Heat",
    league: "nba",
    city: "Miami",
    state: "Florida",
    country: "USA",
    timezone: "America/New_York",
  },
  {
    id: "man_city",
    name: "Manchester City",
    league: "premier",
    city: "Manchester",
    country: "UK",
    timezone: "Europe/London",
  },
  {
    id: "chelsea",
    name: "Chelsea",
    league: "premier",
    city: "London",
    country: "UK",
    timezone: "Europe/London",
  },
  {
    id: "patriots",
    name: "New England Patriots",
    league: "nfl",
    city: "Foxborough",
    state: "Massachusetts",
    country: "USA",
    timezone: "America/New_York",
  },
  {
    id: "49ers",
    name: "San Francisco 49ers",
    league: "nfl",
    city: "Santa Clara",
    state: "California",
    country: "USA",
    timezone: "America/Los_Angeles",
  },
  {
    id: "real_madrid",
    name: "Real Madrid",
    league: "laliga",
    city: "Madrid",
    country: "Spain",
    timezone: "Europe/Madrid",
  },
  {
    id: "barcelona",
    name: "FC Barcelona",
    league: "laliga",
    city: "Barcelona",
    country: "Spain",
    timezone: "Europe/Madrid",
  },
];

const locations = [
  {
    id: "new_york",
    name: "New York City",
    country: "USA",
    timezone: "America/New_York",
  },
  { id: "london", name: "London", country: "UK", timezone: "Europe/London" },
  { id: "tokyo", name: "Tokyo", country: "Japan", timezone: "Asia/Tokyo" },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    timezone: "Australia/Sydney",
  },
  {
    id: "los_angeles",
    name: "Los Angeles",
    country: "USA",
    timezone: "America/Los_Angeles",
  },
  {
    id: "chicago",
    name: "Chicago",
    country: "USA",
    timezone: "America/Chicago",
  },
  { id: "paris", name: "Paris", country: "France", timezone: "Europe/Paris" },
  {
    id: "berlin",
    name: "Berlin",
    country: "Germany",
    timezone: "Europe/Berlin",
  },
  {
    id: "moscow",
    name: "Moscow",
    country: "Russia",
    timezone: "Europe/Moscow",
  },
  { id: "dubai", name: "Dubai", country: "UAE", timezone: "Asia/Dubai" },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    timezone: "Asia/Singapore",
  },
  {
    id: "hong_kong",
    name: "Hong Kong",
    country: "China",
    timezone: "Asia/Hong_Kong",
  },
  {
    id: "sao_paulo",
    name: "São Paulo",
    country: "Brazil",
    timezone: "America/Sao_Paulo",
  },
  {
    id: "mexico_city",
    name: "Mexico City",
    country: "Mexico",
    timezone: "America/Mexico_City",
  },
  {
    id: "johannesburg",
    name: "Johannesburg",
    country: "South Africa",
    timezone: "Africa/Johannesburg",
  },
  { id: "cairo", name: "Cairo", country: "Egypt", timezone: "Africa/Cairo" },
  { id: "mumbai", name: "Mumbai", country: "India", timezone: "Asia/Kolkata" },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    timezone: "Asia/Bangkok",
  },
  {
    id: "vancouver",
    name: "Vancouver",
    country: "Canada",
    timezone: "America/Vancouver",
  },
  {
    id: "auckland",
    name: "Auckland",
    country: "New Zealand",
    timezone: "Pacific/Auckland",
  },
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    timezone: "Europe/Istanbul",
  },
  { id: "rome", name: "Rome", country: "Italy", timezone: "Europe/Rome" },
  {
    id: "buenos_aires",
    name: "Buenos Aires",
    country: "Argentina",
    timezone: "America/Argentina/Buenos_Aires",
  },
  {
    id: "stockholm",
    name: "Stockholm",
    country: "Sweden",
    timezone: "Europe/Stockholm",
  },
  { id: "madrid", name: "Madrid", country: "Spain", timezone: "Europe/Madrid" },
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
        services: ["NBA League Pass", "ESPN+", "ABC", "TNT", "NBA TV", "Hulu + Live TV", "YouTube TV", "Sling TV"],
        cost: "$28.99/month for NBA League Pass, $69.99/month for Hulu + Live TV",
        restrictions: "Some games may be blacked out locally. National broadcasts are exclusive to ABC, ESPN, and TNT.",
        additionalInfo: "NBA League Pass offers both live and on-demand viewing. Local team games are typically blacked out on League Pass."
      },
      uk: {
        services: ["Sky Sports", "NBA League Pass International", "NOW TV"],
        cost: "£24.99/month for Sky Sports, £14.99/month for NBA League Pass",
        restrictions: "No local blackouts, but some games may not be available live due to broadcasting rights",
        additionalInfo: "Sky Sports shows up to 5 live NBA games per week. NBA League Pass International offers all games with no blackouts."
      },
      japan: {
        services: ["Rakuten", "NBA League Pass", "WOWOW"],
        cost: "¥2,990/month for NBA League Pass, ¥2,530/month for WOWOW",
        restrictions: "No local blackouts",
        additionalInfo: "Rakuten has exclusive rights to NBA games in Japan. WOWOW offers some NBA content including playoffs."
      },
      australia: {
        services: ["ESPN", "NBA League Pass", "Kayo Sports"],
        cost: "A$39.99/month for NBA League Pass, A$25/month for Kayo Sports",
        restrictions: "No local blackouts",
        additionalInfo: "Kayo Sports offers NBA content through its ESPN channels. NBA League Pass provides full access to all games."
      },
      france: {
        services: ["beIN SPORTS", "NBA League Pass"],
        cost: "€14.99/month for beIN SPORTS, €17.99/month for NBA League Pass",
        restrictions: "No local blackouts",
        additionalInfo: "beIN SPORTS has rights to show NBA games in France. NBA League Pass provides access to all games."
      },
      germany: {
        services: ["DAZN", "NBA League Pass"],
        cost: "€11.99/month for DAZN, €17.99/month for NBA League Pass",
        restrictions: "No local blackouts",
        additionalInfo: "DAZN shows select NBA games. NBA League Pass offers full access to all games."
      },
      russia: {
        services: ["NBA League Pass", "Match TV"],
        cost: "€17.99/month for NBA League Pass, varies for cable packages including Match TV",
        restrictions: "Some games may not be available due to broadcasting rights",
        additionalInfo: "Match TV holds broadcasting rights for NBA games in Russia. NBA League Pass offers full game access."
      },
      uae: {
        services: ["NBA League Pass", "beIN SPORTS"],
        cost: "AED 74.99/month for NBA League Pass, varies for beIN SPORTS packages",
        restrictions: "No local blackouts",
        additionalInfo: "beIN SPORTS has rights to broadcast NBA games in the Middle East. NBA League Pass offers full access."
      },
      singapore: {
        services: ["NBA League Pass", "Singtel TV"],
        cost: "S$29.90/month for NBA League Pass, varies for Singtel TV packages",
        restrictions: "No local blackouts",
        additionalInfo: "Singtel TV offers NBA games through its sports packages. NBA League Pass provides full access."
      },
      china: {
        services: ["Tencent", "CCTV", "BesTV"],
        cost: "Varies based on provider and package",
        restrictions: "Some games may not be available due to content restrictions",
        additionalInfo: "Tencent is the exclusive digital partner of the NBA in China. CCTV broadcasts select games on cable TV."
      },
      brazil: {
        services: ["ESPN", "NBA League Pass", "SporTV"],
        cost: "R$59.90/month for NBA League Pass, Varies for cable packages including ESPN and SporTV",
        restrictions: "No local blackouts",
        additionalInfo: "ESPN and SporTV share NBA broadcasting rights in Brazil. NBA League Pass offers full game access."
      },
      mexico: {
        services: ["NBA League Pass", "ESPN", "TUDN"],
        cost: "MXN 699/month for NBA League Pass, varies for cable packages",
        restrictions: "No local blackouts",
        additionalInfo: "ESPN and TUDN broadcast select NBA games. NBA League Pass offers full access to all games."
      },
      "south africa": {
        services: ["NBA League Pass", "ESPN Africa"],
        cost: "R299/month for NBA League Pass, varies for cable packages including ESPN Africa",
        restrictions: "No local blackouts",
        additionalInfo: "ESPN Africa broadcasts select NBA games. NBA League Pass offers full access to all games."
      },
      egypt: {
        services: ["NBA League Pass", "beIN SPORTS"],
        cost: "€17.99/month for NBA League Pass, varies for beIN SPORTS packages",
        restrictions: "No local blackouts",
        additionalInfo: "beIN SPORTS has rights to broadcast NBA games in the Middle East and North Africa. NBA League Pass offers full access."
      },
      india: {
        services: ["NBA League Pass", "Sony Six"],
        cost: "₹999/month for NBA League Pass, varies for cable packages including Sony Six",
        restrictions: "No local blackouts",
        additionalInfo: "Sony Six holds the broadcasting rights for NBA in India. NBA League Pass provides full game access."
      },
      thailand: {
        services: ["NBA League Pass", "True Visions"],
        cost: "฿849/month for NBA League Pass, varies for True Visions packages",
        restrictions: "No local blackouts",
        additionalInfo: "True Visions broadcasts NBA games in Thailand. NBA League Pass offers full access to all games."
      },
      canada: {
        services: ["TSN", "Sportsnet", "NBA League Pass", "TSN Direct", "Sportsnet NOW"],
        cost: "C$39.99/month for NBA League Pass, C$19.99/month for TSN Direct",
        restrictions: "Some games may be blacked out locally, especially for Toronto Raptors games",
        additionalInfo: "TSN and Sportsnet split the national NBA broadcast rights in Canada. Raptors games are typically broadcast on these networks."
      },
      "new zealand": {
        services: ["NBA League Pass", "ESPN"],
        cost: "NZ$39.99/month for NBA League Pass, varies for cable packages including ESPN",
        restrictions: "No local blackouts",
        additionalInfo: "ESPN broadcasts select NBA games. NBA League Pass offers full access to all games."
      },
      turkey: {
        services: ["NBA League Pass", "S Sport"],
        cost: "€17.99/month for NBA League Pass, varies for S Sport packages",
        restrictions: "No local blackouts",
        additionalInfo: "S Sport holds the broadcasting rights for NBA in Turkey. NBA League Pass provides full game access."
      },
      italy: {
        services: ["NBA League Pass", "Sky Sport"],
        cost: "€17.99/month for NBA League Pass, varies for Sky Sport packages",
        restrictions: "No local blackouts",
        additionalInfo: "Sky Sport broadcasts NBA games in Italy. NBA League Pass offers full access to all games."
      },
      argentina: {
        services: ["NBA League Pass", "ESPN", "DirecTV Sports"],
        cost: "ARS 1399/month for NBA League Pass, varies for cable packages",
        restrictions: "No local blackouts",
        additionalInfo: "ESPN and DirecTV Sports broadcast select NBA games. NBA League Pass offers full access to all games."
      },
      sweden: {
        services: ["NBA League Pass", "Viaplay"],
        cost: "€17.99/month for NBA League Pass, 449 SEK/month for Viaplay Total",
        restrictions: "No local blackouts",
        additionalInfo: "Viaplay broadcasts NBA games in Sweden. NBA League Pass provides full access to all games."
      },
      spain: {
        services: ["Movistar+", "NBA League Pass"],
        cost: "€65/month for Movistar+ package including NBA, €17.99/month for NBA League Pass",
        restrictions: "No local blackouts",
        additionalInfo: "Movistar+ holds the broadcasting rights for NBA in Spain. They offer dedicated NBA channels."
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
    canada: {
      services: ["DAZN"],
      cost: "C$24.99/month for DAZN",
      restrictions: "No local blackouts",
    },
    india: {
      services: ["Hotstar"],
      cost: "₹299/month for Hotstar VIP",
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
    germany: {
      services: ["DAZN", "NFL Game Pass"],
      cost: "€12.99/month for DAZN",
      restrictions: "No local blackouts",
    },
    mexico: {
      services: ["NFL Game Pass", "Fox Sports"],
      cost: "MXN 499/month for NFL Game Pass",
      restrictions: "No local blackouts",
    },
  },
  laliga: {
    spain: {
      services: ["Movistar+", "DAZN"],
      cost: "€45/month for Movistar+ with LaLiga",
      restrictions: "No local blackouts",
    },
    uk: {
      services: ["LaLigaTV", "Premier Sports"],
      cost: "£6.99/month for LaLigaTV",
      restrictions: "No local blackouts",
    },
    usa: {
      services: ["ESPN+"],
      cost: "$6.99/month for ESPN+",
      restrictions: "No local blackouts",
    },
    india: {
      services: ["Facebook Watch"],
      cost: "Free",
      restrictions: "Limited game selection",
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
              <h3 className="text-lg font-semibold mb-2">
                Where will you be watching?
              </h3>
              <Select onValueChange={setWatchLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
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
                  onClick={() => setWatchDate("")}
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
          {watchDate
            ? `Games on ${new Date(watchDate).toDateString()}`
            : "Upcoming Games"}
        </h2>
        {filteredGames.map((game) => (
          <GameInfo
            key={game.id}
            game={game}
            userTimezone={
              watchLocation
                ? locations.find((loc) => loc.id === watchLocation).timezone
                : "UTC"
            }
            watchLocation={watchLocation}
            viewingOptions={viewingOptions}
            teamCities={teamCities}
            locations={locations}
          />
        ))}
        {filteredGames.length === 0 && (
          <Card>
            <CardContent className="p-4">
              <p className="text-center text-gray-600 dark:text-gray-300">
                No games found for the selected criteria. Try selecting a
                different date or teams.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

const GameInfo = ({
  game,
  userTimezone,
  watchLocation,
  viewingOptions,
  teamCities,
  locations,
}) => {
  const gameTime = new Date(game.time);
  const options = {
    timeZone: userTimezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const localTime = gameTime.toLocaleString("en-US", options);
  const originalTime = gameTime.toLocaleString("en-US", {
    ...options,
    timeZone: "UTC",
  });

  const team1Info = teamCities[game.team1];
  const team2Info = teamCities[game.team2];

  const watchLocationInfo = watchLocation
    ? locations.find((l) => l.id === watchLocation)
    : null;

  return (
    <Card className="mb-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {teams.find((t) => t.id === game.team1).name} vs{" "}
          {teams.find((t) => t.id === game.team2).name}
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
              <span className="text-sm">
                Original Time (UTC): {originalTime}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <MapPin className="mr-2 text-red-500" />
              <span className="text-sm">
                Your Location:{" "}
                {watchLocationInfo ? watchLocationInfo.name : "Not set"}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 text-purple-500" />
              <span className="text-sm">
                Teams: {team1Info.city} vs {team2Info.city}
              </span>
            </div>
          </div>
        </div>
        {watchLocationInfo && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Viewing Guide</h4>
            <ViewingGuide
              league={game.league}
              team1={teams.find((t) => t.id === game.team1).name}
              team2={teams.find((t) => t.id === game.team2).name}
              location={watchLocationInfo.country.toLowerCase()}
              viewingOptions={viewingOptions}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
