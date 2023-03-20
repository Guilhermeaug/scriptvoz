'use client';

import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  className?: string;
  url: string;
}

export default function VideoPlayer({ className, url }: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <ReactPlayer
          className={className}
          width='100%'
          height='100%'
          url={videoUrl}
          controls
        />
      )}
    </>
  );
}
