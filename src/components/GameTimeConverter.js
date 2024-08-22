import React, { useState, useEffect } from "react";
import { AlertCircle, Clock, Tv, Calendar, MapPin, Globe, Heart } from "lucide-react";
import { formatInTimeZone, format } from "date-fns-tz";
import { parse, isAfter, isValid } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReactCountryFlag from "react-country-flag";


const GameTimeConverter = ({
  gameId,
  gameTime,
  gameDate,
  gameTimezone,
  watchLocation,
  locations,
  broadcastData,
  venue,
  homeTeam,
  awayTeam,
  userCountry,
  league,
}) => {
  const [countryBroadcastData, setCountryBroadcastData] = useState(null);
  const [teamData, setTeamData] = useState({
    homeTeam: homeTeam || "Home Team",
    awayTeam: awayTeam || "Away Team",
  });
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const countryCode = userCountry.toLowerCase();
    const newCountryBroadcastData =
      broadcastData && broadcastData[countryCode]
        ? broadcastData[countryCode]
        : null;
    setCountryBroadcastData(newCountryBroadcastData);

    setTeamData({ homeTeam, awayTeam });
  }, [broadcastData, userCountry, homeTeam, awayTeam]);

  const selectedLocation = locations.find((loc) => loc.id === watchLocation);

  if (!selectedLocation) {
    return (
      <Card className="mt-4 border-yellow-300 bg-yellow-50 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-yellow-700 flex items-center">
            <AlertCircle size={20} className="mr-2" />
            Game Time Converter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-600">
            Please select a watch location to see converted game times and options.
          </p>
        </CardContent>
      </Card>
    );
  }

  const watchTimezone = selectedLocation.timezone;

  const convertTime = (time, date, sourceTimezone, targetTimezone) => {
    if (!time || !date) return null;
    try {
      let parsedDate = parse(date, "yyyy-MM-dd", new Date());
      if (!isValid(parsedDate)) {
        parsedDate = new Date(date);
      }

      if (!isValid(parsedDate)) {
        throw new Error("Unable to parse date");
      }

      const [hours, minutes] = time.split(":");
      parsedDate.setHours(parseInt(hours), parseInt(minutes));

      const convertedDate = formatInTimeZone(
        parsedDate,
        targetTimezone,
        "yyyy-MM-dd"
      );
      const isNextDay = isAfter(
        parse(convertedDate, "yyyy-MM-dd", new Date()),
        parsedDate
      );

      return {
        time: formatInTimeZone(parsedDate, targetTimezone, "h:mm a"),
        date: formatInTimeZone(parsedDate, targetTimezone, "MMMM d, yyyy"),
        timezone: formatInTimeZone(parsedDate, targetTimezone, "zzz"),
        isNextDay: isNextDay,
      };
    } catch (error) {
      console.error("Error converting time:", error);
      return null;
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

  const TimeDisplay = ({
    title,
    time,
    date,
    timezone,
    location,
    isNextDay,
    icon,
    countryCode,
  }) => (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="font-semibold text-blue-800 flex items-center justify-between mb-2">
        <div className="flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </div>
        <ReactCountryFlag countryCode={countryCode} svg style={{ width: '1.5em', height: '1.5em' }} />
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold mr-2">{time}</span>
        <Badge variant="secondary">{timezone}</Badge>
      </div>
      <div className="text-sm text-gray-600 mt-1">{date}</div>
      <div className="text-sm text-gray-600">{location}</div>
      {isNextDay && (
        <div className="text-sm text-red-600 mt-2 flex items-center">
          <Clock size={14} className="mr-1" />
          Note: This is the next day
        </div>
      )}
    </div>
  );

  const OptionsDisplay = ({ title, options, icon }) => (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="font-semibold text-blue-800 mb-2 flex items-center">
        {icon}
        <span className="ml-2">{title}:</span>
      </div>
      <ul className="space-y-1">
        {options.map((option, index) => (
          <li key={index} className="flex items-center">
            <span className="text-blue-500 mr-2">•</span>
            {option.link ? (
              <a
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {option.name}
              </a>
            ) : (
              <span>{option.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  const formatGameTitle = () => {
    if (!gameTimeFormatted) return 'Game details not available';
    
    const formattedDate = gameTimeFormatted.date;
    const venueParts = venue ? venue.split(', ') : [];
    const venueCity = venueParts.length > 1 ? venueParts[venueParts.length - 1] : 'Unknown';
    
    return {
      date: formattedDate,
      awayTeam: teamData.awayTeam,
      homeTeam: teamData.homeTeam,
      city: venueCity
    };
  };

  const gameTitleData = formatGameTitle();

  return (
    <Card className="mt-4 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
        <CardTitle className="text-2xl font-bold text-blue-800 space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-lg px-3 py-1">
              {league}
            </Badge>
            <div className="flex items-center space-x-2">
              <MapPin className="text-blue-500" size={20} />
              <span className="text-lg font-semibold">{gameTitleData.city}</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-center py-4">
            <span className="text-indigo-600">{gameTitleData.awayTeam}</span>
            <span className="text-gray-500 mx-3">vs</span>
            <span className="text-blue-600">{gameTitleData.homeTeam}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-lg">
            <Calendar className="text-blue-500" size={20} />
            <span className="font-semibold">{gameTitleData.date}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {gameTimeFormatted ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TimeDisplay 
                title="Game Time (Venue)"
                time={gameTimeFormatted.time}
                date={gameTimeFormatted.date}
                timezone={gameTimeFormatted.timezone}
                location={venue || "Venue not specified"}
                isNextDay={false}
                icon={<Globe size={18} className="text-blue-500" />}
              />
              <TimeDisplay 
                title="Your Local Time"
                time={localTimeFormatted.time}
                date={localTimeFormatted.date}
                timezone={localTimeFormatted.timezone}
                location={selectedLocation.name}
                isNextDay={localTimeFormatted.isNextDay}
                icon={<Clock size={18} className="text-blue-500" />}
              />
            </div>
            {countryBroadcastData && (
              <>
                <Separator className="my-4" />
                <OptionsDisplay 
                  title="Broadcast Options" 
                  options={countryBroadcastData.services} 
                  icon={<Tv size={18} className="text-blue-500" />}
                />
              </>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 p-4 rounded-lg">
            <AlertCircle size={20} />
            <span>No valid game time available. Please check the game details.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameTimeConverter;