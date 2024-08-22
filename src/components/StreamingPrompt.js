import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tv, Globe, Clock, Users, Search, Calendar } from 'lucide-react';

const StreamingPromo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <Search className="w-8 h-8 mb-2" />,
      title: "Select Your Sport & League",
      description: "Choose from 20+ leagues across 10 different sports.",
    },
    {
      icon: <Users className="w-8 h-8 mb-2" />,
      title: "Pick Your Teams",
      description: "Follow 500+ teams from around the world.",
    },
    {
      icon: <Globe className="w-8 h-8 mb-2" />,
      title: "Set Your Location",
      description: "Access from 100+ countries with localized viewing options.",
    },
    {
      icon: <Calendar className="w-8 h-8 mb-2" />,
      title: "Choose Your Dates",
      description: "Plan ahead with schedules up to a year in advance.",
    },
    {
      icon: <Tv className="w-8 h-8 mb-2" />,
      title: "Get Streaming Info",
      description: "Find the best way to watch in your area.",
    },
    {
      icon: <Clock className="w-8 h-8 mb-2" />,
      title: "Never Miss a Game",
      description: "Real-time updates and time zone conversion for 10,000+ games annually.",
    },
  ];

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-8">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Tv className="mr-2" />
          Your Global Sports Streaming Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            {steps[currentStep].icon}
            <h3 className="text-xl font-bold mb-2">{steps[currentStep].title}</h3>
            <p>{steps[currentStep].description}</p>
          </div>
          <div className="flex justify-center space-x-2 mb-4">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentStep ? 'bg-white' : 'bg-blue-200'
                }`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-blue-100 transition-colors duration-300"
              onClick={() => setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)}
            >
              Previous
            </button>
            <button
              className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-blue-100 transition-colors duration-300"
              onClick={() => setCurrentStep((prev) => (prev + 1) % steps.length)}
            >
              Next
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamingPromo;