
import React, { useState, useMemo, useEffect } from 'react';
import type { TruckActivity } from '../types';
import { EyeIcon, SearchIcon } from './icons';
import { Input } from './ui/input';
import { Badge, type BadgeProps } from './ui/badge';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';


interface ActivityTableProps {
  activities: TruckActivity[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onViewActivity: (activity: TruckActivity) => void;
}

const statusVariantMap: Record<TruckActivity['status'], BadgeProps['variant']> = {
  Completed: 'completed',
  Weighing: 'weighing',
  Waiting: 'waiting',
  'In Progress': 'inProgress',
};

const ITEMS_PER_PAGE = 5;

export const ActivityTable: React.FC<ActivityTableProps> = ({ activities, searchTerm, setSearchTerm, onViewActivity }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);

  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return activities.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [activities, currentPage]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Recent Truck Activity</CardTitle>
            <div className="relative w-full sm:max-w-xs">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by Truck ID, PO..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {['TRUCK ID', 'STATUS', 'TIMESTAMP', 'LOCATION', 'PO NUMBER', 'SEQUENCE NO.'].map(header => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedActivities.length > 0 ? (
                paginatedActivities.map(activity => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.truckId}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariantMap[activity.status]}>{activity.status}</Badge>
                    </TableCell>
                    <TableCell>{activity.timestamp}</TableCell>
                    <TableCell>{activity.location}</TableCell>
                    <TableCell>{activity.poNumber}</TableCell>
                    <TableCell>{activity.sequence}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => onViewActivity(activity)}>
                        <EyeIcon className="w-5 h-5" />
                        <span className="sr-only">View Activity</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    No activities found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {totalPages > 1 && (
        <CardFooter className="flex items-center justify-between pt-4">
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
