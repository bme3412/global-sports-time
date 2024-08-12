import React from 'react';
import { Clock, MapPin, AlertCircle } from 'lucide-react';
import { formatInTimeZone } from 'date-fns-tz';
import { parse } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GameTimeConverter = ({ gameTime, gameDate, gameTimezone, watchLocation, locations }) => {
  const selectedLocation = locations.find(loc => loc.id === watchLocation);
  
  if (!selectedLocation) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Game Time Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-yellow-600">
            <AlertCircle size={16} />
            <span>Please select a watch location to see converted game times.</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const watchTimezone = selectedLocation.timezone;

  const convertTime = (time, date, sourceTimezone, targetTimezone) => {
    if (!time || !date) return null;
    try {
      const parsedDate = parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm', new Date());
      return formatInTimeZone(parsedDate, targetTimezone, 'MMM d, yyyy HH:mm zzz');
    } catch (error) {
      console.error('Error converting time:', error, { time, date, sourceTimezone, targetTimezone });
      return 'Invalid Date';
    }
  };

  const gameTimeFormatted = convertTime(gameTime, gameDate, gameTimezone, gameTimezone);
  const localTimeFormatted = convertTime(gameTime, gameDate, gameTimezone, watchTimezone);

  console.log("Game Time Converter props:", { gameTime, gameDate, gameTimezone, watchLocation }); // Debug log

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Game Time Converter</CardTitle>
      </CardHeader>
      <CardContent>
        {gameTime && gameDate ? (
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
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-yellow-600">
            <AlertCircle size={16} />
            <span>No game time selected. Please choose a game to see converted times.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameTimeConverter;