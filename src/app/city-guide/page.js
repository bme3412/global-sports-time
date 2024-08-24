import React from 'react';
import dynamic from 'next/dynamic';
import BackgroundImage from "@/components/BackgroundImage";

const CitySportsGuide = dynamic(() => import('@/components/CitySportsGuide'), {
  ssr: false
});

const CityGuidePage = () => {
  return (
    <>
      <BackgroundImage />
      <div className="relative z-10">
        <CitySportsGuide />
      </div>
    </>
  );
};

export default CityGuidePage;