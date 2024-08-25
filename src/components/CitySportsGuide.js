"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const MapboxMap = dynamic(() => import("@/components/MapboxMap"), {
  loading: () => <p>Loading map...</p>,
  ssr: false,
});

const ITEMS_PER_PAGE = 20;

const CitySportsGuide = () => {
  const [cities, setCities] = useState([]);
  const [displayedCities, setDisplayedCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [page, setPage] = useState(1);
  const [mapKey, setMapKey] = useState(0);
  const [cityLoading, setCityLoading] = useState(false);

  const fetchCities = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/cities");
      if (!response.ok) {
        throw new Error("Failed to fetch city data");
      }
      const data = await response.json();
      console.log("Fetched cities data:", data); // Log the fetched data
      if (Array.isArray(data)) {
        setCities(data);
        setDisplayedCities(data.slice(0, ITEMS_PER_PAGE));
      } else if (typeof data === "object" && data !== null) {
        // If data is an object, try to extract an array of cities
        const citiesArray = Object.values(data);
        if (Array.isArray(citiesArray[0])) {
          setCities(citiesArray[0]);
          setDisplayedCities(citiesArray[0].slice(0, ITEMS_PER_PAGE));
        } else {
          throw new Error("Unexpected data structure for cities");
        }
      } else {
        throw new Error("Unexpected data structure for cities");
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cities:", err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  useEffect(() => {
    if (!Array.isArray(cities)) {
      console.error("Cities is not an array:", cities);
      return;
    }
    const filtered = cities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedCities(filtered.slice(0, page * ITEMS_PER_PAGE));
  }, [cities, searchTerm, page]);

  const getMapCenter = useCallback(() => {
    if (selectedTeam?.venue?.coordinates) {
      return [
        selectedTeam.venue.coordinates.longitude,
        selectedTeam.venue.coordinates.latitude,
      ];
    } else if (selectedCity?.coordinates) {
      return [
        selectedCity.coordinates.longitude,
        selectedCity.coordinates.latitude,
      ];
    }
    return [0, 0]; // Default center if no valid coordinates are found
  }, [selectedTeam, selectedCity]);

  const getMapMarkers = useCallback(() => {
    let markers = [];

    if (selectedTeam) {
      // Add the team's venue
      markers.push({
        ...selectedTeam.venue,
        type: 'venue',
        name: selectedTeam.venue.name,
        details: `Home of ${selectedTeam.name}`,
      });

      // Add all mapPoints from the team data
      if (selectedTeam.mapPoints) {
        markers = [...markers, ...selectedTeam.mapPoints];
      }
    } else if (selectedCity) {
      // Add markers for all teams in the city
      selectedCity.teams.forEach(team => {
        if (team.venue?.coordinates) {
          markers.push({
            ...team.venue,
            type: 'venue',
            name: team.venue.name,
            details: `Home of ${team.name}`,
          });
        }
      });

      // You could also add city-specific points of interest here
    }

    console.log("Map markers:", markers);
    return markers;
  }, [selectedTeam, selectedCity]);



  const fetchCityDetails = useCallback(async (cityName) => {
    setCityLoading(true);
    try {
      const response = await fetch(
        `/api/cities?city=${encodeURIComponent(cityName)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch city details");
      }
      const data = await response.json();
      setSelectedCity(data);
      setSelectedTeam(null);
      setMapKey((prev) => prev + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setCityLoading(false);
    }
  }, []);

  const handleCityClick = useCallback(
    (city) => {
      fetchCityDetails(city.name);
    },
    [fetchCityDetails]
  );

  const handleTeamClick = useCallback((team) => {
    setSelectedTeam(team);
    setMapKey((prev) => prev + 1);
  }, []);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Global Sports Cities Guide
      </h1>
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
            {Array.isArray(displayedCities) ? (
              displayedCities.map((city, index) => (
                <Button
                  key={index}
                  onClick={() => handleCityClick(city)}
                  className={`w-full justify-start ${
                    selectedCity?.name === city.name
                      ? "bg-blue-600"
                      : "bg-white/20"
                  }`}
                  disabled={cityLoading}
                >
                  {city.name}, {city.country}
                </Button>
              ))
            ) : (
              <p className="text-white">No cities to display</p>
            )}
            {Array.isArray(displayedCities) &&
              displayedCities.length < cities.length && (
                <Button onClick={loadMore} className="w-full mt-4">
                  Load More
                </Button>
              )}
          </div>
        </div>
        <div className="md:col-span-2">
        {cityLoading ? (
          <div className="text-white text-center">Loading city details...</div>
        ) : selectedCity ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-white">
              {selectedCity.name} Teams
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {selectedCity.teams.map((team, index) => (
                <Button
                  key={index}
                  onClick={() => handleTeamClick(team)}
                  className={`w-full justify-start ${
                    selectedTeam?.name === team.name
                      ? "bg-green-600"
                      : "bg-white/20"
                  }`}
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
                  <p>League: {selectedTeam.league}</p>
                  <p>Venue: {selectedTeam.venue.name}</p>
                  {/* Add more team details here */}
                </CardContent>
              </Card>
            )}
            <div className="h-96">
              <MapboxMap
                key={mapKey}
                center={getMapCenter()}
                zoom={selectedTeam ? 14 : 10}
                markers={getMapMarkers()}
              />
            </div>
          </>
        ) : (
          <div className="text-white text-center">
            Select a city to view details
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default CitySportsGuide;
