import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Utensils, Ticket, Clock, Car, Camera, Users } from 'lucide-react';

const GameDayGuidePromo = () => {
  return (
    <Card className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-3xl font-bold flex items-center justify-center">
          <Ticket className="mr-3 h-8 w-8" />
          Going to the Game?
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-xl mb-6 text-center">
          Great! Here's everything you need to know for an awesome game day experience:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Clock, title: "Timing is Everything", description: "Arrive early to beat the crowds. Gates usually open 2 hours before kickoff." },
            { icon: Car, title: "Parking & Transportation", description: "Check parking options or consider public transit for a stress-free arrival." },
            { icon: Ticket, title: "Ticket & Entry", description: "Have your tickets ready and know which gate to enter. Don't forget ID for will-call." },
            { icon: Utensils, title: "Food & Drinks", description: "Explore stadium food options or grab a bite at nearby restaurants before the game." },
            { icon: Camera, title: "Game Day Memories", description: "Bring a camera and check out the best photo spots in and around the stadium." },
            { icon: Users, title: "Fan Etiquette", description: "Be respectful, know seating rules, and get ready to cheer on your team!" },
          ].map((tip, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 bg-white/10 rounded-lg">
              <tip.icon className="h-12 w-12 mb-2" />
              <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
              <p className="text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameDayGuidePromo;