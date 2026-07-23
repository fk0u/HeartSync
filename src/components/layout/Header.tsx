/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 · Apple Native APK/IPA Archetype */
import React from 'react';
import { useProfiles } from '../../hooks/useProfiles';
import { useAppStore } from '../../store/useAppStore';

// Icons
import { Heart, ChevronDown, Plus } from 'lucide-react';

export const Header: React.FC = () => {
  const { profiles, activeProfile, setActiveProfile } = useProfiles();
  const openProfileModal = useAppStore((state) => state.openProfileModal);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Apple Style App Logo & Title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-sky-500 flex items-center justify-center shadow-md shadow-teal-500/25">
            <Heart className="w-4.5 h-4.5 text-white fill-white animate-pulse" />
          </div>
          <span className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">
            HeartSync
          </span>
        </div>

        {/* Apple Health Style Profile Switcher (Clean, right-aligned) */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200/80 dark:border-slate-800">
          <span className="text-sm pl-1">{activeProfile?.avatar || '👤'}</span>
          <select
            value={activeProfile?.id || ''}
            onChange={(e) => setActiveProfile(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-1 max-w-[90px] truncate"
          >
            {profiles.map((p) => (
              <option key={p.id} value={p.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                {p.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => openProfileModal()}
            className="p-1 rounded-full bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
            title="Kelola Profil Pasien"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

      </div>
    </header>
  );
};
