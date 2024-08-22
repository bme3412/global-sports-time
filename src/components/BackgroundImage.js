// src/components/BackgroundImage.js

import Image from 'next/image';

const BackgroundImage = () => (
  <div className="fixed inset-0 z-0">
    <Image
      src="/globalpassport.jpg"
      alt="Sports Background"
      layout="fill"
      objectFit="cover"
      quality={100}
      priority
    />
    <div className="absolute inset-0 bg-black opacity-50" /> {/* Optional overlay */}
  </div>
);

export default BackgroundImage;