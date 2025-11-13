
import type React from 'react';

export interface JourneyStep {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  status: 'Completed' | 'In Progress' | 'Pending';
  timestamp: string | null;
  image: string | null;
  weight: string | null;
  processStatus: string | null;
}

export interface TruckJourney {
  truckId: string;
  poNumber: string;
  overallStatus: 'Completed' | 'In Progress';
  startTime: string;
  endTime: string | null;
  totalDuration: string | null;
  steps: JourneyStep[];
}
