import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hotel, Map, Utensils, Plane, Camera, Calendar, Building, Ticket, Music, Leaf, Info, Clock, Car } from 'lucide-react';

const GameDayGuide = ({ city = "Example City", team = "Local Team" }) => {
  console.log("Rendering GameDayGuide for", city, team);
  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
        <CardTitle className="text-3xl font-bold flex items-center justify-center">
          <Building className="mr-3 h-8 w-8" />
          {city} Game Day Guide
        </CardTitle>
        <p className="text-center mt-2 text-blue-100">Your complete guide to enjoying {team} games and exploring {city}</p>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pregame">Pre-Game</TabsTrigger>
            <TabsTrigger value="gametime">Game Time</TabsTrigger>
            <TabsTrigger value="postgame">Post-Game</TabsTrigger>
            <TabsTrigger value="explore">Explore {city}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <h3 className="text-2xl font-semibold mb-4">Welcome to {city}</h3>
            <GuideSection
              icon={<Info className="w-6 h-6 text-blue-600" />}
              title="About This Guide"
              content={`This comprehensive guide is designed to enhance your experience at ${team} games and help you make the most of your visit to ${city}. Whether you're a local fan or an out-of-town visitor, we've got you covered with insider tips and essential information.`}
            />
            <GuideSection
              icon={<Calendar className="w-6 h-6 text-blue-600" />}
              title="Game Day Schedule"
              content={`Typical game day schedule:
              • Stadium opens: 2 hours before kickoff
              • Team warm-ups: 1 hour before kickoff
              • National anthem: 10 minutes before kickoff
              • Kickoff: [Time varies, check your ticket]`}
            />
            <GuideSection
              icon={<Map className="w-6 h-6 text-blue-600" />}
              title="Getting Around"
              content={`${city} offers various transportation options:
              • Public Transit: [Transit System Name] provides service to [Stadium Name]. Use the [Transit App] for real-time updates.
              • Ride-sharing: Designated pickup/drop-off zones are located at [Locations].
              • Parking: Multiple lots available, pre-book for best rates and availability.`}
            />
          </TabsContent>
          
          <TabsContent value="pregame">
            <h3 className="text-2xl font-semibold mb-4">Pre-Game Preparations</h3>
            <GuideSection
              icon={<Hotel className="w-6 h-6 text-blue-600" />}
              title="Accommodations"
              content={`• Near Stadium: [Hotel 1], [Hotel 2] - Great for easy game access.
              • Downtown: [Hotel 3], [Hotel 4] - Perfect for exploring the city.
              • Budget-friendly: [Hotel 5], [Hotel 6] - Good value options.`}
            />
            <GuideSection
              icon={<Utensils className="w-6 h-6 text-blue-600" />}
              title="Pre-Game Dining"
              content={`• Sports Bars: [Bar 1] and [Bar 2] offer great atmosphere and fan gatherings.
              • Quick Bites: Try the food truck lineup on [Street Name] near the stadium.
              • Family-Friendly: [Restaurant 1] has a special game day menu and kids' activities.`}
            />
            <GuideSection
              icon={<Ticket className="w-6 h-6 text-blue-600" />}
              title="Tickets & Entry"
              content={`• Mobile tickets: Download the [Team App] for easy access.
              • Will Call: Located at [Gate Number], bring photo ID.
              • Clear bag policy in effect - check size restrictions on the team website.`}
            />
          </TabsContent>
          
          <TabsContent value="gametime">
            <h3 className="text-2xl font-semibold mb-4">Game Time Experience</h3>
            <GuideSection
              icon={<Map className="w-6 h-6 text-blue-600" />}
              title="Stadium Navigation"
              content={`• Download the stadium map from [Team Website] for easy navigation.
              • Information booths are located at sections [X], [Y], and [Z].
              • Family restrooms and nursing stations available near sections [A] and [B].`}
            />
            <GuideSection
              icon={<Utensils className="w-6 h-6 text-blue-600" />}
              title="Stadium Dining"
              content={`• Local Flavors: Try [Local Dish] at section [X] and [Famous Local Drink] at section [Y].
              • Healthy Options: Vegetarian and gluten-free choices available at [Location].
              • Premium Experience: Visit [Restaurant Name] in the club level for upscale dining.`}
            />
            <GuideSection
              icon={<Camera className="w-6 h-6 text-blue-600" />}
              title="Fan Experiences"
              content={`• Team Store: Main store at [Location], satellite shops at sections [P] and [Q].
              • Photo Ops: Meet the mascot at [Location] during the 2nd quarter.
              • Interactive Zones: Visit [Zone Name] for games and virtual experiences.`}
            />
          </TabsContent>
          
          <TabsContent value="postgame">
            <h3 className="text-2xl font-semibold mb-4">After the Final Whistle</h3>
            <GuideSection
              icon={<Clock className="w-6 h-6 text-blue-600" />}
              title="Exiting the Stadium"
              content={`• Multiple exits available to manage crowd flow.
              • Follow digital signage for quickest route to parking/public transit.
              • Post-game traffic updates available on stadium screens and [Team App].`}
            />
            <GuideSection
              icon={<Utensils className="w-6 h-6 text-blue-600" />}
              title="Post-Game Celebrations"
              content={`• Sports Bars: [Bar 1] and [Bar 2] offer post-game specials and game replays.
              • Late-Night Eats: [Restaurant 1] and [Restaurant 2] serve until 2 AM on game nights.
              • Family-Friendly: [Ice Cream Shop] stays open late after home game victories.`}
            />
            <GuideSection
              icon={<Music className="w-6 h-6 text-blue-600" />}
              title="Nightlife & Entertainment"
              content={`• Live Music: Check out [Venue 1] or [Venue 2] for local bands.
              • Comedy: [Comedy Club] often features sports-themed shows on game nights.
              • Quiet Wind-Down: Enjoy a nightcap at [Hotel Bar] with skyline views.`}
            />
          </TabsContent>
          
          <TabsContent value="explore">
        <h3 className="text-2xl font-semibold mb-4">Discovering {city}</h3>
        <GuideSection
          icon={<Building className="w-6 h-6 text-blue-600" />}
          title="City Highlights"
          content={`• Must-See: [Landmark 1], [Landmark 2], and the historic [District Name].
          • Cultural Spots: Visit [Museum 1] and [Museum 2] for local history and art.
          • Hidden Gems: Explore [Neighborhood] for unique shops and cafes.`}
        />
        <GuideSection
          icon={<Leaf className="w-6 h-6 text-blue-600" />}
          title="Outdoor Activities"
          content={`• Parks: Relax at [Park 1] or enjoy water activities at [Lake/River Name].
          • Hiking: [Trail Name] offers scenic views just [X] miles from downtown.
          • Biking: Rent bikes at [Location] to explore the city's extensive bike paths.`}
        />
        <GuideSection
          icon={<Plane className="w-6 h-6 text-blue-600" />}
          title="Day Trips"
          content={`• Nature: Visit [National Park/Nature Reserve] ([X] hours drive).
          • History: Explore [Historic Town] for a glimpse into the region's past.
          • Family Fun: [Theme Park/Attraction] is perfect for all ages ([Y] hours drive).`}
        />
      </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
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

export default GameDayGuide;