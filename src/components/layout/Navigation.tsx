import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { playClickSound } from '../../utils/audio-fx';
import { LayoutDashboard, History, FileText, Bell, Plus, MoreHorizontal, UserRound, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export type NavTab = 'dashboard' | 'history' | 'reports' | 'reminders';

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const openReadingModal = useAppStore((state) => state.openReadingModal);
  const openMobileToolsSheet = useAppStore((state) => state.openMobileToolsSheet);

  const tabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Ringkasan', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'history', label: 'Jurnal', icon: <History className="w-5 h-5" /> },
    { id: 'reports', label: 'Dokter', icon: <FileText className="w-5 h-5" /> },
    { id: 'reminders', label: 'Jadwal', icon: <Bell className="w-5 h-5" /> }
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-safe pt-2 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-transparent pointer-events-none md:hidden"
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 24, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.8 }}
    >
      <div className="max-w-md mx-auto relative pointer-events-auto">
        <div className="bg-white/92 dark:bg-slate-900/92 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 rounded-[28px] px-2 py-2 shadow-2xl shadow-slate-950/20">
          <div className="grid grid-cols-5 gap-1.5 items-end">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onTabChange(tab.id);
                  }}
                  className={`min-h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-150 active:scale-95 ${
                    isSelected
                      ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-300'
                  }`}
                >
                  {tab.icon}
                  <span className="text-[10px] font-bold leading-none">{tab.label}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => {
                playClickSound();
                openReadingModal();
              }}
              className="min-h-14 rounded-2xl flex flex-col items-center justify-center gap-1 bg-gradient-to-tr from-teal-500 to-sky-500 text-white shadow-lg shadow-teal-500/25 active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
              <span className="text-[10px] font-bold leading-none">Catat</span>
            </button>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                openMobileToolsSheet();
              }}
              className="min-h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center gap-2 font-extrabold text-xs active:scale-95 transition-all"
            >
              <MoreHorizontal className="w-4 h-4" />
              Lainnya
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                openReadingModal();
              }}
              className="min-h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 font-extrabold text-xs active:scale-95 transition-all"
            >
              <Bell className="w-4 h-4" />
              Pengingat Cepat
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
