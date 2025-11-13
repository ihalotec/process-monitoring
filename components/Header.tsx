
import React from 'react';
import { Button } from './ui/button';
import { CalendarIcon, BellIcon, ChevronDownIcon, MenuIcon } from './icons';
import { UserNav } from './UserNav';

interface HeaderProps {
    onMobileMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
      <div className="flex items-center">
         <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onMobileMenuClick}>
            <MenuIcon className="w-6 h-6"/>
            <span className="sr-only">Open menu</span>
        </Button>
        <h1 className="text-xl font-semibold text-gray-900 hidden md:block">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Button variant="outline" className="hidden sm:flex">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>Last 24 hours</span>
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        </Button>
        <div className="relative">
            <Button variant="ghost" size="icon">
              <BellIcon className="w-5 h-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-white"></span>
        </div>
        <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
        <UserNav />
      </div>
    </header>
  );
};
