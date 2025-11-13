import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ChevronDownIcon, UserIcon, CreditCardIcon, SettingsIcon, LogOutIcon } from './icons';
import { cn } from '../lib/utils';

export const UserNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const DropdownItem: React.FC<{ icon: React.FC<React.SVGProps<SVGSVGElement>>; label: string; shortcut?: string }> = ({ icon: Icon, label, shortcut }) => (
    <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
        <Icon className="w-4 h-4 mr-2" />
        <span>{label}</span>
        {shortcut && <span className="ml-auto text-xs tracking-widest text-gray-500">{shortcut}</span>}
    </a>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="ghost" className="flex items-center space-x-2 px-2" onClick={() => setIsOpen(!isOpen)}>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
          JD
        </div>
        <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium text-gray-800">Jane Doe</span>
            <span className="text-xs text-gray-500">Administrator</span>
        </div>
        <ChevronDownIcon className={cn("w-4 h-4 text-gray-500 transition-transform", isOpen && "rotate-180")} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right">
             <Card className="p-1.5 shadow-lg">
                <div className="p-2 border-b">
                    <p className="text-sm font-semibold text-gray-900">Jane Doe</p>
                    <p className="text-sm text-gray-500">jane.doe@example.com</p>
                </div>
                <div className="space-y-1 p-1">
                    <DropdownItem icon={UserIcon} label="Profile" shortcut="⇧P"/>
                    <DropdownItem icon={CreditCardIcon} label="Billing" shortcut="⇧B"/>
                    <DropdownItem icon={SettingsIcon} label="Settings" shortcut="⇧S"/>
                </div>
                <div className="border-t my-1"></div>
                <div className="p-1">
                    <DropdownItem icon={LogOutIcon} label="Log out"/>
                </div>
             </Card>
        </div>
      )}
    </div>
  );
};
