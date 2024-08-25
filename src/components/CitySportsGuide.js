"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

const MapboxMap = dynamic(() => import("@/components/MapboxMap"), {
  loading: () => <p>Loading map...</p>,
  ssr: false,
});

const ITEMS_PER_PAGE = 20;

const CitySportsGuide = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [page, setPage] = useState(1);
  const [mapKey, setMapKey] = useState(0);
  const [attractions, setAttractions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [teamInfo, setTeamInfo] = useState(null);
  const [hotels, setHotels] = useState([]);

  const fetchCities = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/cities");
      if (!response.ok) throw new Error("Failed to fetch city data");
      const data = await response.json();
      setCities(data.cities || []);
    } catch (err) {
      console.error("Error fetching cities:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const displayedCities = useMemo(() => {
    return cities
      .filter(
        (city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.country?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, page * ITEMS_PER_PAGE);
  }, [cities, searchTerm, page]);

  const fetchTeamData = useCallback(async (cityName, teamName) => {
    try {
      const [
        attractionsResponse,
        restaurantsResponse,
        hotelsResponse,
        infoResponse,
      ] = await Promise.all([
        fetch(
          `/api/cities?city=${encodeURIComponent(
            cityName
          )}&team=${encodeURIComponent(teamName)}&type=attractions`
        ),
        fetch(
          `/api/cities?city=${encodeURIComponent(
            cityName
          )}&team=${encodeURIComponent(teamName)}&type=restaurants`
        ),
        fetch(
          `/api/cities?city=${encodeURIComponent(
            cityName
          )}&team=${encodeURIComponent(teamName)}&type=hotels`
        ),
        fetch(
          `/api/cities?city=${encodeURIComponent(
            cityName
          )}&team=${encodeURIComponent(teamName)}&type=info`
        ),
      ]);

      const attractionsData = attractionsResponse.ok
        ? await attractionsResponse.json()
        : { attractions: [] };
      const restaurantsData = restaurantsResponse.ok
        ? await restaurantsResponse.json()
        : { restaurants: [] };
      const hotelsData = hotelsResponse.ok
        ? await hotelsResponse.json()
        : { hotels: [] };
      const infoData = infoResponse.ok ? await infoResponse.json() : null;

      setAttractions(attractionsData.attractions || []);
      setRestaurants(restaurantsData.restaurants || []);
      setHotels(hotelsData.hotels || []);
      setTeamInfo(infoData);
    } catch (error) {
      console.error("Error fetching team data:", error);
      setError(error.message);
      setAttractions([]);
      setRestaurants([]);
      setHotels([]);
      setTeamInfo(null);
    }
  }, []);

  const handleTeamClick = useCallback(
    (team) => {
      setSelectedTeam(team);
      if (selectedCity) {
        fetchTeamData(selectedCity.name, team.name);
      }
      setMapKey((prev) => prev + 1);
    },
    [selectedCity, fetchTeamData]
  );

  const getMapCenter = useCallback(() => {
    if (teamInfo?.venue?.coordinates) {
      return [
        teamInfo.venue.coordinates.longitude,
        teamInfo.venue.coordinates.latitude,
      ];
    } else if (selectedCity?.coordinates) {
      return [
        selectedCity.coordinates.longitude,
        selectedCity.coordinates.latitude,
      ];
    }
    return [0, 0];
  }, [teamInfo, selectedCity]);

  const getMapMarkers = useCallback(() => {
    let markers = [];
    if (teamInfo) {
      if (teamInfo.venue && teamInfo.venue.coordinates) {
        markers.push({
          ...teamInfo.venue,
          type: "venue",
          name: teamInfo.venue.name,
          details: `Home of ${teamInfo.name}`,
        });
      }

      markers = [
        ...markers,
        ...attractions.map((attraction) => ({
          ...attraction,
          type: "attraction",
        })),
        ...restaurants.map((restaurant) => ({
          ...restaurant,
          type: "restaurant",
        })),
        ...hotels.map((hotel) => ({ ...hotel, type: "hotel" })),
      ];
    } else if (selectedCity && Array.isArray(selectedCity.teams)) {
      selectedCity.teams.forEach((team) => {
        if (team.venue?.coordinates) {
          markers.push({
            ...team.venue,
            type: "venue",
            name: team.venue.name,
            details: `Home of ${team.name}`,
          });
        }
      });
    }
    return markers;
  }, [teamInfo, selectedCity, attractions, restaurants, hotels]);

  const fetchCityDetails = useCallback(async (cityName) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/cities?city=${encodeURIComponent(cityName)}`
      );
      if (!response.ok)
        throw new Error(`Failed to fetch city details: ${response.status}`);
      const data = await response.json();
      setSelectedCity(data);
      setSelectedTeam(null);
      setAttractions([]);
      setRestaurants([]);
      setTeamInfo(null);
      setMapKey((prev) => prev + 1);
    } catch (err) {
      console.error("Error in fetchCityDetails:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCityClick = useCallback(
    (city) => {
      fetchCityDetails(city.name);
    },
    [fetchCityDetails]
  );

  const loadMore = () => setPage((prevPage) => prevPage + 1);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

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
            {displayedCities.map((city, index) => (
              <Button
                key={index}
                onClick={() => handleCityClick(city)}
                className={`w-full justify-start ${
                  selectedCity?.name === city.name
                    ? "bg-blue-600"
                    : "bg-white/20"
                }`}
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
          {selectedCity ? (
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
              {teamInfo && (
        <Tabs defaultValue="info" className="w-full mb-6">
          <TabsList>
            <TabsTrigger value="info">Team Info</TabsTrigger>
            <TabsTrigger value="attractions">Attractions</TabsTrigger>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <Card className="bg-white/20 backdrop-blur-md text-white">
              <CardHeader>
                <CardTitle>{teamInfo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>League: {teamInfo.league}</p>
                <p>Venue: {teamInfo.venue.name}</p>
                <p>Address: {teamInfo.venue.address}</p>
                <p>Capacity: {teamInfo.venue.capacity}</p>
                <p>Opened: {teamInfo.venue.opened}</p>
                <p>Championships: {teamInfo.championships}</p>
                <a
                  href={teamInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:underline"
                >
                  Official Website
                </a>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="attractions">
            <Card className="bg-white/20 backdrop-blur-md text-white">
              <CardHeader>
                <CardTitle>Nearby Attractions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {attractions.map((attraction, index) => (
                    <li key={index}>
                      <h3 className="font-bold">{attraction.name}</h3>
                      <p>{attraction.description}</p>
                      <p>Distance: {attraction.distance}</p>
                      <a href={attraction.website} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
                        Visit Website
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="restaurants">
            <Card className="bg-white/20 backdrop-blur-md text-white">
              <CardHeader>
                <CardTitle>Nearby Restaurants</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {restaurants.map((restaurant, index) => (
                    <li key={index}>
                      <h3 className="font-bold">{restaurant.name}</h3>
                      <p>{restaurant.description}</p>
                      <p>Distance: {restaurant.distance}</p>
                      <p>Type: {restaurant.type} | Price Range: {restaurant.priceRange}</p>
                      <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
                        Visit Website
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="hotels">
            <Card className="bg-white/20 backdrop-blur-md text-white">
              <CardHeader>
                <CardTitle>Nearby Hotels</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {hotels.map((hotel, index) => (
                    <li key={index}>
                      <h3 className="font-bold">{hotel.name}</h3>
                      <p>{hotel.description}</p>
                      <p>Distance: {hotel.distance}</p>
                      <p>Type: {hotel.type} | Price Range: {hotel.priceRange}</p>
                      <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
                        Visit Website
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      <div className="h-96">
        <MapboxMap
          key={mapKey}
          center={getMapCenter()}
          zoom={teamInfo ? 14 : 10}
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
