
import React, { useMemo } from 'react';
import type { TruckActivity } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { XIcon, TruckIcon } from '../icons';
import { generateMockJourney } from './data';
import { JourneyStepCard } from './JourneyStepCard';
import { JourneySummary } from './JourneySummary';

interface RecentDetailModalProps {
  activity: TruckActivity;
  onClose: () => void;
}

export const RecentDetailModal: React.FC<RecentDetailModalProps> = ({ activity, onClose }) => {
  const journey = useMemo(() => generateMockJourney(activity), [activity]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="recent-detail-title"
    >
      <Card 
        className="w-full max-w-5xl m-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4 rounded-full h-8 w-8 text-gray-500 hover:text-gray-900 z-10">
          <XIcon className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </Button>
        <CardHeader>
          <CardTitle id="recent-detail-title" className="text-lg font-semibold flex items-center pr-12">
            <TruckIcon className="w-6 h-6 mr-3 text-blue-600" />
            Truck Journey Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <JourneySummary journey={journey} />
            <div className="relative pt-4">
                 <div className="flex justify-between items-start">
                    {journey.steps.map((step, index) => (
                      <JourneyStepCard key={step.name} step={step} isLast={index === journey.steps.length - 1} />
                    ))}
                 </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};
