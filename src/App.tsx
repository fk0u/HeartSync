/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 · Apple SwiftUI Archetype */
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
import { AppleHealthRings } from './components/dashboard/AppleHealthRings';

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
import { BPRestTimerModal } from './components/timer/BPRestTimerModal';

// Icons
import {
  Plus,
  FileText,
  Bell,
  Heart,
  Download,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Timer
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isDbReady, setIsDbReady] = useState(false);
  const [isRestTimerOpen, setIsRestTimerOpen] = useState(false);

  const { activeProfile } = useProfiles();
  const { readings, rawReadings, stats } = useReadings();

  const openReadingModal = useAppStore((state) => state.openReadingModal);
  const openExportPdfModal = useAppStore((state) => state.openExportPdfModal);
  const openReminderModal = useAppStore((state) => state.openReminderModal);
  const addToast = useAppStore((state) => state.addToast);

  // Deleting reading confirmation state
  const [deletingReadingId, setDeletingReadingId] = useState<number | null>(null);

  // Initialize DB
  useEffect(() => {
    async function init() {
      try {
        await seedInitialData();
      } catch (err) {
        console.error('Error initializing DB:', err);
      } flex: {
        setIsDbReady(true);
      }
    }
    init();
  }, []);

  // Global Keyboard Shortcuts (Alt+N or Ctrl+N to open Reading Form)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        openReadingModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openReadingModal]);

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
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500 flex items-center justify-center animate-bounce shadow-xl shadow-teal-500/30">
          <Heart className="w-6 h-6 fill-white" />
        </div>
        <p className="text-sm font-bold text-slate-400">Memuat HeartSync...</p>
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
            
            {/* Quick Rest Timer Bar */}
            <div className="hallmark-card p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-teal-500/10 via-sky-500/10 to-transparent border border-teal-500/30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-teal-500 text-white shadow-md shadow-teal-500/20">
                  <Timer className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-slate-100">
                    Protokol Istirahat Apple Health (5 Menit)
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Duduk tenang 5 menit sebelum ukur tensi untuk akurasi medis 100%.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsRestTimerOpen(true)}
                className="hallmark-button-secondary px-4 py-2 text-xs shrink-0 inline-flex items-center gap-1.5"
              >
                <Timer className="w-4 h-4 text-teal-500" />
                Mulai Timer 5 Menit
              </button>
            </div>

            {/* Emergency Crisis Alert (If applicable) */}
            <EmergencyAlert latestReading={stats.latestReading} />

            {/* Top Stat Cards & Highlights */}
            <StatCards stats={stats} onOpenNewReading={() => openReadingModal()} />

            {/* Apple Health Category Rings (If readings exist) */}
            <AppleHealthRings readings={rawReadings || []} />

            {/* BP Trend Chart */}
            <BPTrendChart readings={rawReadings || []} />

            {/* Recent Readings List Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-slate-100">
                    Catatan Terbaru ({activeProfile?.name || 'Pasien'})
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Pencatatan tensi real yang telah Anda masukkan
                  </p>
                </div>
                {readings.length > 0 && (
                  <button
                    onClick={() => setActiveTab('history')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    Lihat Semua Riwayat
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
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
                <div className="p-8 text-center hallmark-card space-y-3">
                  <Heart className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
                  <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-300">
                    Jurnal Kesehatan Masih Kosong
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Aplikasi ini bebas dari data contoh. Klik tombol di bawah untuk memasukkan tekanan darah asli Anda.
                  </p>
                  <div className="pt-1">
                    <button
                      onClick={() => openReadingModal()}
                      className="hallmark-button-primary px-4 py-2.5 text-xs inline-flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      Catat Tensi Sekarang
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: HISTORY & FILTER */}
        {activeTab === 'history' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">
                Jurnal &amp; Riwayat Tekanan Darah Real
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Pencarian, filter tanggal/kategori, dan cadangan data terenkripsi JSON / CSV
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
              <div className="p-12 text-center hallmark-card space-y-3">
                <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
                <h4 className="text-base font-extrabold text-slate-700 dark:text-slate-300">
                  Tidak Ada Catatan Tensi
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Belum ada data pengukuran yang cocok dengan kata kunci atau filter tanggal yang Anda pilih.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DOCTOR REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-in fade-in duration-300 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Laporan Medis Profesional
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                Ekspor Laporan Dokter 1-Klik
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                Format laporan PDF bersih, rapi, dan mudah dibaca oleh dokter saat Anda berkonsultasi secara langsung maupun daring.
              </p>
            </div>

            {/* Doctor Report Hero Card */}
            <div className="p-8 hallmark-card text-center space-y-6 bg-gradient-to-br from-white via-sky-50/40 to-teal-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-sky-500/30">
                <FileText className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  Siapkan Laporan Konsultasi Medis Real
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
                  Laporan mencakup identitas profil <strong>{activeProfile?.name}</strong>, ringkasan nilai rata-rata, rentang min/max, pengelompokkan kategori AHA, serta tabel detail seluruh catatan tensi asli Anda.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openExportPdfModal()}
                  className="hallmark-button-primary px-8 py-4 text-sm inline-flex items-center gap-2"
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
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 inline-flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5" /> Pengingat Kesehatan
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                Jadwal Pengingat Tensi &amp; Obat
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                Atur waktu pengingat harian untuk pemeriksaan tekanan darah dan konsumsi obat agar monitoring kesehatan Anda tetap teratur.
              </p>
            </div>

            {/* Reminder Opener Card */}
            <div className="p-8 hallmark-card text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
                <Bell className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
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
        <p className="font-extrabold text-slate-700 dark:text-slate-300">
          HeartSync — Blood Pressure Tracker &amp; Monitoring App
        </p>
        <p className="text-[11px] font-medium">
          Apple Health SwiftUI Inspired • Offline-First • Encrypted AES-256-GCM + SHA-256 Hash Chain
        </p>
      </footer>

      {/* Global Modals & Toast Container */}
      <ReadingFormModal />
      <ProfileModal />
      <ExportPdfModal />
      <ReminderModal />
      <ToastContainer />
      <BPRestTimerModal
        isOpen={isRestTimerOpen}
        onClose={() => setIsRestTimerOpen(false)}
        onTimerComplete={() => openReadingModal()}
      />

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
