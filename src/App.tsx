import React, { useEffect, useState } from 'react';
import { seedInitialData, db } from './db';
import { useProfiles } from './hooks/useProfiles';
import { useReadings } from './hooks/useReadings';
import { useAppStore } from './store/useAppStore';

// Layout
import { Header } from './components/layout/Header';
import { Navigation, NavTab } from './components/layout/Navigation';

// Dashboard Components
import { StatCards } from './components/dashboard/StatCards';
import { BPTrendChart } from './components/dashboard/BPTrendChart';
import { EmergencyAlert } from './components/dashboard/EmergencyAlert';

// Readings Components
import { ReadingCard } from './components/readings/ReadingCard';
import { HistoryFilter } from './components/readings/HistoryFilter';
import { ReadingFormModal } from './components/readings/ReadingFormModal';

// Modals & Common
import { ProfileModal } from './components/profiles/ProfileModal';
import { ExportPdfModal } from './components/reports/ExportPdfModal';
import { ReminderModal } from './components/reminders/ReminderModal';
import { ToastContainer } from './components/common/Toast';
import { ConfirmModal } from './components/common/ConfirmModal';

// Icons
import {
  Plus,
  FileText,
  Bell,
  Heart,
  TrendingUp,
  Download,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { BPReading } from './types/blood-pressure';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isDbReady, setIsDbReady] = useState(false);

  const { activeProfile } = useProfiles();
  const { readings, rawReadings, stats, hasData } = useReadings();

  const openReadingModal = useAppStore((state) => state.openReadingModal);
  const openExportPdfModal = useAppStore((state) => state.openExportPdfModal);
  const openReminderModal = useAppStore((state) => state.openReminderModal);
  const openProfileModal = useAppStore((state) => state.openProfileModal);
  const addToast = useAppStore((state) => state.addToast);

  // Deleting reading confirmation state
  const [deletingReadingId, setDeletingReadingId] = useState<number | null>(null);

  // Initialize DB & Seed initial sample data
  useEffect(() => {
    async function init() {
      try {
        await seedInitialData();
      } catch (err) {
        console.error('Error seeding DB:', err);
      } finally {
        setIsDbReady(true);
      }
    }
    init();
  }, []);

  const handleDeleteReading = async () => {
    if (!deletingReadingId) return;
    try {
      await db.readings.delete(deletingReadingId);
      addToast({
        type: 'success',
        title: 'Data Dihapus',
        message: 'Catatan tekanan darah berhasil dihapus.'
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Gagal Menghapus',
        message: 'Terjadi kesalahan saat menghapus data.'
      });
    } finally {
      setDeletingReadingId(null);
    }
  };

  if (!isDbReady) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500 flex items-center justify-center animate-bounce shadow-xl shadow-teal-500/30">
          <Heart className="w-6 h-6 fill-white" />
        </div>
        <p className="text-sm font-semibold text-slate-400">Memuat HeartSync...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col pb-24 md:pb-12">
      
      {/* Header */}
      <Header />

      {/* Navigation Bar */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Emergency Crisis Alert (If applicable) */}
            <EmergencyAlert latestReading={stats.latestReading} />

            {/* Top Stat Cards & Highlights */}
            <StatCards stats={stats} onOpenNewReading={() => openReadingModal()} />

            {/* BP Trend Chart */}
            <BPTrendChart readings={rawReadings || []} />

            {/* Recent Readings List Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Catatan Terbaru ({activeProfile?.name || 'Pasien'})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Entri pengukuran tensi terkini
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('history')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  Lihat Semua Riwayat
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {readings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {readings.slice(0, 4).map((r) => (
                    <ReadingCard
                      key={r.id}
                      reading={r}
                      onEdit={(readingToEdit) => openReadingModal(readingToEdit)}
                      onDelete={(id) => setDeletingReadingId(id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <Heart className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Belum ada riwayat pengukuran tekanan darah.
                  </p>
                  <button
                    onClick={() => openReadingModal()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Catat Tensi Sekarang
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: HISTORY & FILTER */}
        {activeTab === 'history' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                Jurnal & Riwayat Tekanan Darah
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Pencarian, filter tanggal/kategori, dan cadangan data CSV
              </p>
            </div>

            {/* Filter Bar */}
            <HistoryFilter />

            {/* Filtered Readings List */}
            {readings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {readings.map((r) => (
                  <ReadingCard
                    key={r.id}
                    reading={r}
                    onEdit={(readingToEdit) => openReadingModal(readingToEdit)}
                    onDelete={(id) => setDeletingReadingId(id)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
                <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
                  Data Tidak Ditemukan
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Tidak ada catatan yang sesuai dengan kata kunci pencarian atau filter tanggal yang Anda pilih.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DOCTOR REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Laporan Medis Profesional
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                Ekspor Laporan Dokter 1-Klik
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                Format laporan PDF bersih, rapi, dan mudah dibaca oleh dokter saat Anda berkonsultasi secara langsung maupun daring.
              </p>
            </div>

            {/* Doctor Report Hero Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white via-sky-50/50 to-teal-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-sky-500/30">
                <FileText className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  Siapkan Laporan Konsultasi Medis
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
                  Laporan akan mencakup nama profil <strong>{activeProfile?.name}</strong>, ringkasan nilai rata-rata, rentang min/max, pengelompokkan kategori AHA, serta tabel detail seluruh catatan tensi.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openExportPdfModal()}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-sky-500/30 active:scale-95 transition-all inline-flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Buka Generator Laporan PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: REMINDERS & SCHEDULES */}
        {activeTab === 'reminders' && (
          <div className="space-y-6 animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 inline-flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5" /> Pengingat Kesehatan
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                Jadwal Pengingat Tensi &amp; Obat
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                Atur waktu pengingat harian untuk pemeriksaan tekanan darah dan konsumsi obat agar monitoring kesehatan tetap teratur.
              </p>
            </div>

            {/* Reminder Opener Card */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
                <Bell className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  Kelola Jadwal Pengingat Pasien
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Pengingat akan membunyikan notifikasi lokal browser di waktu yang disesuaikan.
                </p>
              </div>

              <div>
                <button
                  onClick={() => openReminderModal()}
                  className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Atur Jadwal Pengingat
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200/80 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          HeartSync — Blood Pressure Tracker &amp; Monitoring App
        </p>
        <p className="text-[11px]">
          100% Offline-First • Data Disimpan Aman di Perangkat Anda (IndexedDB)
        </p>
      </footer>

      {/* Global Modals & Toast Container */}
      <ReadingFormModal />
      <ProfileModal />
      <ExportPdfModal />
      <ReminderModal />
      <ToastContainer />

      {/* Delete Reading Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingReadingId)}
        title="Hapus Catatan Pengukuran?"
        message="Apakah Anda yakin ingin menghapus catatan tekanan darah ini? Data yang dihapus tidak dapat dikembalikan."
        isDangerous={true}
        confirmText="Ya, Hapus Catatan"
        onConfirm={handleDeleteReading}
        onCancel={() => setDeletingReadingId(null)}
      />
    </div>
  );
}
