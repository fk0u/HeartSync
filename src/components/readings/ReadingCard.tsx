import React from 'react';
import { BPReading } from '../../types/blood-pressure';
import { classifyBP } from '../../utils/bp-classifier';
import { formatDateIndonesian } from '../../utils/formatters';
import { playClickSound } from '../../utils/audio-fx';
import { Heart, Edit3, Trash2, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReadingCardProps {
  reading: BPReading;
  onEdit: (reading: BPReading) => void;
  onDelete: (id: number) => void;
}

export const ReadingCard: React.FC<ReadingCardProps> = ({ reading, onEdit, onDelete }) => {
  const category = classifyBP(reading.systolic, reading.diastolic);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 shadow-md hover:shadow-xl transition-all duration-200"
    >
      {/* Category Indicator Strip */}
      <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${category.colorClass}`}></div>

      <div className="pl-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Main Info */}
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            {/* BP Value */}
            <span className="text-xl font-black text-slate-900 dark:text-slate-100 font-mono">
              {reading.systolic} / {reading.diastolic}
              <span className="text-xs font-semibold text-slate-400 ml-1 font-sans">mmHg</span>
            </span>

            {/* Category Badge */}
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${category.badgeClass}`}>
              {category.label}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
            {/* Timestamp */}
            <span className="font-medium text-slate-600 dark:text-slate-300">
              {formatDateIndonesian(reading.timestamp)}
            </span>

            {/* Pulse */}
            <span className="flex items-center gap-1 font-semibold text-rose-500">
              <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
              {reading.pulse} BPM
            </span>

            {/* Position & Arm */}
            {reading.position && (
              <span className="capitalize text-[11px] bg-slate-105 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                {reading.position} • {reading.arm || 'kiri'}
              </span>
            )}
          </div>

          {/* Tags */}
          {reading.tags && reading.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {reading.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold bg-teal-55 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 px-2 py-0.5 rounded-md"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Notes */}
          {reading.notes && (
            <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-1 border-t border-slate-100 dark:border-slate-800/60">
              "{reading.notes}"
            </p>
          )}
        </div>

        {/* Action Buttons with click sound and active tap effect */}
        <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
          <button
            onClick={() => {
              playClickSound();
              onEdit(reading);
            }}
            className="p-2.5 rounded-xl text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-90"
            title="Edit Catatan"
          >
            <Edit3 className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => {
              playClickSound();
              reading.id && onDelete(reading.id);
            }}
            className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-90"
            title="Hapus Catatan"
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>
        </div>

      </div>
    </motion.div>
  );
};
