import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from 'lucide-react';

const events = [
  {
    name: "FIFA World Cup",
    date: "June 8 - July 3, 2026",
    league: "FIFA",
    location: "United States, Canada, Mexico",
    icon: "⚽",
  },
  {
    name: "Summer Olympics",
    date: "July 23 - August 8, 2028",
    league: "IOC",
    location: "Los Angeles, USA",
    icon: "🏅",
  },
  {
    name: "Rugby World Cup",
    date: "September - October, 2027",
    league: "World Rugby",
    location: "Australia",
    icon: "🏉",
  },
  {
    name: "Cricket World Cup",
    date: "February - March, 2027",
    league: "ICC",
    location: "South Africa",
    icon: "🏏",
  },
  {
    name: "Tennis Grand Slams",
    date: "Throughout 2025",
    league: "ATP/WTA",
    location: "Various",
    icon: "🎾",
  },
  {
    name: "Formula 1 World Championship",
    date: "March - December, 2025",
    league: "FIA",
    location: "Global",
    icon: "🏎️",
  },
];

const FeaturedEvents = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <Card key={index} className="bg-white/20 backdrop-blur-md text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{event.name}</span>
              <div className="w-10 h-10 flex items-center justify-center bg-blue-500/30 rounded-full">
                <span className="text-2xl">{event.icon}</span>
              </div>
            </CardTitle>
            <div className="flex items-center justify-between mt-2">
              <Badge variant="secondary" className="bg-blue-500/50 text-white">{event.league}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-blue-100 mb-2">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="text-sm">{event.date}</span>
            </div>
            <div className="flex items-center text-blue-100">
              <MapPin className="mr-2 h-4 w-4" />
              <span className="text-sm">{event.location}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedEvents;