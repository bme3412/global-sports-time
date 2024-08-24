'use client';

import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapboxMap = memo(({ center, zoom, markers }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const initializeMap = useCallback(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [center[1], center[0]], // Note the order change here
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      setMapLoaded(true);
      updateMarkers();
    });
  }, [center, zoom]);

  const updateMarkers = useCallback(() => {
    if (!map.current || !markers || !mapLoaded) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    markers.forEach((marker) => {
      const coordinates = marker.venueCoordinates;
      
      // Create a DOM element for each marker
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(https://placekitten.com/g/40/40)';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.backgroundSize = '100%';
      el.style.borderRadius = '50%';

      // Add markers to the map
      const newMarker = new mapboxgl.Marker(el)
        .setLngLat([coordinates[1], coordinates[0]]) // Note the order change here
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(`<h3>${marker.name}</h3><p>${marker.venue}</p>`))
        .addTo(map.current);

      markersRef.current.push(newMarker);
    });

    // Fit map to markers
    if (markers.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach(marker => bounds.extend([marker.venueCoordinates[1], marker.venueCoordinates[0]])); // Note the order change here
      map.current.fitBounds(bounds, { padding: 50 });
    } else if (markers.length === 1) {
      map.current.flyTo({
        center: [markers[0].venueCoordinates[1], markers[0].venueCoordinates[0]], // Note the order change here
        zoom: 14,
        essential: true
      });
    }
  }, [markers, mapLoaded]);

  useEffect(() => {
    initializeMap();

    return () => {
      if (map.current && mapLoaded) {
        markersRef.current.forEach(marker => marker.remove());
        map.current.remove();
      }
    };
  }, [initializeMap, mapLoaded]);

  useEffect(() => {
    if (mapLoaded) {
      updateMarkers();

      // Update map view when center or zoom changes
      map.current.flyTo({
        center: [center[1], center[0]], // Note the order change here
        zoom: zoom,
        essential: true
      });
    }
  }, [updateMarkers, center, zoom, mapLoaded]);

  return (
    <div>
      <div ref={mapContainer} className="map-container" style={{ height: '400px' }} />
    </div>
  );
});

MapboxMap.displayName = 'MapboxMap';

export default MapboxMap;