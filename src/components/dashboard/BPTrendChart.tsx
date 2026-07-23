import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { BPReading, DateFilterRange } from '../../types/blood-pressure';
import { useAppStore } from '../../store/useAppStore';
import { formatDateShort, formatTimeOnly } from '../../utils/formatters';
import { classifyBP } from '../../utils/bp-classifier';
import { HeartWaveCanvas } from '../effects/HeartWaveCanvas';
import { AdvancedMetricsModal } from '../analytics/AdvancedMetricsModal';
import { TrendingUp, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface BPTrendChartProps {
  readings: BPReading[];
}

export const BPTrendChart: React.FC<BPTrendChartProps> = ({ readings }) => {
  const dateFilter = useAppStore((state) => state.dateFilter);
  const setDateFilter = useAppStore((state) => state.setDateFilter);

  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);

  // Prepare chart data (reverse readings so chronological from oldest to newest)
  const chartData = [...readings].reverse().map((r) => ({
    id: r.id,
    dateStr: formatDateShort(r.timestamp),
    timeStr: formatTimeOnly(r.timestamp),
    systolic: r.systolic,
    diastolic: r.diastolic,
    pulse: r.pulse,
    rawReading: r
  }));

  const latestPulse = readings.length > 0 ? readings[0].pulse : 72;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const reading: BPReading = data.rawReading;
      const cat = classifyBP(reading.systolic, reading.diastolic);

      return (
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2 min-w-[180px]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {data.dateStr}, {data.timeStr}
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${cat.badgeClass}`}>
              {cat.label}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Sistolik:</span>
              <span className="font-extrabold text-sky-600 dark:text-sky-400">{reading.systolic} mmHg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Diastolik:</span>
              <span className="font-extrabold text-teal-600 dark:text-teal-400">{reading.diastolic} mmHg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Denyut Nadi:</span>
              <span className="font-semibold text-rose-500">{reading.pulse} BPM</span>
            </div>
          </div>

          {reading.notes && (
            <p className="text-[11px] text-slate-500 italic border-t border-slate-100 dark:border-slate-800 pt-1.5">
              "{reading.notes}"
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="hallmark-card p-6 space-y-4 relative overflow-hidden"
      >
        {/* Real-time ECG Pulse Wave Canvas background bar */}
        <div className="h-8 w-full opacity-40 overflow-hidden -mt-2">
          <HeartWaveCanvas bpm={latestPulse} />
        </div>

        {/* Header & Date Filter Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                Grafik Tren Tekanan Darah Real
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monitoring Sistolik &amp; Diastolik seiring waktu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Advanced Analytics Trigger Button */}
            <button
              onClick={() => setIsAnalyticsModalOpen(true)}
              className="hallmark-button-secondary px-3 py-1.5 text-xs inline-flex items-center gap-1.5 text-teal-600 dark:text-teal-400"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Analisis Vaskular
            </button>

            {/* Date Filter Buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              {(['7days', '30days', '90days', 'all'] as DateFilterRange[]).map((range) => {
                const labels: Record<string, string> = {
                  '7days': '7 Hari',
                  '30days': '30 Hari',
                  '90days': '90 Hari',
                  'all': 'Semua'
                };
                const isSelected = dateFilter === range;

                return (
                  <button
                    key={range}
                    onClick={() => setDateFilter(range)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      isSelected
                        ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {labels[range]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chart Canvas */}
        {chartData.length > 0 ? (
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="sysGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="diaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.15} />
                <XAxis
                  dataKey="dateStr"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[50, 200]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />

                {/* Threshold Lines for AHA Normal */}
                <ReferenceLine y={120} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Batas Sistolik 120', fill: '#f59e0b', fontSize: 10, position: 'right' }} />
                <ReferenceLine y={80} stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Batas Diastolik 80', fill: '#10b981', fontSize: 10, position: 'right' }} />

                <Area type="monotone" dataKey="systolic" stroke="none" fill="url(#sysGradient)" />
                <Area type="monotone" dataKey="diastolic" stroke="none" fill="url(#diaGradient)" />

                <Line
                  type="monotone"
                  dataKey="systolic"
                  name="Sistolik (mmHg)"
                  stroke="#0284c7"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#0284c7', strokeWidth: 2, stroke: '#ffffff' }}
                  activeDot={{ r: 7, fill: '#0284c7', strokeWidth: 2, stroke: '#ffffff' }}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  name="Diastolik (mmHg)"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#ffffff' }}
                  activeDot={{ r: 7, fill: '#10b981', strokeWidth: 2, stroke: '#ffffff' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <Calendar className="w-8 h-8 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
              Belum Ada Data Pengukuran untuk Dibarisi Grafik
            </p>
            <p className="text-xs text-slate-400 max-w-xs">
              Mulai masukkan catatan tensi pertama Anda untuk melihat kurva tren visual interaktif.
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-500"></span>
            <span className="text-slate-700 dark:text-slate-300">Sistolik (Tekanan Atas)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-slate-700 dark:text-slate-300">Diastolik (Tekanan Bawah)</span>
          </div>
        </div>
      </motion.div>

      <AdvancedMetricsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
      />
    </>
  );
};
