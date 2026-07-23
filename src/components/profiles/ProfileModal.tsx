import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useProfiles } from '../../hooks/useProfiles';
import { db } from '../../db';
import { Profile, RelationshipType } from '../../types/blood-pressure';
import { getRelationshipLabel } from '../../utils/formatters';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Edit3, Trash2, Check, User } from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';

export const ProfileModal: React.FC = () => {
  const isOpen = useAppStore((state) => state.isProfileModalOpen);
  const closeModal = useAppStore((state) => state.closeProfileModal);
  const addToast = useAppStore((state) => state.addToast);
  const { profiles, activeProfile, switchProfile } = useProfiles();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<RelationshipType>('self');
  const [avatar, setAvatar] = useState('👨‍💼');
  const [age, setAge] = useState<number | ''>(45);
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [targetSystolic, setTargetSystolic] = useState(120);
  const [targetDiastolic, setTargetDiastolic] = useState(80);
  const [notes, setNotes] = useState('');

  // Delete confirm state
  const [deletingProfileId, setDeletingProfileId] = useState<string | null>(null);

  const avatarOptions = ['👨‍💼', '👵', '👴', '👩‍⚕️', '👨‍👩‍👧', '🧍‍♂️', '🧍‍♀️', '❤️'];

  const resetForm = () => {
    setName('');
    setRelationship('self');
    setAvatar('👨‍💼');
    setAge(45);
    setGender('male');
    setTargetSystolic(120);
    setTargetDiastolic(80);
    setNotes('');
    setIsAddingNew(false);
    setEditingProfile(null);
  };

  const handleStartEdit = (p: Profile) => {
    setEditingProfile(p);
    setName(p.name);
    setRelationship(p.relationship);
    setAvatar(p.avatar);
    setAge(p.age || '');
    setGender(p.gender || 'male');
    setTargetSystolic(p.targetSystolic);
    setTargetDiastolic(p.targetDiastolic);
    setNotes(p.notes || '');
    setIsAddingNew(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingProfile) {
        await db.profiles.update(editingProfile.id, {
          name,
          relationship,
          avatar,
          age: age === '' ? undefined : Number(age),
          gender,
          targetSystolic,
          targetDiastolic,
          notes
        });
        addToast({ type: 'success', title: 'Profil Diperbarui', message: `Profil ${name} telah diperbarui.` });
      } else {
        const newId = `profile-${Date.now()}`;
        await db.profiles.add({
          id: newId,
          name,
          relationship,
          avatar,
          age: age === '' ? undefined : Number(age),
          gender,
          targetSystolic,
          targetDiastolic,
          notes,
          createdAt: new Date().toISOString()
        });
        switchProfile(newId);
        addToast({ type: 'success', title: 'Profil Baru Ditambahkan', message: `Profil ${name} telah dibuat & diaktifkan.` });
      }
      resetForm();
    } catch (error) {
      addToast({ type: 'error', title: 'Gagal Menyimpan', message: 'Terjadi kesalahan saat menyimpan profil.' });
    }
  };

  const handleDeleteProfile = async () => {
    if (!deletingProfileId) return;
    try {
      if (profiles.length <= 1) {
        addToast({ type: 'warning', title: 'Tidak Bisa Dihapus', message: 'Minimal harus ada 1 profil tersisa.' });
        setDeletingProfileId(null);
        return;
      }

      await db.profiles.delete(deletingProfileId);
      await db.readings.where('profileId').equals(deletingProfileId).delete();

      if (activeProfile?.id === deletingProfileId) {
        const remaining = profiles.filter((p) => p.id !== deletingProfileId);
        if (remaining.length > 0) switchProfile(remaining[0].id);
      }

      addToast({ type: 'success', title: 'Profil Dihapus', message: 'Profil dan seluruh riwayatnya telah dihapus.' });
    } catch (error) {
      addToast({ type: 'error', title: 'Gagal Hapus', message: 'Tidak dapat menghapus profil.' });
    } finally {
      setDeletingProfileId(null);
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
          className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Kelola Profil Pengguna
              </h3>
            </div>
            <button
              onClick={() => {
                resetForm();
                closeModal();
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 overflow-y-auto space-y-5 flex-1">
            
            {/* View / Edit Mode Selector */}
            {!isAddingNew ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Daftar Profil Terdaftar ({profiles.length})
                  </span>
                  <button
                    onClick={() => {
                      resetForm();
                      setIsAddingNew(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Tambah Profil
                  </button>
                </div>

                {/* Profiles Cards List */}
                <div className="space-y-2">
                  {profiles.map((p) => {
                    const isActive = p.id === activeProfile?.id;
                    return (
                      <div
                        key={p.id}
                        className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                          isActive
                            ? 'bg-teal-50/80 dark:bg-teal-950/40 border-teal-500/40 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div
                          onClick={() => switchProfile(p.id)}
                          className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                        >
                          <span className="text-2xl">{p.avatar}</span>
                          <div className="truncate">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate">
                                {p.name}
                              </h4>
                              {isActive && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500 text-white">
                                  Aktif
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {getRelationshipLabel(p.relationship)} • Usia: {p.age || '-'} • Target: &lt;{p.targetSystolic}/{p.targetDiastolic} mmHg
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleStartEdit(p)}
                            className="p-2 rounded-xl text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                            title="Edit Profil"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {profiles.length > 1 && (
                            <button
                              onClick={() => setDeletingProfileId(p.id)}
                              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                              title="Hapus Profil"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Add / Edit Profile Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {editingProfile ? `Edit Profil: ${editingProfile.name}` : 'Tambah Profil Anggota Keluarga'}
                  </h4>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    Batal
                  </button>
                </div>

                {/* Avatar Options */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 block">
                    Pilih Avatar Icon
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {avatarOptions.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setAvatar(emoji)}
                        className={`w-10 h-10 rounded-2xl text-xl flex items-center justify-center transition-all ${
                          avatar === emoji
                            ? 'bg-teal-100 dark:bg-teal-950 border-2 border-teal-500 scale-105'
                            : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                    Nama Lengkap / Panggilan
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Ibu Maryam / Ayah Hendra"
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                {/* Relationship & Age */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                      Hubungan Keluarga
                    </label>
                    <select
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                    >
                      <option value="self">Saya Sendiri</option>
                      <option value="parent">Orang Tua (Ibu / Ayah)</option>
                      <option value="spouse">Pasangan (Suami / Istri)</option>
                      <option value="child">Anak</option>
                      <option value="other">Keluarga Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                      Usia (Tahun)
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="Contoh: 65"
                      min={1}
                      max={120}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Target Blood Pressure */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <div>
                    <label className="text-[11px] font-bold text-sky-600 dark:text-sky-400 block mb-1">
                      Target Sistolik (&lt; mmHg)
                    </label>
                    <input
                      type="number"
                      value={targetSystolic}
                      onChange={(e) => setTargetSystolic(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 font-bold text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-teal-600 dark:text-teal-400 block mb-1">
                      Target Diastolik (&lt; mmHg)
                    </label>
                    <input
                      type="number"
                      value={targetDiastolic}
                      onChange={(e) => setTargetDiastolic(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 font-bold text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                    Catatan Medis Profil (Opsional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Contoh: Memiliki riwayat alergi obat tertentu, rutin minum Amlodipine..."
                    rows={2}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md"
                  >
                    Simpan Profil
                  </button>
                </div>
              </form>
            )}

          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingProfileId)}
        title="Hapus Profil Pengguna?"
        message="Apakah Anda yakin ingin menghapus profil ini beserta seluruh data riwayat tekanan darahnya? Aksi ini tidak dapat dibatalkan."
        isDangerous={true}
        confirmText="Ya, Hapus Permanen"
        onConfirm={handleDeleteProfile}
        onCancel={() => setDeletingProfileId(null)}
      />
    </AnimatePresence>
  );
};
