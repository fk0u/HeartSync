import React from 'react';
import {
  LayoutDashboard,
  History,
  FileText,
  Bell,
  Plus
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export type NavTab = 'dashboard' | 'history' | 'reports' | 'reminders';

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const openReadingModal = useAppStore((state) => state.openReadingModal);

  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'history' as NavTab, label: 'Riwayat', icon: History },
    { id: 'reports' as NavTab, label: 'Laporan Dokter', icon: FileText },
    { id: 'reminders' as NavTab, label: 'Pengingat', icon: Bell },
  ];

  return (
    <>
      {/* Desktop Top Tabs Navigation */}
      <div className="hidden md:block bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-semibold text-sm transition-colors duration-200 ${
                    isActive
                      ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-teal-500' : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar & FAB */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe">
        <div className="flex items-center justify-around h-16 px-2 relative">
          
          {/* Dashboard Tab */}
          <button
            onClick={() => onTabChange('dashboard')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              activeTab === 'dashboard' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Dashboard</span>
          </button>

          {/* History Tab */}
          <button
            onClick={() => onTabChange('history')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              activeTab === 'history' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'
            }`}
          >
            <History className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Riwayat</span>
          </button>

          {/* Center Mobile FAB Button */}
          <div className="flex-1 flex justify-center -mt-6">
            <button
              onClick={() => openReadingModal()}
              className="w-13 h-13 rounded-full bg-gradient-to-tr from-teal-500 to-sky-500 text-white flex items-center justify-center shadow-xl shadow-teal-500/40 active:scale-90 transition-transform duration-200"
              aria-label="Catat Tensi"
            >
              <Plus className="w-7 h-7 stroke-[2.5]" />
            </button>
          </div>

          {/* Reports Tab */}
          <button
            onClick={() => onTabChange('reports')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              activeTab === 'reports' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Laporan</span>
          </button>

          {/* Reminders Tab */}
          <button
            onClick={() => onTabChange('reminders')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              activeTab === 'reminders' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Pengingat</span>
          </button>

        </div>
      </div>
    </>
  );
};
