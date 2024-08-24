'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from 'lucide-react';

// Dynamically import mapbox-gl
let mapboxgl = null;
if (typeof window !== 'undefined') {
  mapboxgl = require('mapbox-gl');
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
}

const EventCard = React.memo(({ event, isSelected, onClick }) => {
  return (
    <Card 
      className={`mb-4 cursor-pointer transition-all duration-200 ${
        isSelected ? 'bg-blue-600 text-white' : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{event.name}</span>
          <Badge variant="secondary" className={isSelected ? 'bg-white text-blue-600' : 'bg-blue-500/50 text-white'}>{event.sport}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm mb-2">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-sm">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{event.location}</span>
        </div>
      </CardContent>
    </Card>
  );
});

EventCard.displayName = 'EventCard';

const EventsFull = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapContainer = useRef(null);
  const map = useRef(null);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch('/events.json');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (loading || !mapboxgl) return;
    if (map.current) return;

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [0, 0],
        zoom: 1
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [loading]);

  useEffect(() => {
    if (!map.current || !selectedEvent) return;

    map.current.flyTo({
      center: selectedEvent.coordinates,
      zoom: 5,
      essential: true
    });

    new mapboxgl.Marker()
      .setLngLat(selectedEvent.coordinates)
      .addTo(map.current);
  }, [selectedEvent]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-900 text-white">Loading events...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen bg-gray-900 text-white">Error: {error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-1/2 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Full Events List</h1>
        {events.map((event, index) => (
          <EventCard 
            key={index} 
            event={event} 
            isSelected={selectedEvent === event}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </div>
      <div className="w-1/2 p-6">
        <div ref={mapContainer} className="w-full h-2/3 rounded-lg" />
        {selectedEvent && (
          <div className="mt-4 bg-white/10 backdrop-blur-md p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{selectedEvent.name}</h2>
            <p className="text-sm mb-2">{selectedEvent.date} | {selectedEvent.sport}</p>
            <p className="text-sm mb-2">{selectedEvent.location}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsFull;