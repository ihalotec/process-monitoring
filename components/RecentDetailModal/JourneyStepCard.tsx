import React from 'react';
import type { JourneyStep } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { NoImageIcon, EyeIcon } from '../icons';
import { cn } from '../../lib/utils';

interface JourneyStepCardProps {
  step: JourneyStep;
  isLast: boolean;
}

export const JourneyStepCard: React.FC<JourneyStepCardProps> = ({ step, isLast }) => {
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
                                <a href={image} target="_blank" rel="noopener noreferrer" className="block w-full h-full group cursor-pointer">
                                    <img 
                                        src={image} 
                                        alt={name} 
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                                        <EyeIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity"/>
                                    </div>
                                </a>
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