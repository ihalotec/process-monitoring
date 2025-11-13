
import React from 'react';
import type { Station } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { XIcon } from './icons';
import { Textarea } from './ui/textarea';
import { LiveCameraFeed } from './LiveCameraFeed';

interface PortalModalProps {
  station: Station;
  onClose: () => void;
}

export const PortalModal: React.FC<PortalModalProps> = ({ station, onClose }) => {
  const { name, icon: Icon, image } = station;
  const [reason, setReason] = React.useState('');

  const handleOpenPortal = () => {
    console.log(`Manually opening portal for ${name}. Reason: ${reason}`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-md m-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4 rounded-full h-8 w-8 text-gray-500 hover:text-gray-900 z-10">
          <XIcon className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </Button>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center pr-12">
            <Icon className="w-6 h-6 mr-3 text-blue-600" />
            {name} - Manual Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden relative">
            <LiveCameraFeed image={image} />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Manual Portal
            </label>
            <Textarea 
              id="reason"
              placeholder="e.g., System malfunction, special clearance..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleOpenPortal}
            disabled={reason.trim() === ''}
          >
            Open Portal
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
