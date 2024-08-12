import React, { useState, useEffect } from "react";
import { MapPin, Calendar, AlertCircle } from "lucide-react";
import { format, isAfter, isBefore } from "date-fns";

// Helper function to convert country code to emoji flag
const getCountryFlag = (countryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

const LocationSelector = ({ locations, setWatchLocation, watchDateRange, setWatchDateRange }) => {
  const [localDateRange, setLocalDateRange] = useState({ start: "", end: "" });
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (watchDateRange && typeof watchDateRange === 'object') {
      setLocalDateRange(watchDateRange);
    }
  }, [watchDateRange]);

  const handleDateChange = (e, type) => {
    const newDateRange = {
      ...localDateRange,
      [type]: e.target.value
    };

    if (newDateRange.start && newDateRange.end) {
      if (isAfter(new Date(newDateRange.start), new Date(newDateRange.end))) {
        setDateError("End date cannot be before start date");
        return;
      }
    }

    setDateError("");
    setLocalDateRange(newDateRange);
    if (typeof setWatchDateRange === 'function') {
      setWatchDateRange(newDateRange);
    }
  };

  const clearDateRange = () => {
    const emptyDateRange = { start: "", end: "" };
    setLocalDateRange(emptyDateRange);
    setDateError("");
    if (typeof setWatchDateRange === 'function') {
      setWatchDateRange(emptyDateRange);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMM d, yyyy");
  };

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
                {`${location.name} ${getCountryFlag(location.country)}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          When will you be watching?
        </label>
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={localDateRange.start}
              onChange={(e) => handleDateChange(e, 'start')}
              className="w-full pl-10 pr-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Start date"
            />
          </div>
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={localDateRange.end}
              onChange={(e) => handleDateChange(e, 'end')}
              className="w-full pl-10 pr-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="End date"
            />
          </div>
        </div>
        {dateError && (
          <div className="text-red-500 text-sm flex items-center mt-2">
            <AlertCircle className="w-4 h-4 mr-1" />
            {dateError}
          </div>
        )}
        {localDateRange.start && localDateRange.end && !dateError && (
          <div className="text-green-500 text-sm mt-2">
            Selected range: {formatDate(localDateRange.start)} - {formatDate(localDateRange.end)}
          </div>
        )}
      </div>

      {(localDateRange.start || localDateRange.end) && (
        <button
          onClick={clearDateRange}
          className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Clear Date Range
        </button>
      )}

      <p className="text-sm text-gray-500 mt-4">
        Select your location and viewing date range to get personalized game schedules and viewing options.
      </p>
    </div>
  );
};

export default LocationSelector;