import React from 'react';
import { BPSummaryStats } from '../../types/blood-pressure';
import { classifyBP, classifyPulse, BP_CATEGORIES } from '../../utils/bp-classifier';
import { formatDateIndonesian } from '../../utils/formatters';
import { Activity, Heart, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardsProps {
  stats: BPSummaryStats;
  onOpenNewReading: () => void;
}

export const StatCards: React.FC<StatCardsProps> = ({ stats, onOpenNewReading }) => {
  const latest = stats.latestReading;
  const latestCategory = latest ? classifyBP(latest.systolic, latest.diastolic) : null;
  const pulseStatus = classifyPulse(stats.avgPulse);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      
      {/* Card 1: Latest Reading (Main Hero Widget) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="md:col-span-2 relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col justify-between"
      >
        {/* Background Subtle Gradient */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-gradient-to-bl from-teal-400/10 via-sky-400/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Pengukuran Terakhir
              </span>
            </div>

            {latest && (
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDateIndonesian(latest.timestamp)}
              </span>
            )}
          </div>

          {latest ? (
            <div className="mt-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                    {latest.systolic} / {latest.diastolic}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    mmHg
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {latest.pulse} BPM (Nadi)
                  </span>
                  {latest.position && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium capitalize">
                      {latest.position} • {latest.arm || 'kiri'}
                    </span>
                  )}
                </div>
              </div>

              {/* AHA Category Badge */}
              {latestCategory && (
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl text-xs font-bold border ${latestCategory.badgeClass} shadow-sm`}>
                    <span className={`w-2.5 h-2.5 rounded-full ${latestCategory.colorClass}`}></span>
                    {latestCategory.label}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6 py-6 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Belum ada data pengukuran tekanan darah untuk profil ini.
              </p>
              <button
                onClick={onOpenNewReading}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors"
              >
                Catat Tensi Pertama
              </button>
            </div>
          )}
        </div>

        {/* Recommendation Quote Tip */}
        {latestCategory && (
          <div className={`mt-5 p-3.5 rounded-2xl border ${latestCategory.bgLightClass} ${latestCategory.borderClass} flex items-start gap-3`}>
            <ShieldCheck className={`w-5 h-5 shrink-0 mt-0.5 ${latestCategory.textClass}`} />
            <div>
              <h5 className={`text-xs font-bold ${latestCategory.textClass}`}>
                Saran Kesehatan:
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                {latestCategory.recommendation}
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Card 2 & 3 Column: Period Average & Pulse Summary */}
      <div className="space-y-5 flex flex-col justify-between">
        
        {/* Average BP Widget */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-lg shadow-slate-200/40 dark:shadow-none"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Rata-rata Tekanan Darah
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {stats.avgSystolic || '--'} / {stats.avgDiastolic || '--'}
              </span>
              <span className="text-xs font-semibold text-slate-400 ml-1.5">mmHg</span>
            </div>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-lg">
              {stats.totalReadings} data
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-2">
            <span>Rentang Min - Max:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {stats.minSystolic || '-'}/{stats.minDiastolic || '-'} — {stats.maxSystolic || '-'}/{stats.maxDiastolic || '-'}
            </span>
          </div>
        </motion.div>

        {/* Heart Rate / Pulse Widget */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-lg shadow-slate-200/40 dark:shadow-none"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Rata-rata Denyut Nadi
            </span>
            <span className={`text-[11px] font-bold ${pulseStatus.color}`}>
              {pulseStatus.label}
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {stats.avgPulse || '--'}
            </span>
            <span className="text-xs font-semibold text-slate-400">BPM</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
