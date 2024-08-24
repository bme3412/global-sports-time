'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';

const MapboxMap = dynamic(() => import('@/components/MapboxMap'), { 
  loading: () => <p>Loading map...</p>,
  ssr: false 
});

const ITEMS_PER_PAGE = 20;

const CitySportsGuide = () => {
  const [cities, setCities] = useState([]);
  const [displayedCities, setDisplayedCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [page, setPage] = useState(1);
  const [mapKey, setMapKey] = useState(0);

  const fetchCities = useCallback(async () => {
    try {
      const response = await fetch('/api/cities');
      if (!response.ok) {
        throw new Error('Failed to fetch city data');
      }
      const data = await response.json();
      setCities(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  useEffect(() => {
    const filtered = cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedCities(filtered.slice(0, page * ITEMS_PER_PAGE));
  }, [cities, searchTerm, page]);

  const handleCityClick = useCallback((city) => {
    setSelectedCity(city);
    setSelectedTeam(null);
    setMapKey(prev => prev + 1);
  }, []);

  const handleTeamClick = useCallback((team) => {
    setSelectedTeam(team);
    setMapKey(prev => prev + 1);
  }, []);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Global Sports Cities Guide</h1>
      <Input
        type="text"
        placeholder="Search cities or countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-white">Cities</h2>
          <div className="space-y-4">
            {displayedCities.map((city, index) => (
              <Button
                key={index}
                onClick={() => handleCityClick(city)}
                className={`w-full justify-start ${selectedCity?.name === city.name ? 'bg-blue-600' : 'bg-white/20'}`}
              >
                {city.name}, {city.country}
              </Button>
            ))}
            {displayedCities.length < cities.length && (
              <Button onClick={loadMore} className="w-full mt-4">
                Load More
              </Button>
            )}
          </div>
        </div>
        <div className="md:col-span-2">
        {selectedCity && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-white">{selectedCity.name} Teams</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {selectedCity.teams.map((team, index) => (
                <Button
                  key={index}
                  onClick={() => handleTeamClick(team)}
                  className={`w-full justify-start ${selectedTeam?.name === team.name ? 'bg-green-600' : 'bg-white/20'}`}
                >
                  {team.name} ({team.league})
                </Button>
              ))}
            </div>
            {selectedTeam && (
              <Card className="bg-white/20 backdrop-blur-md text-white mb-6">
                <CardHeader>
                  <CardTitle>{selectedTeam.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Sport: {selectedTeam.sport}</p>
                  <p>League: {selectedTeam.league}</p>
                  <p>Venue: {selectedTeam.venue}</p>
                  <a href={selectedTeam.website} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
                    Official Website
                  </a>
                </CardContent>
              </Card>
            )}
            <div className="h-96">
              <MapboxMap
                key={mapKey}
                center={selectedTeam ? selectedTeam.venueCoordinates : selectedCity.coordinates}
                zoom={selectedTeam ? 14 : 10}
                markers={selectedTeam ? [selectedTeam] : selectedCity.teams}
              />
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default CitySportsGuide;