
import React from 'react';
import { NoImageIcon } from './icons';

interface LiveCameraFeedProps {
  image: string | null;
}

export const LiveCameraFeed: React.FC<LiveCameraFeedProps> = ({ image }) => {
  return (
    <div className="w-full h-full bg-gray-900 text-white flex items-center justify-center relative">
      {image ? (
        <img src={image} alt="Live feed" className="w-full h-full object-cover" />
      ) : (
        <div className="text-center text-gray-400">
          <NoImageIcon className="w-12 h-12 mx-auto" />
          <p className="text-xs mt-1">Live Feed Unavailable</p>
        </div>
      )}
      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 pointer-events-none">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        LIVE
      </div>
    </div>
  );
};
