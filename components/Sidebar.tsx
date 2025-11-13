
import React from 'react';
import { LogoIcon, DashboardIcon, POManagementIcon, ReportsIcon, SettingsIcon, HelpCircleIcon, LogOutIcon, ChevronsLeftIcon } from './icons';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

interface NavItemProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  active?: boolean;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active = false, isCollapsed }) => {
  return (
    <a 
      href="#" 
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-gray-100 text-gray-900" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        isCollapsed && "justify-center"
      )}
      title={isCollapsed ? label : undefined}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className={cn("ml-3 flex-grow", isCollapsed && "hidden")}>{label}</span>
    </a>
  );
};

interface SidebarProps {
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    isMobileOpen: boolean;
    onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse, isMobileOpen, onMobileClose }) => {
  const sidebarContent = (isCollapsedForNav: boolean) => (
    <>
      <div className={cn("h-16 flex items-center px-4 border-b border-gray-200", isCollapsedForNav ? "justify-center" : "justify-start")}>
        <a href="#" className="flex items-center gap-2">
            <LogoIcon className="h-8 w-8" />
            <span className={cn("text-xl font-bold tracking-tight text-gray-900", isCollapsedForNav && "hidden")}>Autogate</span>
        </a>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4">
            <div className="space-y-1">
                <NavItem icon={DashboardIcon} label="Dashboard" active isCollapsed={isCollapsedForNav} />
                <NavItem icon={POManagementIcon} label="PO Management" isCollapsed={isCollapsedForNav} />
                <NavItem icon={ReportsIcon} label="Reports" isCollapsed={isCollapsedForNav} />
                <NavItem icon={SettingsIcon} label="Settings" isCollapsed={isCollapsedForNav} />
            </div>
          </nav>
          <div className="px-2 py-4 mt-auto border-t border-gray-200">
             <div className="space-y-1">
                <NavItem icon={HelpCircleIcon} label="Support" isCollapsed={isCollapsedForNav} />
                <NavItem icon={LogOutIcon} label="Log out" isCollapsed={isCollapsedForNav} />
             </div>
             <div className="hidden md:flex justify-center pt-4">
                <Button variant="outline" size="icon" onClick={onToggleCollapse} className="rounded-full">
                    <ChevronsLeftIcon className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
                </Button>
             </div>
          </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div 
        onClick={onMobileClose} 
        className={cn(
            "fixed inset-0 bg-black/60 z-40 md:hidden",
            isMobileOpen ? "block" : "hidden"
        )} 
      />
      <aside className={cn(
        "fixed md:hidden inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {sidebarContent(false)}
      </aside>

      {/* Desktop sidebar */}
      <aside className={cn(
          "hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64"
      )}>
        {sidebarContent(isCollapsed)}
      </aside>
    </>
  );
};
