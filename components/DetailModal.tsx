import React from 'react';
import type { Station } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { NoImageIcon, StatusIndicator, XIcon, EyeIcon } from './icons';

interface DetailModalProps {
  station: Station;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ station, onClose }) => {
  const { name, icon: Icon, status, image, poNumber, sequence, timestamp, processStatus, weight } = station;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-lg m-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4 rounded-full h-8 w-8 text-gray-500 hover:text-gray-900 z-10">
          <XIcon className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </Button>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center pr-12">
            <Icon className="w-6 h-6 mr-3 text-blue-600" />
            {name} - Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            {image ? (
              <a href={image} target="_blank" rel="noopener noreferrer" className="block w-full h-full group cursor-pointer">
                <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <EyeIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"/>
                </div>
              </a>
            ) : (
              <div className="text-center text-gray-400">
                <NoImageIcon className="w-16 h-16 mx-auto" />
                <p className="text-sm mt-2">No image available</p>
              </div>
            )}
          </div>
          <div className="space-y-2 text-sm">
             <div className="flex justify-between items-center py-2 border-b">
              <span className="font-semibold text-gray-600">Overall Status:</span>
              <div className="flex items-center gap-2">
                <StatusIndicator status={status} />
                <span className="font-medium">{status}</span>
              </div>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-600">Process Status:</span>
              <span className="text-gray-800">{processStatus}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-600">PO Number:</span>
              <span className="text-gray-800">{poNumber ?? 'N/A'}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-gray-600">Sequence No.:</span>
              <span className="text-gray-800">{sequence ?? 'N/A'}</span>
            </div>
             {weight && station.name.includes('WB') && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold text-gray-600">Weight:</span>
                  <span className="text-gray-800">{weight}</span>
                </div>
              )}
            <div className="flex justify-between py-2">
              <span className="font-semibold text-gray-600">Timestamp:</span>
              <span className="text-gray-800">{timestamp}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};