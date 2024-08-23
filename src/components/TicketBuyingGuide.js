import React, { useState, useEffect } from 'react';
import { Ticket, Globe, DollarSign, Info, ExternalLink, MapPin, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TicketBuyingGuide = () => {
  // Include leagues data within the component
  const leagues = [
    { id: 'nba', name: 'NBA', country: 'USA' },
    { id: 'nfl', name: 'NFL', country: 'USA' },
    { id: 'mlb', name: 'MLB', country: 'USA' },
    { id: 'nhl', name: 'NHL', country: 'USA/Canada' },
    { id: 'mls', name: 'MLS', country: 'USA/Canada' },
    { id: 'epl', name: 'English Premier League', country: 'England' },
    { id: 'bundesliga', name: 'Bundesliga', country: 'Germany' },
  ];

  const teams = {
    nba: ['New York Knicks', 'Los Angeles Lakers', 'Chicago Bulls', 'Golden State Warriors'],
    nfl: ['Dallas Cowboys', 'New England Patriots', 'Green Bay Packers', 'Kansas City Chiefs'],
    mlb: ['New York Yankees', 'Boston Red Sox', 'Chicago Cubs', 'Los Angeles Dodgers'],
    nhl: ['Toronto Maple Leafs', 'Montreal Canadiens', 'New York Rangers', 'Chicago Blackhawks'],
    mls: ['Atlanta United FC', 'LA Galaxy', 'Seattle Sounders FC', 'New York City FC'],
    epl: ['Manchester United', 'Liverpool', 'Chelsea', 'Arsenal'],
    bundesliga: ['Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen'],
  };

  const ticketInfo = {
    'New York Knicks': {
      venue: 'Madison Square Garden',
      officialSite: 'https://www.nba.com/knicks/tickets',
      thirdPartySites: [
        { name: 'Ticketmaster', url: 'https://www.ticketmaster.com/new-york-knicks-tickets/artist/805988' },
        { name: 'StubHub', url: 'https://www.stubhub.com/new-york-knicks-tickets/performer/136' },
        { name: 'SeatGeek', url: 'https://seatgeek.com/new-york-knicks-tickets' },
      ],
      pricingInfo: {
        averagePrice: "$150",
        priceRange: "$50 - $3000+",
        affordableSeats: "300 level sections",
        popularSeats: "100 level center court sections",
      },
      dealTips: [
        "Buy tickets for weekday games, which are typically cheaper than weekend games.",
        "Look for 'dynamic pricing' discounts for less popular opponents.",
        "Check for last-minute deals on game day, as prices may drop to fill unsold seats.",
        "Consider 'obstructed view' seats for significant discounts if you don't mind a partially blocked view.",
        "Sign up for the Knicks' official newsletter for presale opportunities and special offers.",
        "Compare prices across multiple ticket sites to find the best deal.",
        "Look for promotional nights or special events that may offer package deals.",
      ],
      seasonInfo: "The NBA season typically runs from October to April, with playoffs extending into June.",
      internationalTips: [
        "Consider using a VPN when purchasing tickets to avoid geo-blocking issues.",
        "Be aware of time zone differences when selecting game dates and times.",
        "Check your passport validity and visa requirements before booking tickets.",
        "Look into travel packages that include game tickets and accommodation.",
      ],
    },
    // Add more teams with their respective information
  };

  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [userLocation, setUserLocation] = useState('local'); // 'local' or 'international'

  useEffect(() => {
    setSelectedTeam('');
  }, [selectedLeague]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Ticket className="mr-2" />
          Sports Ticket Buying Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={userLocation} onValueChange={setUserLocation} className="mb-6">
          <TabsList>
            <TabsTrigger value="local">Local Visitor</TabsTrigger>
            <TabsTrigger value="international">International Visitor</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          <div>
            <label htmlFor="league" className="block text-sm font-medium text-gray-700 mb-1">
              Select a League
            </label>
            <Select value={selectedLeague} onValueChange={setSelectedLeague}>
              <SelectTrigger id="league">
                <SelectValue placeholder="Choose a league" />
              </SelectTrigger>
              <SelectContent>
                {leagues.map((league) => (
                  <SelectItem key={league.id} value={league.id}>
                    {league.name} ({league.country})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedLeague && (
            <div>
              <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">
                Select a Team
              </label>
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger id="team">
                  <SelectValue placeholder="Choose a team" />
                </SelectTrigger>
                <SelectContent>
                  {teams[selectedLeague].map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {selectedTeam && ticketInfo[selectedTeam] && (
          <div className="mt-8 space-y-6">
            <h3 className="text-xl font-semibold mb-4">Ticket Buying Guide for {selectedTeam}</h3>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2" size={20} />
                  Venue Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{ticketInfo[selectedTeam].venue}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2" size={20} />
                  Pricing Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Average Price:</strong> {ticketInfo[selectedTeam].pricingInfo.averagePrice}</p>
                <p><strong>Price Range:</strong> {ticketInfo[selectedTeam].pricingInfo.priceRange}</p>
                <p><strong>Most Affordable Seats:</strong> {ticketInfo[selectedTeam].pricingInfo.affordableSeats}</p>
                <p><strong>Most Popular Seats:</strong> {ticketInfo[selectedTeam].pricingInfo.popularSeats}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="mr-2" size={20} />
                  Tips for Getting Good Deals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {ticketInfo[selectedTeam].dealTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2" size={20} />
                  Season Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{ticketInfo[selectedTeam].seasonInfo}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2" size={20} />
                  Official Team Website
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Purchase tickets directly from the team:</p>
                <Button variant="outline" className="mt-2" asChild>
                  <a href={ticketInfo[selectedTeam].officialSite} target="_blank" rel="noopener noreferrer">
                    Visit Official Site <ExternalLink className="ml-2" size={16} />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2" size={20} />
                  Trusted Third-Party Sellers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {ticketInfo[selectedTeam].thirdPartySites.map((site, index) => (
                    <li key={index}>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {site.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {userLocation === 'international' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2" size={20} />
                    International Visitor Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {ticketInfo[selectedTeam].internationalTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {userLocation === 'international' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-2" size={20} />
                    Currency Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Tickets are typically priced in {leagues.find(l => l.id === selectedLeague)?.country === 'USA' ? 'US Dollars (USD)' : 'local currency'}. We recommend checking current exchange rates before purchasing.</p>
                  <Button variant="outline" className="mt-2" asChild>
                    <a href="https://www.xe.com/currencyconverter/" target="_blank" rel="noopener noreferrer">
                      Currency Converter <ExternalLink className="ml-2" size={16} />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketBuyingGuide;