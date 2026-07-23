import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useProfiles } from '../../hooks/useProfiles';
import { db } from '../../db';
import { classifyBP } from '../../utils/bp-classifier';
import { BodyPosition, ArmUsed } from '../../types/blood-pressure';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Heart, Calendar, Clock, Tag, MessageSquare, Check } from 'lucide-react';
import { format } from 'date-fns';

export const ReadingFormModal: React.FC = () => {
  const isOpen = useAppStore((state) => state.isReadingModalOpen);
  const editingReading = useAppStore((state) => state.editingReading);
  const closeModal = useAppStore((state) => state.closeReadingModal);
  const addToast = useAppStore((state) => state.addToast);
  const { activeProfileId } = useProfiles();

  // Local form states
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [pulse, setPulse] = useState(72);
  const [dateStr, setDateStr] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [timeStr, setTimeStr] = useState(format(new Date(), 'HH:mm'));
  const [position, setPosition] = useState<BodyPosition>('duduk');
  const [arm, setArm] = useState<ArmUsed>('kiri');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Bangun Tidur']);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available tag choices
  const availableTags = [
    'Bangun Tidur',
    'Sebelum Obat',
    'Sesudah Obat',
    'Pasca Olahraga',
    'Stres',
    'Santai',
    'Sebelum Tidur',
    'Setelah Makan'
  ];

  useEffect(() => {
    if (editingReading) {
      setSystolic(editingReading.systolic);
      setDiastolic(editingReading.diastolic);
      setPulse(editingReading.pulse);
      const dateObj = new Date(editingReading.timestamp);
      setDateStr(format(dateObj, 'yyyy-MM-dd'));
      setTimeStr(format(dateObj, 'HH:mm'));
      setPosition(editingReading.position || 'duduk');
      setArm(editingReading.arm || 'kiri');
      setSelectedTags(editingReading.tags || []);
      setNotes(editingReading.notes || '');
    } else {
      setSystolic(120);
      setDiastolic(80);
      setPulse(72);
      setDateStr(format(new Date(), 'yyyy-MM-dd'));
      setTimeStr(format(new Date(), 'HH:mm'));
      setPosition('duduk');
      setArm('kiri');
      setSelectedTags(['Bangun Tidur']);
      setNotes('');
    }
  }, [editingReading, isOpen]);

  // Real-time BP Classification Preview
  const currentCategory = classifyBP(systolic, diastolic);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProfileId) {
      addToast({ type: 'error', title: 'Gagal Simpan', message: 'Tidak ada profil aktif.' });
      return;
    }

    try {
      setIsSubmitting(true);
      const timestampIso = new Date(`${dateStr}T${timeStr}:00`).toISOString();

      if (editingReading && editingReading.id) {
        await db.readings.update(editingReading.id, {
          systolic,
          diastolic,
          pulse,
          timestamp: timestampIso,
          position,
          arm,
          tags: selectedTags,
          notes
        });
        addToast({
          type: 'success',
          title: 'Berhasil Diperbarui',
          message: `Catatan tensi ${systolic}/${diastolic} mmHg telah diperbarui.`
        });
      } else {
        await db.readings.add({
          profileId: activeProfileId,
          systolic,
          diastolic,
          pulse,
          timestamp: timestampIso,
          position,
          arm,
          tags: selectedTags,
          notes
        });
        addToast({
          type: 'success',
          title: 'Berhasil Disimpan',
          message: `Tensi ${systolic}/${diastolic} mmHg tersimpan di jurnal kesehatan.`
        });
      }

      closeModal();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Terjadi Kesalahan',
        message: 'Gagal menyimpan catatan tekanan darah.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              {editingReading ? 'Edit Catatan Tensi' : 'Catat Tekanan Darah'}
            </h3>
            <button
              onClick={closeModal}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-6 flex-1">
            
            {/* Live Category Preview Badge */}
            <div className={`p-4 rounded-2xl border ${currentCategory.bgLightClass} ${currentCategory.borderClass} flex items-center justify-between transition-colors duration-300`}>
              <div className="flex items-center gap-3">
                <span className={`w-3.5 h-3.5 rounded-full ${currentCategory.colorClass} animate-pulse`}></span>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Klasifikasi AHA:</span>
                  <div className={`text-sm font-extrabold ${currentCategory.textClass}`}>
                    {currentCategory.label}
                  </div>
                </div>
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-slate-100">
                {systolic} / {diastolic}
              </span>
            </div>

            {/* Systolic & Diastolic Steppers / Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Systolic Control */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                    Sistolik (Atas)
                  </label>
                  <span className="text-[10px] text-slate-400 font-semibold">mmHg</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSystolic((s) => Math.max(60, s - 1))}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-lg shadow-sm hover:bg-slate-100 active:scale-90 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={systolic}
                    onChange={(e) => setSystolic(Number(e.target.value))}
                    min={50}
                    max={250}
                    className="w-20 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setSystolic((s) => Math.min(250, s + 1))}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-lg shadow-sm hover:bg-slate-100 active:scale-90 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-center gap-1.5 pt-1">
                  {[-5, +5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSystolic((s) => Math.min(250, Math.max(50, s + val)))}
                      className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                    >
                      {val > 0 ? `+${val}` : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Diastolic Control */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    Diastolik (Bawah)
                  </label>
                  <span className="text-[10px] text-slate-400 font-semibold">mmHg</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setDiastolic((d) => Math.max(40, d - 1))}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-lg shadow-sm hover:bg-slate-100 active:scale-90 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={diastolic}
                    onChange={(e) => setDiastolic(Number(e.target.value))}
                    min={40}
                    max={150}
                    className="w-20 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setDiastolic((d) => Math.min(150, d + 1))}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-lg shadow-sm hover:bg-slate-100 active:scale-90 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-center gap-1.5 pt-1">
                  {[-5, +5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setDiastolic((d) => Math.min(150, Math.max(40, d + val)))}
                      className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                    >
                      {val > 0 ? `+${val}` : val}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Pulse Rate Control */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                  <Heart className="w-5 h-5 fill-rose-500/20" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Denyut Nadi (Pulse)
                  </div>
                  <div className="text-[10px] text-slate-400">Detak per menit (BPM)</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPulse((p) => Math.max(40, p - 1))}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-sm shadow-sm"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  value={pulse}
                  onChange={(e) => setPulse(Number(e.target.value))}
                  min={30}
                  max={220}
                  className="w-14 text-center text-xl font-bold text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPulse((p) => Math.min(220, p + 1))}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-sm shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Date & Time Selectors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Tanggal
                </label>
                <input
                  type="date"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Waktu
                </label>
                <input
                  type="time"
                  value={timeStr}
                  onChange={(e) => setTimeStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            {/* Body Position & Arm Selectors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                  Posisi Tubuh
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {(['duduk', 'baring', 'berdiri'] as BodyPosition[]).map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setPosition(pos)}
                      className={`py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                        position === pos
                          ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                  Lengan Diukur
                </label>
                <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {(['kiri', 'kanan'] as ArmUsed[]).map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setArm(a)}
                      className={`py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                        arm === a
                          ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mood & Activity Tags */}
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Label Kondisi / Aktivitas
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                        isSelected
                          ? 'bg-teal-500 text-white font-semibold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Catatan Tambahan (Opsional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Terasa sedikit pusing setelah berjalan jam 12 siang..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-bold text-sm shadow-xl shadow-teal-500/25 active:scale-98 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Menyimpan...' : editingReading ? 'Simpan Perubahan' : 'Simpan Catatan Tensi'}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
