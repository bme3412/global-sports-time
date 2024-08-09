'use client';

import React, { useState } from 'react';
import GlobalSportsApp from '@/components/ui/GlobalSportsApp';
import VPNComparison from '@/components/ui/VPNComparison';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Tv, Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          Global Sports Viewing Guide
        </h1>
        
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <GlobalSportsApp viewingOptions={viewingOptions} />
          </CardContent>
        </Card>
        
        <div className="mb-8">
          <Button 
            onClick={() => setShowVPNComparison(!showVPNComparison)}
            className="w-full md:w-auto"
            size="lg"
          >
            <Shield className="mr-2" />
            {showVPNComparison ? 'Hide' : 'Show'} VPN Comparison
          </Button>
          
          {showVPNComparison && (
            <Card className="mt-4 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Shield className="mr-2" />
                  Recommended VPN Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  To access geo-restricted content and ensure your online privacy while streaming sports, consider using a VPN service:
                </p>
                <VPNComparison vpns={vpnData} />
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Note: Prices and features may vary. We recommend checking the official websites for the most up-to-date information.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Globe className="mr-2" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <Tv className="mr-2 text-blue-500" />
                Check official league websites for international viewing options
              </li>
              <li className="flex items-center">
                <Globe className="mr-2 text-green-500" />
                Follow teams&apos; social media accounts for updates on international broadcasts
              </li>
              <li className="flex items-center">
                <Shield className="mr-2 text-purple-500" />
                Consider subscribing to sports-specific streaming services
              </li>
              <li className="flex items-center">
                <Globe className="mr-2 text-red-500" />
                Join online communities or forums for expat sports fans in your destination
              </li>
              <li className="flex items-center">
                <Tv className="mr-2 text-yellow-500" />
                Download mobile apps for live scores and game notifications
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}