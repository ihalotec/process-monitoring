import type { TruckActivity } from '../../types';
import type { JourneyStep, TruckJourney } from './types';
import { GateInIcon, WeighbridgeIcon, GateOutIcon } from '../icons';

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

export const generateMockJourney = (activity: TruckActivity): TruckJourney => {
    const stationOrder = ['Gate In', 'WB 1', 'WB 2', 'Gate Out'];
    const currentIndex = stationOrder.indexOf(activity.location);

    const steps: JourneyStep[] = [
        { name: 'Gate In', icon: GateInIcon, status: 'Pending', timestamp: null, image: null, weight: null, processStatus: 'Pending' },
        { name: 'WB 1', icon: WeighbridgeIcon, status: 'Pending', timestamp: null, image: null, weight: null, processStatus: 'Pending' },
        { name: 'WB 2', icon: WeighbridgeIcon, status: 'Pending', timestamp: null, image: null, weight: null, processStatus: 'Pending' },
        { name: 'Gate Out', icon: GateOutIcon, status: 'Pending', timestamp: null, image: null, weight: null, processStatus: 'Pending' },
    ];
    
    let baseTime = activity.timestamp;
    
    // Fill in data for steps up to the current one
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
    
    // Fill in data for the current step
    if (currentIndex > -1) {
        steps[currentIndex].status = activity.status === 'Completed' ? 'Completed' : 'In Progress';
        steps[currentIndex].timestamp = activity.timestamp;
        steps[currentIndex].image = sampleImages[currentIndex % sampleImages.length];
        steps[currentIndex].processStatus = activity.status;
         if (steps[currentIndex].name.includes('WB')) {
            steps[currentIndex].weight = `${Math.floor(Math.random() * 20000 + 10000).toLocaleString('id-ID')} kg`;
        }
    }
    
    // If the whole journey is complete, fill in all steps
    if(activity.location === 'Gate Out' && activity.status === 'Completed') {
        for(let i=0; i < steps.length; i++){
            if(steps[i].status === 'Pending') {
                 steps[i].status = 'Completed';
                 steps[i].timestamp = addMinutes(steps[i-1].timestamp!, 5 + Math.floor(Math.random() * 3));
                 steps[i].image = sampleImages[i % sampleImages.length];
                 steps[i].processStatus = 'Completed';
                 if (steps[i].name.includes('WB')) {
                    steps[i].weight = `${Math.floor(Math.random() * 20000 + 10000).toLocaleString('id-ID')} kg`;
                }
            }
        }
    }


    const startTime = steps[0].timestamp;
    const lastCompletedStep = [...steps].reverse().find(s => s.status === 'Completed');
    const endTime = lastCompletedStep?.name === 'Gate Out' ? lastCompletedStep.timestamp : null;
    
    let totalDuration = null;
    if(startTime && lastCompletedStep?.timestamp) {
        const [startH, startM] = startTime.split('.').map(Number);
        const [endH, endM] = lastCompletedStep.timestamp.split('.').map(Number);
        const diff = (endH * 60 + endM) - (startH * 60 + startM);
        totalDuration = diff > 0 ? `${diff} mins` : '1 min';
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