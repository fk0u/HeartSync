import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Bell, FileText, Settings, UserRound, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { playClickSound } from '../../utils/audio-fx';

export const MobileToolsSheet: React.FC = () => {
  const navigate = useNavigate();
  const isOpen = useAppStore((state) => state.isMobileToolsSheetOpen);
  const closeSheet = useAppStore((state) => state.closeMobileToolsSheet);
  const openReadingModal = useAppStore((state) => state.openReadingModal);
  const openProfileModal = useAppStore((state) => state.openProfileModal);
  const openReminderModal = useAppStore((state) => state.openReminderModal);
  const openExportPdfModal = useAppStore((state) => state.openExportPdfModal);

  const goTo = (to: '/profile' | '/settings' | '/reports' | '/reminders' | '/') => {
    playClickSound();
    closeSheet();
    navigate({ to });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Tutup menu"
            className="fixed inset-0 z-[60] bg-slate-950/55 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => {
              playClickSound();
              closeSheet();
            }}
          />

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label="Menu tambahan mobile"
            className="fixed inset-x-0 bottom-0 z-[70] md:hidden px-3 pb-3"
            initial={{ y: 32, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 32, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.9 }}
          >
            <div className="mx-auto max-w-md rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white/96 dark:bg-slate-900/96 backdrop-blur-2xl shadow-2xl shadow-slate-950/25 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Lainnya</p>
                  <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">Aksi Cepat Thumb-Zone</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    closeSheet();
                  }}
                  className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-200 active:scale-95 transition-all"
                  aria-label="Tutup menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    closeSheet();
                    openProfileModal();
                  }}
                  className="min-h-[88px] rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-start justify-between p-4 text-left active:scale-95 transition-all"
                >
                  <UserRound className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100">Profil</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Kelola anggota</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => goTo('/settings')}
                  className="min-h-[88px] rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-start justify-between p-4 text-left active:scale-95 transition-all"
                >
                  <Settings className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100">Pengaturan</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Tema, PWA, backup</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    closeSheet();
                    openReminderModal();
                  }}
                  className="min-h-[88px] rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-start justify-between p-4 text-left active:scale-95 transition-all"
                >
                  <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100">Pengingat</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Atur jadwal</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    closeSheet();
                    openExportPdfModal();
                  }}
                  className="min-h-[88px] rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-start justify-between p-4 text-left active:scale-95 transition-all"
                >
                  <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100">Laporan</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">PDF dokter</p>
                  </div>
                </button>
              </div>

              <div className="px-4 pb-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    closeSheet();
                    openReadingModal();
                  }}
                  className="min-h-12 rounded-2xl bg-gradient-to-r from-teal-500 to-sky-500 text-white font-extrabold text-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Catat Tensi
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => goTo('/')}
                  className="min-h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-sm active:scale-95 transition-all"
                >
                  Dashboard
                </button>
              </div>
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
};
