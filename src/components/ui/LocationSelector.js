// LocationSelector.js
import React from "react";
import { MapPin, Calendar } from "lucide-react";

const LocationSelector = ({ locations, setWatchLocation, watchDate, setWatchDate }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <div className="space-y-2">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Where will you be watching?
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            id="location"
            onChange={(e) => setWatchLocation(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          When will you be watching?
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            id="date"
            type="date"
            value={watchDate}
            onChange={(e) => setWatchDate(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {watchDate && (
        <button
          onClick={() => setWatchDate("")}
          className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Clear Date
        </button>
      )}

      <p className="text-sm text-gray-500 mt-4">
        Select your location and viewing date to get personalized game schedules and viewing options.
      </p>
    </div>
  );
};

export default LocationSelector;