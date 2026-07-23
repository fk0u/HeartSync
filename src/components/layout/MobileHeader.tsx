import React from 'react';
import { CustomProfileSelector } from '../profiles/CustomProfileSelector';
import { Heart } from 'lucide-react';
import { playClickSound } from '../../utils/audio-fx';
import { useNavigate } from '@tanstack/react-router';

export const MobileHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="md:hidden sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-3 transition-colors">
      <div className="flex items-center justify-between gap-3">
        
        {/* App Logo */}
        <div 
          onClick={() => {
            playClickSound();
            navigate({ to: '/' });
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-sky-500 flex items-center justify-center shadow-md shadow-teal-500/25">
            <Heart className="w-4.5 h-4.5 text-white fill-white animate-pulse" />
          </div>
          <span className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">
            HeartSync
          </span>
        </div>

        {/* Custom Apple Profile Selector */}
        <CustomProfileSelector />

      </div>
    </header>
  );
};
