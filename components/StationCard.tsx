import React, { useState } from 'react';
import type { Station } from '../types';
import { EyeIcon, ExternalLinkIcon, NoImageIcon, StatusIndicator, CameraIcon } from './icons';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { LiveCameraFeed } from './LiveCameraFeed';

interface StationCardProps {
  station: Station;
  onOpenDetail: (station: Station) => void;
  onOpenPortal: (station: Station) => void;
}

export const StationCard: React.FC<StationCardProps> = ({ station, onOpenDetail, onOpenPortal }) => {
  const { name, icon: Icon, status, image, poNumber, sequence, timestamp, processStatus, weight } = station;
  const isIdle = status === 'Idle';
  const [isLiveView, setIsLiveView] = useState(isIdle);
  
  // When status changes from idle to active, switch from live view to image view
  React.useEffect(() => {
    setIsLiveView(isIdle);
  }, [isIdle]);

  const hasTransactionData = poNumber && sequence;

  return (
    <Card className="flex flex-col transition-all hover:shadow-md">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center">
            <Icon className="w-5 h-5 mr-2 text-blue-600" />
            {name}
          </CardTitle>
          <div className="flex items-center space-x-2">
            {!isIdle && hasTransactionData && (
               <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-900"
                  onClick={() => setIsLiveView(!isLiveView)}
                  title={isLiveView ? "Show Transaction Image" : "Show Live Camera"}
               >
                  <CameraIcon className="w-4 h-4" />
                  <span className="sr-only">{isLiveView ? "Show Transaction Image" : "Show Live Camera"}</span>
               </Button>
            )}
            <StatusIndicator status={status} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="relative aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {isLiveView ? (
             <LiveCameraFeed image={image} />
          ) : image ? (
            <a href={image} target="_blank" rel="noopener noreferrer" className="block w-full h-full group cursor-pointer">
              <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"/>
              </div>
            </a>
          ) : (
            <div className="text-center text-gray-400">
              <NoImageIcon className="w-12 h-12 mx-auto" />
              <p className="text-xs mt-1">No image available</p>
            </div>
          )}
        </div>

        <div className="flex-grow flex flex-col justify-center text-xs text-gray-500 space-y-1">
          {isIdle ? (
            <p className="text-center text-sm text-gray-500">Awaiting truck...</p>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Status:</span>
                <span>{processStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">PO / Seq:</span>
                <span>{poNumber} ({sequence})</span>
              </div>
              {weight && station.name.includes('WB') && (
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Weight:</span>
                  <span>{weight}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Time:</span>
                <span>{timestamp}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <div className={cn("grid w-full gap-2", isIdle ? "grid-cols-1" : "grid-cols-2")}>
          {!isIdle && (
            <Button variant="secondary" size="sm" className="w-full" onClick={() => onOpenDetail(station)}>
              <EyeIcon className="w-4 h-4 mr-2" />
              Detail
            </Button>
          )}
          <Button variant="default" size="sm" className="w-full" onClick={() => onOpenPortal(station)}>
            <ExternalLinkIcon className="w-4 h-4 mr-2" />
            Portal
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};