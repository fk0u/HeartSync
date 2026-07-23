import React, { useState, useEffect } from 'react';
import { useProfiles } from '../../hooks/useProfiles';
import { useAppStore } from '../../store/useAppStore';
import {
  Heart,
  Plus,
  Moon,
  Sun,
  Users,
  ChevronDown,
  Wifi,
  WifiOff,
  UserPlus
} from 'lucide-react';
import { getRelationshipLabel } from '../../utils/formatters';

export const Header: React.FC = () => {
  const { profiles, activeProfile, switchProfile } = useProfiles();
  const openReadingModal = useAppStore((state) => state.openReadingModal);
  const openProfileModal = useAppStore((state) => state.openProfileModal);
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500 text-white shadow-lg shadow-teal-500/20 animate-float">
            <Heart className="w-5 h-5 fill-white/20" />
            <div className="absolute inset-0 rounded-2xl bg-white/20 blur-sm -z-10"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-teal-600 to-sky-600 dark:from-teal-400 dark:to-sky-400 bg-clip-text text-transparent">
                HeartSync
              </h1>
              {!isOnline && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  <WifiOff className="w-3 h-3" /> Offline
                </span>
              )}
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
              Blood Pressure Monitor
            </p>
          </div>
        </div>

        {/* Center: Profile Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-700/60 transition-all duration-200 active:scale-95"
            aria-label="Pilih Profil Pengguna"
          >
            <span className="text-lg leading-none">{activeProfile?.avatar || '👤'}</span>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100 max-w-[100px] sm:max-w-[140px] truncate">
                {activeProfile?.name || 'Pilih Profil'}
              </div>
              <div className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                {activeProfile ? getRelationshipLabel(activeProfile.relationship) : ''}
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileDropdownOpen(false)}
              ></div>
              <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Pilih Profil Pasien
                </div>

                <div className="max-h-56 overflow-y-auto px-1 space-y-1">
                  {profiles.map((p) => {
                    const isSelected = p.id === activeProfile?.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          switchProfile(p.id);
                          setIsProfileDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                          isSelected
                            ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 font-semibold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="text-base">{p.avatar}</span>
                          <div className="truncate">
                            <div className="font-semibold">{p.name}</div>
                            <div className="text-[10px] text-slate-400">
                              {getRelationshipLabel(p.relationship)} • Target: &lt;{p.targetSystolic}/{p.targetDiastolic}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-1 px-1">
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      openProfileModal();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Kelola / Tambah Profil
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Ganti Mode Tampilan"
            aria-label="Ganti Mode Tampilan"
          >
            {theme === 'dark' ? (
              <Sun className="w-4.5 h-4.5 text-amber-400" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-slate-600" />
            )}
          </button>

          {/* Primary "+ Catat Tensi" Button */}
          <button
            onClick={() => openReadingModal()}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-semibold text-xs shadow-lg shadow-teal-500/25 active:scale-95 transition-all duration-200"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Catat Tensi
          </button>
        </div>
      </div>
    </header>
  );
};
