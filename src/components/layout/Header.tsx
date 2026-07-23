import React, { useState } from 'react';
import { useProfiles } from '../../hooks/useProfiles';
import { useReadings } from '../../hooks/useReadings';
import { useAppStore } from '../../store/useAppStore';
import { speakTextIndonesian } from '../../utils/speech-reader';
import { classifyBP } from '../../utils/bp-classifier';

// Icons
import {
  Heart,
  ShieldCheck,
  Volume2,
  Utensils,
  AlertTriangle,
  Users,
  Lock,
  Plus,
  Sparkles
} from 'lucide-react';

import { SecurityBackupModal } from '../security/SecurityBackupModal';
import { SodiumTrackerModal } from '../dash/SodiumTrackerModal';
import { FamilySOSModal } from '../emergency/FamilySOSModal';

export const Header: React.FC = () => {
  const { profiles, activeProfile, setActiveProfile } = useProfiles();
  const { stats } = useReadings();
  const openProfileModal = useAppStore((state) => state.openProfileModal);

  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isSodiumModalOpen, setIsSodiumModalOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);

  const latest = stats.latestReading;
  const category = latest ? classifyBP(latest.systolic, latest.diastolic) : null;

  const handleSpeakLatestReading = () => {
    if (!latest) {
      speakTextIndonesian('Belum ada data pengukuran tekanan darah.');
      return;
    }
    const categoryText = category ? category.label : '';
    const speechMsg = `Tekanan darah ${activeProfile?.name || 'Pasien'} saat ini adalah ${latest.systolic} per ${latest.diastolic} milimeter raksa, dengan denyut nadi ${latest.pulse} detak per menit. Kategori ${categoryText}.`;
    speakTextIndonesian(speechMsg);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & App Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500 flex items-center justify-center shadow-lg shadow-teal-500/25">
              <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-tight text-slate-900 dark:text-slate-100">
                  HeartSync
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  Tech For Good
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Pencatatan &amp; Monitoring Tekanan Darah Real
              </p>
            </div>
          </div>

          {/* Action Tools & Profile Switcher */}
          <div className="flex items-center gap-2">
            
            {/* Indonesian Voice Reader Trigger */}
            <button
              onClick={handleSpeakLatestReading}
              className="hallmark-button-secondary p-2.5 text-xs text-sky-600 dark:text-sky-400"
              title="Suara Audio Pembaca Tensi (Lansia Mode)"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Sodium DASH Tracker Trigger */}
            <button
              onClick={() => setIsSodiumModalOpen(true)}
              className="hallmark-button-secondary p-2.5 text-xs text-amber-600 dark:text-amber-400"
              title="Pelacak Garam DASH Diet"
            >
              <Utensils className="w-4 h-4" />
            </button>

            {/* Caregiver SOS Trigger */}
            <button
              onClick={() => setIsSOSModalOpen(true)}
              className="p-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20 active:scale-95 transition-all"
              title="Kontak Darurat Caregiver (SOS)"
            >
              <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Encrypted Security Modal Trigger */}
            <button
              onClick={() => setIsSecurityModalOpen(true)}
              className="hallmark-button-secondary p-2.5 text-xs text-teal-600 dark:text-teal-400 hidden sm:flex items-center gap-1.5"
              title="Keamanan AES-256 & Backup"
            >
              <Lock className="w-4 h-4" />
              <span className="hidden md:inline font-bold">Enkripsi</span>
            </button>

            {/* Profile Selector Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700">
              <select
                value={activeProfile?.id || ''}
                onChange={(e) => setActiveProfile(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none px-2 py-1 cursor-pointer"
              >
                {profiles.map((p) => (
                  <option key={p.id} value={p.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                    {p.avatar} {p.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => openProfileModal()}
                className="p-1 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
                title="Kelola Profil"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </header>

      <SecurityBackupModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
      />
      <SodiumTrackerModal
        isOpen={isSodiumModalOpen}
        onClose={() => setIsSodiumModalOpen(false)}
      />
      <FamilySOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
      />
    </>
  );
};
