'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Clock, MapPin, Home, Globe } from 'lucide-react';
import ViewingGuide from '@/components/ui/ViewingGuide';

// Mock data (in a real app, this would come from an API or database)
const leagues = [
  { id: 'nba', name: 'NBA (Basketball)' },
  { id: 'premier', name: 'Premier League (Soccer)' },
  { id: 'nfl', name: 'NFL (American Football)' },
];

const teams = [
  { id: 'celtics', name: 'Boston Celtics', league: 'nba' },
  { id: 'lakers', name: 'LA Lakers', league: 'nba' },
  { id: 'warriors', name: 'Golden State Warriors', league: 'nba' },
  { id: 'man_utd', name: 'Manchester United', league: 'premier' },
  { id: 'liverpool', name: 'Liverpool', league: 'premier' },
  { id: 'arsenal', name: 'Arsenal', league: 'premier' },
  { id: 'packers', name: 'Green Bay Packers', league: 'nfl' },
  { id: 'chiefs', name: 'Kansas City Chiefs', league: 'nfl' },
];

const locations = [
  { id: 'nyc', name: 'New York City, USA', timezone: 'America/New_York' },
  { id: 'london', name: 'London, UK', timezone: 'Europe/London' },
  { id: 'tokyo', name: 'Tokyo, Japan', timezone: 'Asia/Tokyo' },
  { id: 'sydney', name: 'Sydney, Australia', timezone: 'Australia/Sydney' },
];

const games = [
  { id: 1, league: 'nba', team1: 'celtics', team2: 'lakers', time: '2024-08-10T19:00:00Z' },
  { id: 2, league: 'premier', team1: 'man_utd', team2: 'liverpool', time: '2024-08-11T14:00:00Z' },
  { id: 3, league: 'nba', team1: 'warriors', team2: 'lakers', time: '2024-08-12T22:00:00Z' },
  { id: 4, league: 'premier', team1: 'arsenal', team2: 'man_utd', time: '2024-08-13T15:00:00Z' },
  { id: 5, league: 'nfl', team1: 'packers', team2: 'chiefs', time: '2024-08-14T18:00:00Z' },
];

const viewingOptions = {
    nba: {
      usa: {
        services: ['NBA League Pass', 'ESPN+', 'ABC', 'TNT'],
        cost: '$28.99/month for NBA League Pass',
        restrictions: 'Some games may be blacked out locally',
      },
      uk: {
        services: ['Sky Sports', 'NBA League Pass International'],
        cost: '£24.99/month for Sky Sports',
        restrictions: 'No local blackouts',
      },
      australia: {
        services: ['ESPN', 'NBA League Pass'],
        cost: 'A$39.99/month for NBA League Pass',
        restrictions: 'No local blackouts',
      },
    },
    premier: {
      usa: {
        services: ['Peacock', 'NBC Sports', 'USA Network'],
        cost: '$4.99/month for Peacock',
        restrictions: 'Not all games are televised',
      },
      uk: {
        services: ['Sky Sports', 'BT Sport', 'Amazon Prime Video'],
        cost: '£25/month for NOW TV Sky Sports Pass',
        restrictions: 'Saturday 3pm games are not televised',
      },
      australia: {
        services: ['Optus Sport'],
        cost: 'A$24.99/month for Optus Sport',
        restrictions: 'No local blackouts',
      },
    },
    nfl: {
      usa: {
        services: ['NFL Sunday Ticket', 'CBS', 'FOX', 'NBC', 'ESPN'],
        cost: '$73.49/month for NFL Sunday Ticket',
        restrictions: 'Local games may be blacked out',
      },
      uk: {
        services: ['Sky Sports', 'NFL Game Pass'],
        cost: '£14.99/month for NFL Game Pass',
        restrictions: 'No local blackouts',
      },
      australia: {
        services: ['ESPN', 'NFL Game Pass'],
        cost: 'A$28.99/month for NFL Game Pass',
        restrictions: 'No local blackouts',
      },
    },
  };
  
  const GameInfo = ({ game, userTimezone, travelLocation, viewingOptions }) => {
    const gameTime = new Date(game.time);
    const options = { timeZone: userTimezone, hour: '2-digit', minute: '2-digit', hour12: true, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const localTime = gameTime.toLocaleString('en-US', options);
  
    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{teams.find(t => t.id === game.team1).name} vs {teams.find(t => t.id === game.team2).name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <Clock className="mr-2" />
            <span>Local Time: {localTime}</span>
          </div>
          <div className="flex items-center mb-2">
            <MapPin className="mr-2" />
            <span>Your Travel Location: {locations.find(l => l.id === travelLocation).name}</span>
          </div>
          <div className="mt-4">
            <ViewingGuide 
              league={game.league}
              team1={teams.find(t => t.id === game.team1).name}
              team2={teams.find(t => t.id === game.team2).name}
              location={locations.find(l => l.id === travelLocation).name.split(',')[1].trim().toLowerCase()}
              viewingOptions={viewingOptions}
            />
          </div>
        </CardContent>
      </Card>
    );
  };
  

export default function GlobalSportsApp() {
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [homeLocation, setHomeLocation] = useState('');
  const [travelLocation, setTravelLocation] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);

  const leagueTeams = teams.filter(team => team.league === selectedLeague);

  useEffect(() => {
    const newFilteredGames = games.filter(game => 
      game.league === selectedLeague &&
      (selectedTeams.length === 0 || selectedTeams.includes(game.team1) || selectedTeams.includes(game.team2))
    );
    setFilteredGames(newFilteredGames);
  }, [selectedLeague, selectedTeams]);

  const handleTeamToggle = (teamId) => {
    setSelectedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Select onValueChange={(value) => {
            setSelectedLeague(value);
            setSelectedTeams([]);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Select a league" />
            </SelectTrigger>
            <SelectContent>
              {leagues.map(league => (
                <SelectItem key={league.id} value={league.id}>{league.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedLeague && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Select Teams</h2>
              <div className="space-y-2">
                {leagueTeams.map(team => (
                  <div key={team.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={team.id} 
                      checked={selectedTeams.includes(team.id)}
                      onCheckedChange={() => handleTeamToggle(team.id)}
                    />
                    <label htmlFor={team.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{team.name}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Select onValueChange={setHomeLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select your home location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(location => (
                <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setTravelLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select your travel location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(location => (
                <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="date"
            placeholder="Select your travel date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
          />
        </div>
      </div>

      {homeLocation && (
        <Card className="mb-6">
          <CardContent className="flex items-center pt-6">
            <Home className="mr-2" />
            <span>Your Home Location: {locations.find(loc => loc.id === homeLocation).name}</span>
          </CardContent>
        </Card>
      )}

      {selectedLeague && travelLocation && travelDate && filteredGames.map(game => (
        <GameInfo 
        key={game.id} 
        game={game} 
        userTimezone={locations.find(loc => loc.id === travelLocation).timezone}
        travelLocation={travelLocation}
        viewingOptions={viewingOptions}
      />
      ))}

      {selectedLeague && filteredGames.length === 0 && (
        <p>No games found for the selected league and teams during your travel period.</p>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2" />
            International Viewing Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li>Check local broadcasting rights in your travel destination</li>
            <li>Be aware of time zone differences when scheduling viewing times</li>
            <li>Consider using a VPN to access your home country's streaming services</li>
            <li>Look for sports bars or public viewing areas in your travel location</li>
            <li>Subscribe to international sports streaming services if available</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}