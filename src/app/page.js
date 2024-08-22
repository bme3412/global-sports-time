"use client";

import React, { useState } from 'react';
import { Globe, Tv, Shield, Info, Trophy, MapPin, Ticket, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import VPNComparison from '@/components/VPNComparison';
import GlobalSportsApp from '@/components/GlobalSportsApp'; 
import HeroSection from '@/components/HeroSection';
import GameTimeConverter from '@/components/GameTimeConverter';
import BackgroundImage from '@/components/BackgroundImage';


const vpnData = [
  {
    name: "NordVPN",
    price: 3.71,
    servers: 5400,
    maxDevices: 6,
    affiliateLink: "https://nordvpn.com/affiliate",
  },
  {
    name: "ExpressVPN",
    price: 6.67,
    servers: 3000,
    maxDevices: 5,
    affiliateLink: "https://expressvpn.com/affiliate",
  },
  {
    name: "Surfshark",
    price: 2.49,
    servers: 3200,
    maxDevices: "Unlimited",
    affiliateLink: "https://surfshark.com/affiliate",
  },
  {
    name: "CyberGhost",
    price: 2.29,
    servers: 7400,
    maxDevices: 7,
    affiliateLink: "https://cyberghostvpn.com/affiliate",
  },
];

const FeaturedEvents = () => {
  const events = [
    {
      name: "NBA Finals",
      date: "June 1-18, 2024",
      league: "NBA",
      location: "Various NBA Arenas, USA",
      icon: "🏀",
    },
    {
      name: "Premier League Kickoff",
      date: "August 12, 2024",
      league: "Premier League",
      location: "Various Stadiums, UK",
      icon: "⚽",
    },
    {
      name: "Super Bowl LIX",
      date: "February 9, 2025",
      league: "NFL",
      location: "New Orleans, Louisiana, USA",
      icon: "🏈",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <span className="text-sm text-blue-200">
                {event.date}
              </span>
            </div>
          </CardHeader>
          <CardContent>
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

const TicketInfo = () => (
  <Card className="bg-white/20 backdrop-blur-md text-white">
    <CardHeader>
      <CardTitle>Ticket Information</CardTitle>
      <CardDescription className="text-blue-100">
        Find details about ticket purchasing, prices, and availability for
        various events.
      </CardDescription>
    </CardHeader>
    <CardContent>{/* Add more detailed content here */}</CardContent>
  </Card>
);

const GamedayInfo = () => (
  <Card className="bg-white/20 backdrop-blur-md text-white">
    <CardHeader>
      <CardTitle>Gameday Information</CardTitle>
      <CardDescription className="text-blue-100">
        Get essential information for your gameday experience, including stadium
        rules, local tips, and more.
      </CardDescription>
    </CardHeader>
    <CardContent>{/* Add more detailed content here */}</CardContent>
  </Card>
);

const VPNInfo = () => (
  <Card className="bg-white/20 backdrop-blur-md text-white">
    <CardHeader>
      <CardTitle>VPN Information</CardTitle>
      <CardDescription className="text-blue-100">
        Enhance your viewing experience with these top-tier VPN services
      </CardDescription>
    </CardHeader>
    <CardContent>
      <VPNComparison vpns={vpnData} />
      <Card className="mt-6 bg-white/30 text-white">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Info className="mr-2" size={20} />
            Why use a VPN with GameDay Passport?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-blue-100">
            <li>Access geo-restricted content and overcome blackouts</li>
            <li>Protect your online privacy and secure your connection</li>
            <li>Potentially find better deals on subscriptions</li>
            <li>Avoid bandwidth throttling from your ISP</li>
          </ul>
        </CardContent>
      </Card>
      <p className="mt-6 text-sm text-blue-200">
        Note: Pricing and features are subject to change. Please verify details
        on the official websites.
      </p>
    </CardContent>
  </Card>
);

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock data for GameTimeConverter, replace with actual data fetching logic
  const mockGameTimeConverterProps = {
    gameId: "123",
    gameTime: "19:30",
    gameDate: "2024-06-01",
    gameTimezone: "America/New_York",
    watchLocation: "1", // Assuming '1' is a valid location ID
    locations: [{ id: "1", name: "New York", timezone: "America/New_York" }],
    broadcastData: {
      us: { services: [{ name: "ESPN", link: "https://www.espn.com" }] },
    },
    venue: "Madison Square Garden, New York",
    homeTeam: "New York Knicks",
    awayTeam: "Los Angeles Lakers",
    userCountry: "US",
    league: "NBA",
  };

  return (
    <>
      <BackgroundImage />
      <div className="relative z-10 text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="flex items-center mb-4">
              <Globe className="text-blue-300 mr-4" size={60} />
              <h1 className="text-5xl md:text-6xl font-bold text-blue-300 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                GameDay Passport
              </h1>
            </div>
            <p className="text-xl md:text-2xl font-medium text-center text-blue-100 max-w-2xl mb-6">
              Your premier guide to worldwide sports entertainment
            </p>
            
            <p className="text-lg md:text-xl font-medium text-center text-blue-200 max-w-3xl mb-8 leading-relaxed">
              Explore comprehensive information on{' '}
              <span className="font-bold text-blue-100">sports events</span>,{' '}
              <span className="font-bold text-blue-100">streaming options</span>, and{' '}
              <span className="font-bold text-blue-100">in-person attendance</span>{' '}
              from anywhere in the world!
            </p>
          </div>
          
          <Tabs defaultValue="events" className="mb-12">
            <div className="flex justify-center mb-8">
              <TabsList className="inline-flex p-1 bg-white/10 backdrop-blur-md rounded-xl">
                {[
                  { value: "events", icon: Trophy, label: "Featured Events" },
                  { value: "streaming", icon: Tv, label: "Streaming Info" },
                  { value: "tickets", icon: Ticket, label: "Tickets Info" },
                  { value: "gameday", icon: Info, label: "Gameday Guide" },
                  { value: "vpn", icon: Shield, label: "VPN" },
                ].map(({ value, icon: Icon, label }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out rounded-lg
                               text-blue-100 hover:text-white
                               data-[state=active]:bg-blue-500/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <div className="mt-6">
              <TabsContent value="events">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                  <FeaturedEvents />
                </div>
                {selectedEvent && (
                  <GameTimeConverter {...mockGameTimeConverterProps} />
                )}
              </TabsContent>
              <TabsContent value="streaming">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                  <GlobalSportsApp />
                </div>
              </TabsContent>
              <TabsContent value="tickets">
                <TicketInfo />
              </TabsContent>
              <TabsContent value="gameday">
                <GamedayInfo />
              </TabsContent>
              <TabsContent value="vpn">
                <VPNInfo />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <HeroSection />
      </div>
    </>
  );
}