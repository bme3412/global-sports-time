import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Hotel, Map, Utensils, Plane, Camera, Calendar, Building, Ticket, Music, Leaf, Info, Clock, Car } from 'lucide-react';

// Note: In a real application, you should use environment variables for the access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYm1lMzQxMiIsImEiOiJjbHg4MGE3YnkxMmFsMmxwbXd0OHhmemN0In0.fcAB8ysaQTI2ZV5inOV36Q';

const GameDayGuide = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.0589, 42.3601], // Boston coordinates
      zoom: 12
    });

    map.current.on('load', () => {
      // Add markers for key locations
      addMarker(-71.0972, 42.3467, 'Fenway Park', 'baseball');
      addMarker(-71.0622, 42.3662, 'TD Garden', 'basketball');
      addMarker(-71.2643, 42.0909, 'Gillette Stadium', 'football');
      addMarker(-71.0530, 42.3601, 'Boston Common', 'park');
      addMarker(-71.0570, 42.3605, 'Freedom Trail Start', 'attraction');
    });
  }, []);

  const addMarker = (lng, lat, title, type) => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(https://placekitten.com/g/40/40)`; // Replace with actual icon URLs
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.backgroundSize = '100%';

    new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${title}</h3><p>${type}</p>`))
      .addTo(map.current);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Boston Game Day Guide</h1>
        
        <Card className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-red-600 to-blue-700 text-white p-6">
            <CardTitle className="text-3xl font-bold flex items-center justify-center">
              <Building className="mr-3 h-8 w-8" />
              Explore Boston Sports
            </CardTitle>
            <p className="text-center mt-2 text-blue-100">Your complete guide to enjoying sports games and exploring Boston</p>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="pregame">Pre-Game</TabsTrigger>
                <TabsTrigger value="gametime">Game Time</TabsTrigger>
                <TabsTrigger value="postgame">Post-Game</TabsTrigger>
                <TabsTrigger value="explore">Explore Boston</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <h3 className="text-2xl font-semibold mb-4">Welcome to Boston</h3>
                <GuideSection
                  icon={<Info className="w-6 h-6 text-red-600" />}
                  title="About This Guide"
                  content="This comprehensive guide is designed to enhance your experience at Boston sports games and help you make the most of your visit to the city. Whether you're cheering for the Red Sox, Celtics, Bruins, or Patriots, we've got you covered with insider tips and essential information."
                />
                <GuideSection
                  icon={<Calendar className="w-6 h-6 text-red-600" />}
                  title="Game Day Schedule"
                  content={`Typical game day schedule (varies by sport):
                  • Fenway Park opens: 2 hours before first pitch
                  • TD Garden opens: 1.5 hours before tip-off/puck drop
                  • Gillette Stadium opens: 2 hours before kickoff`}
                />
                <GuideSection
                  icon={<Map className="w-6 h-6 text-red-600" />}
                  title="Getting Around"
                  content={`Boston offers various transportation options:
                  • MBTA (The T): Green Line to Kenmore (Red Sox), North Station (Celtics/Bruins)
                  • Commuter Rail: To South Station, then shuttle to Gillette Stadium (Patriots)
                  • Ride-sharing: Available throughout the city
                  • Parking: Limited near venues, consider park-and-ride options`}
                />
                <MapSection mapContainer={mapContainer} />
              </TabsContent>
              
              <TabsContent value="pregame">
                <h3 className="text-2xl font-semibold mb-4">Pre-Game Preparations</h3>
                <GuideSection
                  icon={<Hotel className="w-6 h-6 text-red-600" />}
                  title="Accommodations"
                  content={`• Near Fenway: Hotel Commonwealth, The Verb Hotel
                  • Downtown: Boston Park Plaza, Omni Parker House
                  • Budget-friendly: HI Boston Hostel, Found Hotel Boston Common`}
                />
                <GuideSection
                  icon={<Utensils className="w-6 h-6 text-red-600" />}
                  title="Pre-Game Dining"
                  content={`• Sports Bars: The Fours, Game On! Fenway
                  • Quick Bites: Time Out Market Boston, Boston Public Market
                  • Family-Friendly: Wahlburgers, Regina Pizzeria`}
                />
                <GuideSection
                  icon={<Ticket className="w-6 h-6 text-red-600" />}
                  title="Tickets & Entry"
                  content={`• Mobile tickets: Download the team's official app for easy access
                  • Will Call: Available at each venue, bring photo ID
                  • Clear bag policy in effect at all major sports venues`}
                />
              </TabsContent>
              
              <TabsContent value="gametime">
                <h3 className="text-2xl font-semibold mb-4">Game Time Experience</h3>
                <GuideSection
                  icon={<Map className="w-6 h-6 text-red-600" />}
                  title="Stadium Navigation"
                  content={`• Fenway Park: Green Monster seats, Pesky's Pole, Bleacher Bar
                  • TD Garden: Skyline views, The Hub on Causeway
                  • Gillette Stadium: The Lighthouse, Patriots Hall of Fame`}
                />
                <GuideSection
                  icon={<Utensils className="w-6 h-6 text-red-600" />}
                  title="Stadium Dining"
                  content={`• Fenway Frank at Fenway Park
                  • Sal's Pizza at TD Garden
                  • Specialty Lobster Roll at Gillette Stadium`}
                />
                <GuideSection
                  icon={<Camera className="w-6 h-6 text-red-600" />}
                  title="Fan Experiences"
                  content={`• Red Sox: Take a photo with the World Series trophies
                  • Celtics/Bruins: Visit the Sports Museum at TD Garden
                  • Patriots: Interactive exhibits at The Hall at Patriot Place`}
                />
              </TabsContent>
              
              <TabsContent value="postgame">
                <h3 className="text-2xl font-semibold mb-4">After the Final Whistle</h3>
                <GuideSection
                  icon={<Clock className="w-6 h-6 text-red-600" />}
                  title="Exiting the Venue"
                  content={`• Fenway: Exit towards Kenmore Square for less crowded T access
                  • TD Garden: Multiple exits to North Station and Causeway Street
                  • Gillette: Follow signs for shuttle buses or parking lot exits`}
                />
                <GuideSection
                  icon={<Utensils className="w-6 h-6 text-red-600" />}
                  title="Post-Game Celebrations"
                  content={`• Lansdowne Street for Red Sox after-parties
                  • The Greatest Bar near TD Garden
                  • Patriot Place for post-Patriots game entertainment`}
                />
                <GuideSection
                  icon={<Music className="w-6 h-6 text-red-600" />}
                  title="Nightlife & Entertainment"
                  content={`• Live Music: House of Blues, Paradise Rock Club
                  • Comedy: Laugh Boston, Improv Asylum
                  • Quiet Wind-Down: Top of the Hub, Lookout Rooftop and Bar`}
                />
              </TabsContent>
              
              <TabsContent value="explore">
                <h3 className="text-2xl font-semibold mb-4">Discovering Boston</h3>
                <GuideSection
                  icon={<Building className="w-6 h-6 text-red-600" />}
                  title="City Highlights"
                  content={`• Must-See: Freedom Trail, Faneuil Hall, Boston Common
                  • Cultural Spots: Museum of Fine Arts, Boston Tea Party Ships & Museum
                  • Hidden Gems: Beacon Hill, North End for Italian cuisine`}
                />
                <GuideSection
                  icon={<Leaf className="w-6 h-6 text-red-600" />}
                  title="Outdoor Activities"
                  content={`• Parks: Boston Public Garden, Charles River Esplanade
                  • Harbor: Boston Harbor Islands, Whale Watching tours
                  • Biking: Rent bikes at BlueBikes stations throughout the city`}
                />
                <GuideSection
                  icon={<Plane className="w-6 h-6 text-red-600" />}
                  title="Day Trips"
                  content={`• History: Salem (1 hour drive) for witch trial history
                  • Nature: Cape Cod (1.5 hours drive) for beaches and seafood
                  • Family Fun: Six Flags New England (2 hours drive) for thrill rides`}
                />
              </TabsContent>
            </Tabs>
            <div className="mt-6 text-center">
              <Button variant="outline">See All City Guides</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const GuideSection = ({ icon, title, content }) => (
  <div className="flex items-start mb-6 last:mb-0">
    <div className="flex-shrink-0 mr-4">
      {icon}
    </div>
    <div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-700 whitespace-pre-line">{content}</p>
    </div>
  </div>
);

const MapSection = ({ mapContainer }) => (
  <div className="mt-6">
    <h4 className="text-xl font-semibold mb-2">Boston Sports Map</h4>
    <div ref={mapContainer} className="w-full h-64 rounded-lg overflow-hidden" />
    <p className="mt-2 text-sm text-gray-600">
      Map highlights: Fenway Park (Red Sox), TD Garden (Celtics/Bruins), Gillette Stadium (Patriots), Boston Common, and Freedom Trail start.
    </p>
  </div>
);

export default GameDayGuide;