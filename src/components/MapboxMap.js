import React, { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./MapboxMap.module.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapboxMap = ({ center, zoom, markers }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const isValidCoordinate = (coord) => {
    return (
      Array.isArray(coord) &&
      coord.length === 2 &&
      !isNaN(coord[0]) &&
      !isNaN(coord[1]) &&
      Math.abs(coord[0]) <= 180 &&
      Math.abs(coord[1]) <= 90
    );
  };

  const initializeMap = useCallback(() => {
    if (map.current) return; // initialize map only once
    const validCenter = isValidCoordinate(center) ? center : [0, 0];
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: validCenter,
      zoom: zoom || 2,
    });
    map.current.on("load", () => {
      setMapLoaded(true);
    });
  }, [center, zoom]);

  useEffect(() => {
    initializeMap();
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [initializeMap]);

  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    const validCenter = isValidCoordinate(center) ? center : [0, 0];
    map.current.setCenter(validCenter);
    map.current.setZoom(zoom || 2);

    // Clear existing markers
    const existingMarkers = document.getElementsByClassName('mapboxgl-marker');
    while (existingMarkers[0]) {
      existingMarkers[0].parentNode.removeChild(existingMarkers[0]);
    }

    // Add new markers
    markers.forEach(marker => {
      if (marker.coordinates && isValidCoordinate([marker.coordinates.longitude, marker.coordinates.latitude])) {
        const el = document.createElement('div');
        el.className = `${styles.marker} ${styles[marker.type || 'default']}`;

        // Create a popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${marker.name || 'Unnamed Location'}</h3>
           ${marker.address ? `<p>${marker.address}</p>` : ''}
           ${marker.details ? `<p>${marker.details}</p>` : ''}
           ${marker.website ? `<a href="${marker.website}" target="_blank">Visit Website</a>` : ''}`
        );

        // Add marker to the map
        new mapboxgl.Marker(el)
          .setLngLat([marker.coordinates.longitude, marker.coordinates.latitude])
          .setPopup(popup)
          .addTo(map.current);
      } else {
        console.warn("Invalid marker coordinates:", marker);
      }
    });
  }, [center, zoom, markers, mapLoaded]);

  return <div ref={mapContainer} className={styles.mapContainer} />;
};

export default MapboxMap;