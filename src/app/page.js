'use client';

import React, { useState } from 'react';
import GlobalSportsApp from '@/components/GlobalSportsApp';
import VPNComparison from '@/components/VPNComparison';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Tv, Shield, ChevronDown, ChevronUp } from 'lucide-react';

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

export default function Home() {
  const [showVPNComparison, setShowVPNComparison] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100 animate-fade-in">
          Global Sports Intelligence
        </h1>
        <p className="text-xl md:text-2xl font-medium mb-8 text-center text-gray-600 dark:text-gray-300 animate-fade-in-delay">
          Find viewing options for over 1,000 global sports events
        </p>
        
        <Card className="mb-8 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <GlobalSportsApp viewingOptions={viewingOptions} />
          </CardContent>
        </Card>
        
        <div className="mb-8">
          <Button 
            onClick={() => setShowVPNComparison(!showVPNComparison)}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition duration-300 ease-in-out"
            size="lg"
          >
            <Shield className="mr-2" />
            {showVPNComparison ? 'Hide' : 'Show'} VPN Analysis
            {showVPNComparison ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
          </Button>
          
          {showVPNComparison && (
            <Card className="mt-4 shadow-lg bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">VPN Service Recommendations</h2>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  Enhance your viewing experience with these top-tier VPN services:
                </p>
                <VPNComparison vpns={vpnData} />
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