import React from "react";
import {
  Clock,
  MapPin,
  AlertCircle,
  Tv,
  DollarSign,
  Info,
  AlertTriangle,
} from "lucide-react";
import { formatInTimeZone } from "date-fns-tz";
import { parse } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GameTimeConverter = ({
  gameTime,
  gameDate,
  gameTimezone,
  watchLocation,
  locations,
  broadcastData,
  venue,
  matchName,
}) => {
  const selectedLocation = locations.find((loc) => loc.id === watchLocation);

  if (!selectedLocation) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Game Time Converter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-yellow-600">
            <AlertCircle size={16} />
            <span>
              Please select a watch location to see converted game times and
              broadcast options.
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const watchTimezone = selectedLocation.timezone;
  const countryCode = selectedLocation.countryCode
    ? selectedLocation.countryCode.toLowerCase()
    : "unknown";

  // Safely access broadcastData
  const countryBroadcastData =
    broadcastData &&
    broadcastData.premierLeague &&
    broadcastData.premierLeague[countryCode]
      ? broadcastData.premierLeague[countryCode]
      : null;

  const convertTime = (time, date, sourceTimezone, targetTimezone) => {
    if (!time || !date) return null;
    try {
      const parsedDate = parse(date, "EEEE d MMMM yyyy", new Date());
      const [hours, minutes] = time.split(":");
      parsedDate.setHours(parseInt(hours), parseInt(minutes));
      return formatInTimeZone(
        parsedDate,
        targetTimezone,
        "MMM d, yyyy HH:mm zzz"
      );
    } catch (error) {
      console.error("Error converting time:", error, {
        time,
        date,
        sourceTimezone,
        targetTimezone,
      });
      return "Invalid Date";
    }
  };

  const gameTimeFormatted = convertTime(
    gameTime,
    gameDate,
    gameTimezone,
    gameTimezone
  );
  const localTimeFormatted = convertTime(
    gameTime,
    gameDate,
    gameTimezone,
    watchTimezone
  );

  const renderBroadcastOptions = () => {
    if (!Array.isArray(broadcastData)) {
      return <span>Broadcast information not available</span>;
    }

    return (
      <ul className="list-disc list-inside space-y-1 text-sm">
        {broadcastData.map((option, index) => (
          <li key={index}>
            {option.link ? (
              <a
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {option.name}
              </a>
            ) : (
              <span>{option.name}</span>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {matchName || "Game Time Converter"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {gameTime && gameDate ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Clock size={16} className="text-blue-500" />
                <span className="font-medium">Game Time (Local):</span>
                <span>{gameTimeFormatted}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin size={16} className="text-green-500" />
                <span className="font-medium">Your Local Time:</span>
                <span>{localTimeFormatted}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span>Watch Location: {selectedLocation.name}</span>
              </div>
              {venue && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>Venue: {venue}</span>
                </div>
              )}
            </div>
            {countryBroadcastData ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Tv size={16} className="text-purple-500" />
                    <span className="font-medium">Broadcast Options:</span>
                  </div>
                  {renderBroadcastOptions()}
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {countryBroadcastData.services.map((service, index) => (
                      <li key={index}>
                        {service.link ? (
                          <a
                            href={service.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {service.name}
                          </a>
                        ) : (
                          <span>{service.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign size={16} className="text-green-500" />
                  <span className="font-medium">Viewing Cost:</span>
                  <span>{countryBroadcastData.cost}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <AlertTriangle size={16} className="text-yellow-500" />
                  <span className="font-medium">Restrictions:</span>
                  <span>{countryBroadcastData.restrictions}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Info size={16} className="text-blue-500" />
                  <span className="font-medium">Additional Info:</span>
                  <span>{countryBroadcastData.additionalInfo}</span>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2 text-yellow-600">
                <AlertCircle size={16} />
                <span>
                  No broadcast information available for this location.
                </span>
              </div>
            )}
          </div>
        ) : (
            <div className="flex items-center space-x-2 text-yellow-600">
            <AlertCircle size={16} />
            <span>No game time selected. Please choose a game to see converted times and broadcast options.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameTimeConverter;