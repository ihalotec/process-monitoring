import React, { useMemo } from 'react';
import type { TruckActivity } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { GateInIcon, GateOutIcon, WeighbridgeIcon, XIcon, NoImageIcon, TruckIcon } from './icons';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

// --- TYPE DEFINITIONS ---
interface JourneyStep {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  status: 'Completed' | 'In Progress' | 'Pending';
  timestamp: string | null;
  image: string | null;
  weight: string | null;
  processStatus: string | null;
}

interface TruckJourney {
  truckId: string;
  poNumber: string;
  overallStatus: 'Completed' | 'In Progress';
  startTime: string;
  endTime: string | null;
  totalDuration: string | null;
  steps: JourneyStep[];
}

// --- MOCK DATA GENERATION ---
const sampleImages = [
  'https://images.unsplash.com/photo-1628153434751-2454a35368c1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599553251212-34f71a93e36e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590212151029-1a705103a03c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1582209761386-7b28271131c9?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1582209761304-42f1d247f136?q=80&w=800&auto=format&fit=crop'
];

const addMinutes = (timeStr: string, minutes: number): string => {
    const [hours, mins] = timeStr.split('.').map(Number);
    const date = new Date();
    date.setHours(hours, mins, 0, 0);
    date.setMinutes(date.getMinutes() + minutes);
    return `${String(date.getHours()).padStart(2, '0')}.${String(date.getMinutes()).padStart(2, '0')}`;
};

const generateMockJourney = (activity: TruckActivity): TruckJourney => {
    const stationOrder = ['Gate In', 'WB 1', 'WB 2', 'Gate Out'];
    const currentIndex = stationOrder.indexOf(activity.location);

    const steps: JourneyStep[] = [
        { name: 'Gate In', icon: GateInIcon, status: 'Pending', timestamp: null, image: null, weight: null, processStatus: 'Pending' },
        { name: 'WB 1', icon: WeighbridgeIcon, status: 'Pending', timestamp: null, image: null, weight: null, processStatus: 'Pending' },
        { name: 'WB 2', icon: WeighbridgeIcon, status: 'Pending', timestamp: null, image: null, weight: null, processStatus: 'Pending' },
        { name: 'Gate Out', icon: GateOutIcon, status: 'Pending', timestamp: null, image: null, weight: null, processStatus: 'Pending' },
    ];
    
    let baseTime = activity.timestamp;
    
    // Fill in data for previous steps
    for (let i = 0; i < currentIndex; i++) {
        const stepTime = addMinutes(baseTime, -( (currentIndex - i) * 5 + Math.floor(Math.random() * 3) ));
        steps[i].status = 'Completed';
        steps[i].timestamp = stepTime;
        steps[i].image = sampleImages[i % sampleImages.length];
        steps[i].processStatus = 'Completed';
        if (steps[i].name.includes('WB')) {
            steps[i].weight = `${Math.floor(Math.random() * 20000 + 10000).toLocaleString('id-ID')} kg`;
        }
    }
    
    // Fill in data for current step
    if (currentIndex !== -1) {
        steps[currentIndex].status = activity.status === 'Completed' ? 'Completed' : 'In Progress';
        steps[currentIndex].timestamp = activity.timestamp;
        steps[currentIndex].image = sampleImages[currentIndex % sampleImages.length];
        steps[currentIndex].processStatus = activity.status;
         if (steps[currentIndex].name.includes('WB')) {
            steps[currentIndex].weight = `${Math.floor(Math.random() * 20000 + 10000).toLocaleString('id-ID')} kg`;
        }
    }
    
    // Handle completed journey
    if(activity.location === 'Gate Out' && activity.status === 'Completed') {
        steps[stationOrder.length-1].status = 'Completed';
    }


    const startTime = steps[0].timestamp;
    const lastCompletedStep = [...steps].reverse().find(s => s.status === 'Completed');
    const endTime = lastCompletedStep?.name === 'Gate Out' ? lastCompletedStep.timestamp : null;
    
    let totalDuration = null;
    if(startTime && lastCompletedStep?.timestamp) {
        const [startH, startM] = startTime.split('.').map(Number);
        const [endH, endM] = lastCompletedStep.timestamp.split('.').map(Number);
        const diff = (endH * 60 + endM) - (startH * 60 + startM);
        totalDuration = `${diff} mins`;
    }

    return {
        truckId: activity.truckId,
        poNumber: activity.poNumber,
        overallStatus: endTime ? 'Completed' : 'In Progress',
        startTime: startTime ?? '--.--',
        endTime,
        totalDuration,
        steps,
    };
};


// --- SUB-COMPONENTS ---
const JourneyStepCard: React.FC<{ step: JourneyStep, isLast: boolean }> = ({ step, isLast }) => {
    const { name, icon: Icon, status, timestamp, image, weight, processStatus } = step;
    
    const isPending = status === 'Pending';
    const isInProgress = status === 'In Progress';

    const statusBadgeVariant = {
        Completed: 'completed',
        'In Progress': 'inProgress',
        Pending: 'secondary',
    }[status];

    return (
        <div className={cn("flex items-center w-full", isLast ? "flex-1" : "flex-[1_1_0%]")}>
            <div className={cn("relative flex-1 group transition-opacity", isPending && "opacity-50")}>
                <div className={cn(
                    "absolute -top-4 left-1/2 -translate-x-1/2 z-10 p-1.5 rounded-full border-4",
                    isInProgress ? "bg-blue-500 border-blue-100" : "bg-white border-gray-200",
                    isPending ? "bg-gray-100" : "",
                    status === 'Completed' ? "bg-green-500 border-green-100" : ""
                )}>
                   <Icon className={cn("w-5 h-5", isInProgress || status === 'Completed' ? "text-white" : "text-gray-500")} />
                </div>
                <Card className="pt-8 text-center">
                    <CardHeader className="p-2 pt-0">
                        <CardTitle className="text-sm font-semibold">{name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 space-y-2">
                        <div className="relative aspect-video bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                            {image ? (
                                <img src={image} alt={name} className="w-full h-full object-cover" />
                            ) : (
                                <NoImageIcon className="w-8 h-8 text-gray-400" />
                            )}
                        </div>
                        <Badge variant={statusBadgeVariant} className="w-full justify-center">{processStatus}</Badge>
                         <div className="text-xs text-gray-500 space-y-1 text-left px-1">
                            <p className="flex justify-between"><span>Time:</span> <span>{timestamp ?? '--.--'}</span></p>
                            {weight && <p className="flex justify-between"><span>Weight:</span> <span>{weight}</span></p>}
                        </div>
                    </CardContent>
                </Card>
            </div>
            {!isLast && <div className="flex-shrink-0 w-8 h-1 bg-gray-200 mx-2 rounded-full" />}
        </div>
    );
};


// --- MAIN MODAL COMPONENT ---
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