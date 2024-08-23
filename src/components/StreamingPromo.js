import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Clock, Tv, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const GlobalSportsViewingGuide = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <CardTitle className="text-2xl font-bold flex items-center">
          <Globe className="mr-2" />
          Global Sports Viewing Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Watch Your Favorite Sports from Anywhere in the World</h2>
        
        <div className="space-y-6">
          <FeatureExplanation 
            icon={<Globe className="w-8 h-8 text-blue-500" />}
            title="Comprehensive Global Coverage"
            description="Access information on how to view most global sporting events, regardless of your location."
          />
          
          <FeatureExplanation 
            icon={<Clock className="w-8 h-8 text-blue-500" />}
            title="Time Zone Conversion"
            description="Get accurate game times in your local time zone, no matter where the event is taking place."
          />
          
          <FeatureExplanation 
            icon={<Tv className="w-8 h-8 text-blue-500" />}
            title="Streaming Options"
            description="Find out which streaming services or broadcasters are showing your desired sports event in your current location."
          />
          
          <FeatureExplanation 
            icon={<MapPin className="w-8 h-8 text-blue-500" />}
            title="Location-Specific Advice"
            description="Receive tailored information on how to access geo-restricted content, including VPN recommendations when necessary."
          />
        </div>
        
        <div className="mt-6 bg-blue-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Example: Watching NBA in Paris</h3>
          <p className="text-blue-800">
            An American traveling to Paris can use our guide to:
          </p>
          <ul className="list-disc list-inside text-blue-800 mt-2">
            <li>Find out that NBA games typically start between 1:00 AM and 4:00 AM Paris time</li>
            <li>Learn that beIN Sports has NBA broadcasting rights in France</li>
            <li>Discover that NBA League Pass is available, but might require a VPN</li>
            <li>Get recommendations for sports bars in Paris that show NBA games live</li>
          </ul>
        </div>

        <div className="mt-6 flex justify-center">
          <Link href="/">
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
            >
              Explore Streaming Info
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const FeatureExplanation = ({ icon, title, description }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mr-4">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default GlobalSportsViewingGuide;