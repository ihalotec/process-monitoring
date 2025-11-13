
import type React from 'react';

export type Status = 'Active' | 'Warning' | 'Idle';

export interface Station {
  id: string;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  status: Status;
  image: string | null;
  poNumber: string | null;
  sequence: string | null;
  timestamp: string;
  processStatus: string;
  weight: string | null;
}

export interface TruckActivity {
  id: string;
  truckId: string;
  status: 'Completed' | 'Weighing' | 'Waiting' | 'In Progress';
  timestamp: string;
  location: string;
  poNumber: string;
  sequence: string;
}
