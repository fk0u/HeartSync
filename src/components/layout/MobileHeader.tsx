import React from 'react';
import { CustomProfileSelector } from '../profiles/CustomProfileSelector';
import { Heart, Settings, UserRound } from 'lucide-react';
import { playClickSound } from '../../utils/audio-fx';
import { useNavigate } from '@tanstack/react-router';
import { useAppStore } from '../../store/useAppStore';

export const MobileHeader: React.FC = () => {
  const navigate = useNavigate();
  const openMobileToolsSheet = useAppStore((state) => state.openMobileToolsSheet);

  return (
    <header className="md:hidden sticky top-0 z-40 bg-white/96 dark:bg-slate-900/96 backdrop-blur-2xl border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-3 transition-colors">
      <div className="flex items-center justify-between gap-3 min-w-0">
        
        {/* App Logo */}
        <div 
          onClick={() => {
            playClickSound();
            navigate({ to: '/' });
          }}
          className="flex items-center gap-2 cursor-pointer min-w-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500 flex items-center justify-center shadow-md shadow-teal-500/25 shrink-0">
            <Heart className="w-4.5 h-4.5 text-white fill-white animate-pulse" />
          </div>
          <div className="min-w-0">
            <span className="block text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight truncate">
              HeartSync
            </span>
            <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-none truncate">
              mobile-first cardio log
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              navigate({ to: '/profile' });
            }}
            className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
            title="Halaman Profil"
          >
            <UserRound className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              navigate({ to: '/settings' });
            }}
            className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
            title="Pengaturan"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              openMobileToolsSheet();
            }}
            className="w-11 h-11 rounded-2xl bg-slate-900 dark:bg-white border border-slate-900 dark:border-white flex items-center justify-center text-white dark:text-slate-900 active:scale-95 transition-all"
            title="Lainnya"
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>

          {/* Custom Apple Profile Selector */}
          <CustomProfileSelector />
        </div>

      </div>
    </header>
  );
};
