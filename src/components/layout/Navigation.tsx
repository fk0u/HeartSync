import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { playClickSound } from '../../utils/audio-fx';
import { LayoutDashboard, History, FileText, Bell, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export type NavTab = 'dashboard' | 'history' | 'reports' | 'reminders';

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const openReadingModal = useAppStore((state) => state.openReadingModal);

  const tabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Ringkasan', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'history', label: 'Jurnal', icon: <History className="w-5 h-5" /> },
    { id: 'reports', label: 'Dokter', icon: <FileText className="w-5 h-5" /> },
    { id: 'reminders', label: 'Jadwal', icon: <Bell className="w-5 h-5" /> }
  ];

  return (
    // Hide bottom navigation on desktop viewports using md:hidden
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe pt-2 bg-gradient-to-t from-slate-950/90 via-slate-950/80 to-transparent pointer-events-none md:hidden">
      <div className="max-w-md mx-auto relative pointer-events-auto">
        
        {/* Floating iOS / APK Native Tab Container */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 rounded-full p-1.5 shadow-2xl flex items-center justify-between shadow-slate-900/20">
          
          {/* Left 2 Tabs */}
          <div className="flex items-center justify-around flex-1 pr-4">
            {tabs.slice(0, 2).map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onTabChange(tab.id);
                  }}
                  className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-full transition-all duration-200 ${
                    isSelected
                      ? 'text-teal-600 dark:text-teal-400 font-extrabold scale-105'
                      : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800'
                  }`}
                >
                  {tab.icon}
                  <span className="text-[10px] tracking-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Elevated Center Thumb-Reachable FAB (+ Catat Tensi) */}
          <div className="relative -top-5 shrink-0 px-1">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playClickSound();
                openReadingModal();
              }}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-teal-500 to-sky-500 text-white shadow-xl shadow-teal-500/40 flex items-center justify-center border-4 border-slate-50 dark:border-slate-950 active:scale-90 transition-transform"
              title="Catat Tensi Baru"
            >
              <Plus className="w-7 h-7 stroke-[3]" />
            </motion.button>
          </div>

          {/* Right 2 Tabs */}
          <div className="flex items-center justify-around flex-1 pl-4">
            {tabs.slice(2, 4).map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onTabChange(tab.id);
                  }}
                  className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-full transition-all duration-200 ${
                    isSelected
                      ? 'text-teal-600 dark:text-teal-400 font-extrabold scale-105'
                      : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800'
                  }`}
                >
                  {tab.icon}
                  <span className="text-[10px] tracking-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
};
