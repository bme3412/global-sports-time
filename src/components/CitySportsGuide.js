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
  const [hotels, setHotels] = useState([]);
  const [teamInfo, setTeamInfo] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

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
      .filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, page * ITEMS_PER_PAGE);
  }, [cities, searchTerm, page]);

  const fetchTeamData = useCallback(async (cityName, teamName) => {
    try {
      const [attractionsResponse, restaurantsResponse, hotelsResponse, infoResponse] = await Promise.all([
        fetch(`/api/cities?city=${encodeURIComponent(cityName)}&team=${encodeURIComponent(teamName)}&type=attractions`),
        fetch(`/api/cities?city=${encodeURIComponent(cityName)}&team=${encodeURIComponent(teamName)}&type=restaurants`),
        fetch(`/api/cities?city=${encodeURIComponent(cityName)}&team=${encodeURIComponent(teamName)}&type=hotels`),
        fetch(`/api/cities?city=${encodeURIComponent(cityName)}&team=${encodeURIComponent(teamName)}&type=info`)
      ]);

      const attractionsData = attractionsResponse.ok ? await attractionsResponse.json() : { attractions: [] };
      const restaurantsData = restaurantsResponse.ok ? await restaurantsResponse.json() : { restaurants: [] };
      const hotelsData = hotelsResponse.ok ? await hotelsResponse.json() : { hotels: [] };
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

  const handleTeamClick = useCallback((team) => {
    setSelectedTeam(team);
    if (selectedCity) {
      fetchTeamData(selectedCity.name, team.name);
    }
    setMapKey((prev) => prev + 1);
  }, [selectedCity, fetchTeamData]);

  const handleItemClick = useCallback((item) => {
    setSelectedMarker(item);
    setMapKey((prev) => prev + 1);
  }, []);

  const getMapCenter = useCallback(() => {
    if (teamInfo?.venue?.coordinates) {
      return [teamInfo.venue.coordinates.longitude, teamInfo.venue.coordinates.latitude];
    } else if (selectedCity?.coordinates) {
      return [selectedCity.coordinates.longitude, selectedCity.coordinates.latitude];
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
        ...attractions.map((attraction) => ({ ...attraction, type: "attraction" })),
        ...restaurants.map((restaurant) => ({ ...restaurant, type: "restaurant" })),
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
      const response = await fetch(`/api/cities?city=${encodeURIComponent(cityName)}`);
      if (!response.ok) throw new Error(`Failed to fetch city details: ${response.status}`);
      const data = await response.json();
      setSelectedCity(data);
      setSelectedTeam(null);
      setAttractions([]);
      setRestaurants([]);
      setHotels([]);
      setTeamInfo(null);
      setMapKey((prev) => prev + 1);
    } catch (err) {
      console.error("Error in fetchCityDetails:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCityClick = useCallback((city) => {
    fetchCityDetails(city.name);
  }, [fetchCityDetails]);

  const loadMore = () => setPage((prevPage) => prevPage + 1);

  if (loading) return <div className="text-gray-800 text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <aside className="w-64 bg-white p-4 overflow-hidden flex flex-col border-r border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Cities</h2>
        <Input
          type="text"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <div className="overflow-y-auto flex-grow custom-scrollbar">
          <div className="space-y-2">
            {displayedCities.map((city, index) => (
              <Button
                key={index}
                onClick={() => handleCityClick(city)}
                className={`w-full justify-start ${
                  selectedCity?.name === city.name ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {city.name}, {city.country}
              </Button>
            ))}
            {displayedCities.length < cities.length && (
              <Button onClick={loadMore} className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600">
                Load More
              </Button>
            )}
          </div>
        </div>
      </aside>
      <main className="flex-1 p-4 flex flex-col overflow-hidden">
        {selectedCity && (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">{selectedCity.name} Teams</h2>
              <div className="flex flex-wrap gap-2">
                {selectedCity.teams.map((team, index) => (
                  <Button
                    key={index}
                    onClick={() => handleTeamClick(team)}
                    className={`${
                      selectedTeam?.name === team.name ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {team.name} ({team.league})
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex-grow flex flex-col">
              <div className="h-[50vh] mb-4">
                <MapboxMap
                  key={mapKey}
                  center={getMapCenter()}
                  zoom={teamInfo ? 14 : 10}
                  markers={getMapMarkers()}
                  selectedMarker={selectedMarker}
                  mapStyle="mapbox://styles/mapbox/standard"
                />
              </div>
              <div className="flex-grow overflow-hidden">
                {teamInfo && (
                  <Tabs defaultValue="attractions" className="h-full flex flex-col">
                    <TabsList className="bg-gray-200">
                      <TabsTrigger value="attractions" className="data-[state=active]:bg-white">Attractions</TabsTrigger>
                      <TabsTrigger value="restaurants" className="data-[state=active]:bg-white">Restaurants</TabsTrigger>
                      <TabsTrigger value="hotels" className="data-[state=active]:bg-white">Hotels</TabsTrigger>
                    </TabsList>
                    <div className="flex-grow overflow-y-auto custom-scrollbar">
                      <TabsContent value="attractions">
                        <Card>
                          <CardHeader>
                            <CardTitle>Nearby Attractions</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-4">
                              {attractions.map((attraction, index) => (
                                <li 
                                  key={index} 
                                  className="border-b pb-2 last:border-b-0 cursor-pointer hover:bg-gray-100"
                                  onClick={() => handleItemClick(attraction)}
                                >
                                  <h3 className="font-bold text-lg">{attraction.name}</h3>
                                  <p className="text-gray-600">{attraction.description}</p>
                                  <p className="text-sm">Distance: {attraction.distance}</p>
                                  <a href={attraction.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Visit Website
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="restaurants">
                        <Card>
                          <CardHeader>
                            <CardTitle>Nearby Restaurants</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-4">
                              {restaurants.map((restaurant, index) => (
                                <li 
                                  key={index} 
                                  className="border-b pb-2 last:border-b-0 cursor-pointer hover:bg-gray-100"
                                  onClick={() => handleItemClick(restaurant)}
                                >
                                  <h3 className="font-bold text-lg">{restaurant.name}</h3>
                                  <p className="text-gray-600">{restaurant.description}</p>
                                  <p className="text-sm">Distance: {restaurant.distance}</p>
                                  <p className="text-sm">Type: {restaurant.type} | Price Range: {restaurant.priceRange}</p>
                                  <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Visit Website
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="hotels">
                        <Card>
                          <CardHeader>
                            <CardTitle>Nearby Hotels</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-4">
                              {hotels.map((hotel, index) => (
                                <li 
                                  key={index} 
                                  className="border-b pb-2 last:border-b-0 cursor-pointer hover:bg-gray-100"
                                  onClick={() => handleItemClick(hotel)}
                                >
                                  <h3 className="font-bold text-lg">{hotel.name}</h3>
                                  <p className="text-gray-600">{hotel.description}</p>
                                  <p className="text-sm">Distance: {hotel.distance}</p>
                                  <p className="text-sm">Type: {hotel.type} | Price Range: {hotel.priceRange}</p>
                                  <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Visit Website
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </div>
                  </Tabs>
                )}
              </div>
            </div>
          </>
        )}
      </main>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default CitySportsGuide;