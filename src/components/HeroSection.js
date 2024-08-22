import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          Discover Global Sports Events and Coverage
        </h1>
        <p className="text-md md:text-lg text-gray-600 mb-8">
          Access schedules, streaming options, and everything you need for tickets and gameday logistics, all in one place.
        </p>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 font-medium py-2 px-5 rounded transition-colors duration-300">
          Explore Now
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
