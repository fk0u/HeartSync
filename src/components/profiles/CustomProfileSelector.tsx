import React, { useState, useRef, useEffect } from 'react';
import { useProfiles } from '../../hooks/useProfiles';
import { useAppStore } from '../../store/useAppStore';
import { getRelationshipLabel } from '../../utils/formatters';
import { playClickSound } from '../../utils/audio-fx';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Check, User, Users } from 'lucide-react';

export const CustomProfileSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profiles, activeProfile, switchProfile } = useProfiles();
  const openProfileModal = useAppStore((state) => state.openProfileModal);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => {
          playClickSound();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 transition-all active:scale-95 shadow-sm"
      >
        <span className="text-base leading-none">{activeProfile?.avatar || '👤'}</span>
        <div className="text-left max-w-[100px] truncate">
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block truncate">
            {activeProfile?.name || 'Pasien'}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Pilih Profil Pasien
              </span>
              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-full">
                {profiles.length} Profil
              </span>
            </div>

            {/* Profile List */}
            <div className="py-1 max-h-60 overflow-y-auto space-y-1">
              {profiles.map((p) => {
                const isActive = p.id === activeProfile?.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      playClickSound();
                      switchProfile(p.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all active:scale-[0.98] ${
                      isActive
                        ? 'bg-teal-50 dark:bg-teal-950/60 border border-teal-500/30'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-xl shrink-0">{p.avatar}</span>
                      <div className="text-left truncate">
                        <span className={`text-xs font-bold block truncate ${isActive ? 'text-teal-700 dark:text-teal-300' : 'text-slate-800 dark:text-slate-200'}`}>
                          {p.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {getRelationshipLabel(p.relationship)} • Usia: {p.age || '-'}
                        </span>
                      </div>
                    </div>

                    {isActive && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Bottom Add Profile Action */}
            <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  playClickSound();
                  setIsOpen(false);
                  openProfileModal();
                }}
                className="w-full flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors active:scale-95"
              >
                <Plus className="w-4 h-4 text-teal-500" />
                Kelola &amp; Tambah Profil
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
