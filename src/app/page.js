'use client';

import React, { useState } from 'react';
import { Calendar, Globe, Tv, Shield, ChevronDown, ChevronUp, Info, Trophy, MapPin, Ticket, Info as InfoIcon } from 'lucide-react';

// Assume these components are correctly defined in their respective files
import GlobalSportsApp from '@/components/GlobalSportsApp';
import VPNComparison from '@/components/VPNComparison';

// Define a simple Button component if the UI library is not available
const Button = ({ onClick, className, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded ${className}`}
  >
    {children}
  </button>
);

// Define simple Card components if the UI library is not available
const Card = ({ className, children }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

const CardContent = ({ className, children }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const vpnData = [
  { name: 'NordVPN', price: 3.71, servers: 5400, maxDevices: 6, affiliateLink: 'https://nordvpn.com/affiliate' },
  { name: 'ExpressVPN', price: 6.67, servers: 3000, maxDevices: 5, affiliateLink: 'https://expressvpn.com/affiliate' },
  { name: 'Surfshark', price: 2.49, servers: 3200, maxDevices: 'Unlimited', affiliateLink: 'https://surfshark.com/affiliate' },
  { name: 'CyberGhost', price: 2.29, servers: 7400, maxDevices: 7, affiliateLink: 'https://cyberghostvpn.com/affiliate' },
];

const viewingOptions = {
  nba: {
    usa: {
      services: ['NBA League Pass', 'ESPN+', 'ABC', 'TNT'],
      cost: '$28.99/month for NBA League Pass',
      restrictions: 'Some games may be blacked out locally',
    },
    uk: {
      services: ['Sky Sports', 'NBA League Pass International'],
      cost: '£24.99/month for Sky Sports',
      restrictions: 'No local blackouts',
    },
    australia: {
      services: ['ESPN', 'NBA League Pass'],
      cost: 'A$39.99/month for NBA League Pass',
      restrictions: 'No local blackouts',
    },
  },
  premier: {
    usa: {
      services: ['Peacock', 'NBC Sports', 'USA Network'],
      cost: '$4.99/month for Peacock',
      restrictions: 'Not all games are televised',
    },
    uk: {
      services: ['Sky Sports', 'BT Sport', 'Amazon Prime Video'],
      cost: '£25/month for NOW TV Sky Sports Pass',
      restrictions: 'Saturday 3pm games are not televised',
    },
    australia: {
      services: ['Optus Sport'],
      cost: 'A$24.99/month for Optus Sport',
      restrictions: 'No local blackouts',
    },
  },
  nfl: {
    usa: {
      services: ['NFL Sunday Ticket', 'CBS', 'FOX', 'NBC', 'ESPN'],
      cost: '$73.49/month for NFL Sunday Ticket',
      restrictions: 'Local games may be blacked out',
    },
    uk: {
      services: ['Sky Sports', 'NFL Game Pass'],
      cost: '£14.99/month for NFL Game Pass',
      restrictions: 'No local blackouts',
    },
    australia: {
      services: ['ESPN', 'NFL Game Pass'],
      cost: 'A$28.99/month for NFL Game Pass',
      restrictions: 'No local blackouts',
    },
  },
};

const FeaturedEvents = () => {
  const events = [
    { name: 'NBA Finals', date: 'June 1-18, 2024', league: 'NBA', location: 'Various NBA Arenas, USA', icon: '🏀' },
    { name: 'Premier League Kickoff', date: 'August 12, 2024', league: 'Premier League', location: 'Various Stadiums, UK', icon: '⚽' },
    { name: 'Super Bowl LIX', date: 'February 9, 2025', league: 'NFL', location: 'New Orleans, Louisiana, USA', icon: '🏈' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {events.map((event, index) => (
        <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-2xl">{event.icon}</span>
              <Trophy className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{event.name}</h3>
            <p className="text-sm mb-1 flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="mr-2" size={14} />
              {event.date}
            </p>
            <p className="text-sm mb-1 flex items-center text-gray-600 dark:text-gray-300">
              <Globe className="mr-2" size={14} />
              {event.league}
            </p>
            <p className="text-sm flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="mr-2" size={14} />
              {event.location}
            </p>
          </CardContent>
          <div className="bg-blue-100 dark:bg-blue-900 p-2 text-center">
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Featured Event</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

// Placeholder components for new sections
const StreamingOptions = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Streaming Options</h2>
    <p>Here you'll find information about various streaming services for different sports and regions.</p>
    {/* Add more detailed content here */}
  </div>
);

const TicketInfo = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Ticket Information</h2>
    <p>Find details about ticket purchasing, prices, and availability for various events.</p>
    {/* Add more detailed content here */}
  </div>
);

const GamedayInfo = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Gameday Information</h2>
    <p>Get essential information for your gameday experience, including stadium rules, local tips, and more.</p>
    {/* Add more detailed content here */}
  </div>
);

export default function Home() {
  const [showVPNComparison, setShowVPNComparison] = useState(false);
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex items-center justify-center mb-6">
          <Globe className="text-blue-600 dark:text-blue-400 mr-3" size={40} />
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">
            GameDay Passport
          </h1>
        </div>
        <p className="text-xl md:text-2xl font-medium mb-8 text-center text-gray-600 dark:text-gray-400">
          Your guide to worldwide sports entertainment
        </p>
        
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          <Button
            onClick={() => setActiveTab('events')}
            className={`${activeTab === 'events' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'} hover:bg-blue-700 transition-colors duration-300`}
          >
            <Trophy className="inline mr-2" size={18} />
            Featured Events
          </Button>
          <Button
            onClick={() => setActiveTab('streaming')}
            className={`${activeTab === 'streaming' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'} hover:bg-blue-700 transition-colors duration-300`}
          >
            <Tv className="inline mr-2" size={18} />
            Streaming Options
          </Button>
          <Button
            onClick={() => setActiveTab('tickets')}
            className={`${activeTab === 'tickets' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'} hover:bg-blue-700 transition-colors duration-300`}
          >
            <Ticket className="inline mr-2" size={18} />
            Ticket Info
          </Button>
          <Button
            onClick={() => setActiveTab('gameday')}
            className={`${activeTab === 'gameday' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'} hover:bg-blue-700 transition-colors duration-300`}
          >
            <InfoIcon className="inline mr-2" size={18} />
            Gameday Info
          </Button>
        </div>

        <Card className="mb-8">
          <CardContent>
            {activeTab === 'events' && <FeaturedEvents />}
            {activeTab === 'streaming' && <GlobalSportsApp viewingOptions={viewingOptions} />}
            {activeTab === 'tickets' && <TicketInfo />}
            {activeTab === 'gameday' && <GamedayInfo />}
          </CardContent>
        </Card>
        
        <div className="mb-8">
          <Button 
            onClick={() => setShowVPNComparison(!showVPNComparison)}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
          >
            <Shield className="inline mr-2" size={18} />
            {showVPNComparison ? 'Hide' : 'Show'} VPN Analysis
            {showVPNComparison ? <ChevronUp className="inline ml-2" size={18} /> : <ChevronDown className="inline ml-2" size={18} />}
          </Button>
          
          {showVPNComparison && (
            <Card className="mt-4">
              <CardContent>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">VPN Service Recommendations</h2>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  Enhance your viewing experience with these top-tier VPN services:
                </p>
                <VPNComparison vpns={vpnData} />
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 flex items-center text-blue-800 dark:text-blue-200">
                    <Info className="mr-2" size={20} />
                    Why use a VPN with GameDay Passport?
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                    <li>Access geo-restricted content and overcome blackouts</li>
                    <li>Protect your online privacy and secure your connection</li>
                    <li>Potentially find better deals on subscriptions</li>
                    <li>Avoid bandwidth throttling from your ISP</li>
                  </ul>
                </div>
                <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                  Note: Pricing and features are subject to change. Please verify details on the official websites.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}