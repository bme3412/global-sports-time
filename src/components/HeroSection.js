import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const featuredEvents = [
  {
    name: "FIFA World Cup 2026",
    date: "June 11 - July 19, 2026",
    location: "USA, Canada, Mexico",
    ticketInfo: "Tickets on sale from December 2025",
    streamingOptions: "FIFA+, local broadcasters worldwide"
  },
  {
    name: "2024 Summer Olympics",
    date: "July 26 - August 11, 2024",
    location: "Paris, France",
    ticketInfo: "Available through official Olympic ticketing platform",
    streamingOptions: "IOC's Olympic Channel, regional rights holders"
  },
  {
    name: "Rugby World Cup 2025",
    date: "September 18 - October 16, 2025",
    location: "Various locations in England",
    ticketInfo: "Priority access opens early 2025",
    streamingOptions: "ITV (UK), international broadcasters TBA"
  }
];

const HeroSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          Featured Global Sports Events
        </h1>
        <p className="text-md md:text-lg text-gray-600 mb-8">
          Get the latest on major international sporting events, including schedules, ticket information, and streaming options.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredEvents.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Tickets:</strong> {event.ticketInfo}</p>
                <p><strong>Watch:</strong> {event.streamingOptions}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 font-medium py-2 px-5 rounded transition-colors duration-300">
          See Full Event List
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;