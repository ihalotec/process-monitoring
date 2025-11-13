
import React from 'react';
import type { TruckJourney } from './types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

interface JourneySummaryProps {
  journey: TruckJourney;
}

export const JourneySummary: React.FC<JourneySummaryProps> = ({ journey }) => {
    return (
        <Card className="bg-gray-50">
            <CardHeader>
                <CardTitle className="text-base">Journey Summary</CardTitle>
                <CardDescription>{journey.truckId} / {journey.poNumber}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex flex-col">
                        <span className="text-gray-500">Overall Status</span>
                        <span className="font-semibold">{journey.overallStatus}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Start Time</span>
                        <span className="font-semibold">{journey.startTime}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">End Time</span>
                        <span className="font-semibold">{journey.endTime ?? 'In Progress'}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Total Duration</span>
                        <span className="font-semibold">{journey.totalDuration ?? 'Calculating...'}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
