import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StationCard } from './components/StationCard';
import { ActivityTable } from './components/ActivityTable';
import { initialStations, initialActivities } from './constants';
import type { Station, TruckActivity, Status } from './types';
import { StatusIndicator } from './components/icons';
import { DetailModal } from './components/DetailModal';
import { PortalModal } from './components/PortalModal';
import { RecentDetailModal } from './components/RecentDetailModal';
import { cn } from './lib/utils';

const sampleTruckImages = [
  'https://images.unsplash.com/photo-1628153434751-2454a35368c1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599553251212-34f71a93e36e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590212151029-1a705103a03c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1582209761386-7b28271131c9?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1582209761304-42f1d247f136?q=80&w=800&auto=format&fit=crop'
];


const App: React.FC = () => {
  const [stations, setStations] = useState<Station[]>(initialStations);
  const [activities, setActivities] = useState<TruckActivity[]>(initialActivities);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [portalStation, setPortalStation] = useState<Station | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<TruckActivity | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate station updates
      setStations(prevStations =>
        prevStations.map(station => {
          const random = Math.random();
          if (random < 0.1) { // 10% chance to change status
            const statuses: Status[] = ['Active', 'Warning', 'Idle'];
            const processStatuses = ['Checking Documents', 'Awaiting Tare', 'Final Weighing', 'Gate Opening'];
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const isIdle = newStatus === 'Idle' || (station.name === 'Gate Out' && Math.random() < 0.5);
            const isWeighingStation = station.name.includes('WB');

            let newImage = station.image;
            if (isIdle) {
              newImage = null;
            } else if (!station.image) { // If it was idle and becomes active
              newImage = sampleTruckImages[Math.floor(Math.random() * sampleTruckImages.length)];
            }

            return {
              ...station,
              status: newStatus,
              poNumber: isIdle ? null : `PO-${Math.floor(100000 + Math.random() * 900000)}`,
              sequence: isIdle ? null : `${Math.floor(Math.random() * 9) + 1}/${Math.floor(Math.random() * 5) + 5}`,
              timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
              processStatus: isIdle ? 'Idle' : processStatuses[Math.floor(Math.random() * processStatuses.length)],
              weight: isIdle ? null : isWeighingStation ? `${Math.floor(Math.random() * 30000 + 10000).toLocaleString('id-ID')} kg` : null,
              image: newImage,
            };
          }
          return station;
        })
      );

      // Simulate new truck activity
      if (Math.random() < 0.3) { // 30% chance to add new activity
        const locations = ['Gate In', 'WB 1', 'WB 2', 'Gate Out'];
        const statuses: TruckActivity['status'][] = ['Completed', 'Weighing', 'Waiting', 'In Progress'];
        const newActivity: TruckActivity = {
          id: `TRK-${Math.floor(10000 + Math.random() * 90000)}`,
          truckId: `TRK-${Math.floor(10000 + Math.random() * 90000)}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
          location: locations[Math.floor(Math.random() * locations.length)],
          poNumber: `PO-${Math.floor(100000 + Math.random() * 900000)}`,
          sequence: `${Math.floor(Math.random() * 9) + 1}/${Math.floor(Math.random() * 5) + 8}`,
        };
        setActivities(prevActivities => [newActivity, ...prevActivities.slice(0, 19)]);
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredActivities = useMemo(() => {
    if (!searchTerm) return activities;
    return activities.filter(
      activity =>
        activity.truckId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.poNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activities, searchTerm]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />
      <div className={cn(
        "flex-1 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out"
      )}>
        <Header onMobileMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Process Monitoring Dashboard</h1>
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center gap-2"><StatusIndicator status="Active" /><span>Active</span></div>
                <div className="flex items-center gap-2"><StatusIndicator status="Warning" /><span>Warning</span></div>
                <div className="flex items-center gap-2"><StatusIndicator status="Idle" /><span>Idle</span></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stations.map(station => (
              <StationCard 
                key={station.id} 
                station={station} 
                onOpenDetail={() => setSelectedStation(station)}
                onOpenPortal={() => setPortalStation(station)}
              />
            ))}
          </div>
          <ActivityTable 
            activities={filteredActivities} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            onViewActivity={setSelectedActivity}
          />
        </main>
      </div>
      {selectedStation && <DetailModal station={selectedStation} onClose={() => setSelectedStation(null)} />}
      {portalStation && <PortalModal station={portalStation} onClose={() => setPortalStation(null)} />}
      {selectedActivity && <RecentDetailModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />}
    </div>
  );
};

export default App;