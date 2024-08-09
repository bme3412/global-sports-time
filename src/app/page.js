'use client';

import React, { useState } from 'react';
import GlobalSportsApp from '@/components/ui/GlobalSportsApp';
import VPNComparison from '@/components/ui/VPNComparison';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Global Sports Viewing Guide</h1>
      
      <GlobalSportsApp viewingOptions={viewingOptions} />
      
      <div className="mt-8">
        <Button 
          onClick={() => setShowVPNComparison(!showVPNComparison)}
          className="mb-4"
        >
          {showVPNComparison ? 'Hide' : 'Show'} VPN Comparison
        </Button>
        
        {showVPNComparison && (
          <Card>
            <CardHeader>
              <CardTitle>Recommended VPN Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">To access geo-restricted content and ensure your online privacy while streaming sports, consider using a VPN service:</p>
              <VPNComparison vpns={vpnData} />
              <p className="mt-4 text-sm text-gray-600">
                Note: Prices and features may vary. We recommend checking the official websites for the most up-to-date information.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2" />
            Additional Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li>Check official league websites for international viewing options</li>
            <li>Follow teams' social media accounts for updates on international broadcasts</li>
            <li>Consider subscribing to sports-specific streaming services</li>
            <li>Join online communities or forums for expat sports fans in your destination</li>
            <li>Download mobile apps for live scores and game notifications</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}