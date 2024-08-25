// src/app/city-guide/page.js
import React from 'react';
import dynamic from 'next/dynamic';
import BackgroundImage from "@/components/BackgroundImage";

const CitySportsGuide = dynamic(() => import('@/components/CitySportsGuide'), {
  loading: () => <p className="text-white text-center">Loading City Sports Guide...</p>,
  ssr: false
});

const CityGuidePage = () => {
  return (
    <>
      <BackgroundImage />
      <div className="relative z-10 min-h-screen">
        <CitySportsGuide />
      </div>
    </>
  );
};

export default CityGuidePage;