<div align="center">

# 🩺 HeartSync — Blood Pressure Tracker & Monitoring PWA

<p align="center">
  <b>Aplikasi Pencatatan & Monitoring Tekanan Darah Offline-First, Powerful, Ramah Lansia & Keluarga</b>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg)](https://opensource.org/licenses/MIT)
[![React 18](https://img.shields.io/badge/React-18.3.1-0284c7.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Dexie.js](https://img.shields.io/badge/Dexie.js-IndexedDB-f59e0b.svg)](https://dexie.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline-purple.svg)](https://web.dev/progressive-web-apps/)

[✨ Fitur Utama](#-fitur-utama) •
[📐 Klasifikasi AHA/WHO](#-standar-klasifikasi-tekanan-darah-ahawho) •
[🏛️ Arsitektur](#-arsitektur--teknologi) •
[🚀 Setup Lokal](#-panduan-instalasi--pengembangan-lokal) •
[🌐 Deploy Vercel](#-panduan-deployment-ke-vercel) •
[📄 Dokumentasi PDF](#-dokumentasi-lengkap-pdf)

---

</div>

## 📌 Visi Produk & Latar Belakang

**HeartSync** diciptakan dengan filosofi **"Notion untuk Pencatatan Tekanan Darah"** — sebuah aplikasi Progressive Web App (PWA) modern yang tenang, profesional, dan *empowering*. Target penggunanya mencakup:
- **Pasien Hipertensi (Dewasa 30-70+ tahun)** yang membutuhkan pemantauan tensi harian secara mandiri dan disiplin.
- **Anggota Keluarga & Caregiver (Anak/Pasangan)** yang membantu mengawasi dan mengelola catatan kesehatan orang tua.
- **Kombinasi Pengguna Tech-Savvy & Awam (Lansia)** — dilengkapi antarmuka dengan ukuran teks scalable, tombol angka besar, serta kontras tinggi yang ramah pembaca lansia.

Data kesehatan pengguna disimpan **100% di perangkat lokal (Offline-First via IndexedDB)**. Tidak ada server eksternal yang menyimpan riwayat tensi Anda, menjamin privasi dan keamanan data secara absolut.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| 👥 **Multi-Profil Pasien** | Kelola beberapa profil sekaligus (diri sendiri, orang tua, pasangan, anak). Switch profil cepat 1-klik dengan avatar & target tensi individual. |
| 🎯 **Smart AHA/WHO Engine** | Deteksi & pengklasifikasian kategori tekanan darah otomatis (Normal, Elevated, Stage 1, Stage 2, Crisis) beserta rekomendasi klinis kontekstual. |
| ⚡ **Frictionless Input** | Input tensi cepat dalam 2-3 ketukan. Stepper angka besar (`+`/`-`), pilihan posisi tubuh (*Duduk, Baring, Berdiri*), arm selector, tag aktivitas, & catatan harian. |
| 📊 **Dashboard Tren Interactive** | Kurva tren Sistolik & Diastolik interaktif (Recharts) 7/30/90 hari dengan indikator batas acuan normal. |
| 📄 **1-Click PDF Doctor Report** | Generator dokumen PDF resmi untuk konsultasi dokter, berisi identitas pasien, statistik rata-rata, tabel riwayat lengkap, & area evaluasi medis. |
| 🔔 **Jadwal Pengingat Lokal** | Notifikasi browser untuk jadwal rutin pengukuran tensi dan jam konsumsi obat harian. |
| 💾 **Backup & Restore CSV** | Ekspor dan impor file CSV untuk cadangan data cadangan fisik pengguna. |
| 📱 **PWA Standalone & Offline** | 100% berfungsi tanpa jaringan internet (Service Worker). Dapat di-install ke layar utama Android, iOS, Windows, & Mac. |

---

## 📐 Standar Klasifikasi Tekanan Darah (AHA/WHO)

HeartSync menggunakan algoritma penilaian tekanan darah dari *American Heart Association (AHA)* & *World Health Organization (WHO)*:

```
+---------------------+-----------------------+-----------------------+------------------------------------------+
| Kategori BP         | Sistolik (mmHg)       | Diastolik (mmHg)      | Status & Tindakan Medis                  |
+---------------------+-----------------------+-----------------------+------------------------------------------+
| 🟢 Normal           | < 120                 | DAN < 80              | Kondisi ideal. Pertahankan pola hidup.  |
| 🟡 Meningkat        | 120 – 129             | DAN < 80              | Pre-Hipertensi. Kurangi asupan garam.    |
| 🟠 Hipertensi St. 1 | 130 – 139             | ATAU 80 – 89          | Tahap 1. Konsultasikan diet & dokter.    |
| 🔴 Hipertensi St. 2 | ≥ 140                 | ATAU ≥ 90             | Tahap 2. Butuh evaluasi obat & dokter.   |
| 🚨 Krisis           | > 180                 | ATAU > 120            | PERINGATAN DARURAT: Segera ke IGD / 119! |
+---------------------+-----------------------+-----------------------+------------------------------------------+
```

---

## 🏛️ Arsitektur & Teknologi

HeartSync dibangun menggunakan pendekatan **Single Page Application (SPA)** modular yang bersih:

```
[ UI Components (React 18 + Tailwind CSS) ]
                   │
                   ▼
     [ Zustand Global App Store ] ◄─────► [ Custom React Hooks ]
                   │                             │
                   ▼                             ▼
   [ IndexedDB Storage (Dexie.js) ]     [ AHA/WHO Classifier & PDF Engine ]
```

### Stack Spesifikasi:
- **Core Framework:** React 18.3 + TypeScript 5.6 (Strict Mode)
- **Build Engine:** Vite 5.4 + `vite-plugin-pwa`
- **Styling:** Tailwind CSS 3.4 + Framer Motion 11
- **Icons:** Lucide React 0.460
- **Database Local:** Dexie.js 4.0 (IndexedDB wrapper)
- **State Store:** Zustand 5.0
- **Data Charting:** Recharts 2.13
- **PDF Generation:** jsPDF 2.5 + `jspdf-autotable`

---

## 📂 Struktur Proyek

```
HeartSync/
├── .agents/                    # Log memori & briefing agen AI
├── docs/                       # Dokumentasi proyek & file Typst PDF
│   ├── HeartSync_Dokumentasi.typ
│   └── HeartSync_Dokumentasi.pdf
├── public/                     # Asset statis, favicon & PWA icons
├── src/
│   ├── components/             # Komponen UI Modular
│   │   ├── common/             # Toast, Confirm Modal, Dialogs
│   │   ├── dashboard/          # StatCards, BPTrendChart, EmergencyAlert
│   │   ├── layout/             # Header (Profile Switcher), Navigation
│   │   ├── profiles/           # ProfileModal (Multi-profile)
│   │   ├── readings/           # ReadingFormModal, ReadingCard, HistoryFilter
│   │   ├── reports/            # ExportPdfModal
│   │   └── reminders/          # ReminderModal
│   ├── db/                     # Schema Dexie.js & initial data seeder
│   ├── hooks/                  # Custom Hooks (useReadings, useProfiles)
│   ├── store/                  # Zustand Global Store
│   ├── types/                  # TypeScript Data Interfaces
│   ├── utils/                  # Classifier, PDF Generator, Formatters
│   ├── App.tsx                 # Main SPA Layout
│   ├── index.css               # Tailwind directives & custom CSS
│   └── main.tsx                # Entry point & PWA SW registration
├── index.html                  # HTML5 template & font imports
├── package.json                # Manifest dependencies
├── tailwind.config.js          # Palet warna medis & konfigurasi tema
├── tsconfig.json               # Strictly-typed TS config
└── vite.config.ts              # Vite & PWA plugin config
```

---

## 🚀 Panduan Instalasi & Pengembangan Lokal

### Prasyarat:
- Node.js versi 18.x atau 20.x
- npm / yarn / pnpm

### Langkah Pengerjaan:

1. **Clone repository:**
   ```bash
   git clone https://github.com/USERNAME/HeartSync.git
   cd HeartSync
   ```

2. **Install paket dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (Dev Server):**
   ```bash
   npm run dev
   ```
   Aplikasi akan dapat diakses di `http://localhost:5173`.

4. **Uji coba kompilasi bundel produksi (Build):**
   ```bash
   npm run build
   ```

---

## 🌐 Panduan Deployment ke Vercel

HeartSync adalah aplikasi murni *Client-Side SPA*, sehingga sangat mudah dan gratis di-deploy ke **Vercel**:

### Metode 1: Vercel CLI (Direkomendasikan)
```bash
npm install -g vercel
vercel
```
Pilih pengaturan default:
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`

### Metode 2: Hubungkan Repositori GitHub
1. Push repositori ini ke akun GitHub Anda.
2. Buka [Vercel Dashboard](https://vercel.com/new) dan klik **Import Project**.
3. Pilih repositori `HeartSync`. Vercel akan mendeteksi Vite secara otomatis.
4. Klik **Deploy**. Selesai dalam < 1 menit!

---

## 📄 Dokumentasi Lengkap (PDF)

Dokumentasi arsitektur dan panduan klinis lengkap juga tersedia dalam format **PDF profesional** yang dibuat menggunakan **Typst**.

Lokasi berkas:
- **Typst Source:** [`docs/HeartSync_Dokumentasi.typ`](file:///d:/Project/HeartSync/docs/HeartSync_Dokumentasi.typ)
- **PDF Terkompilasi:** [`docs/HeartSync_Dokumentasi.pdf`](file:///d:/Project/HeartSync/docs/HeartSync_Dokumentasi.pdf)

Untuk mengompilasi ulang file Typst:
```bash
typst compile docs/HeartSync_Dokumentasi.typ docs/HeartSync_Dokumentasi.pdf
```

---

## 🔒 Privasi Data & Keamanan

HeartSync menganut filosofi **Privacy-by-Design**:
- **Tidak ada Server Backend:** Seluruh data Anda disimpan secara lokal di dalam memori browser menggunakan **IndexedDB**.
- **Tanpa Pelacak / Telemetri:** Tidak ada cookie pelacak atau analitik pihak ketiga.
- **Kendali Penuh:** Pengguna dapat mengekspor atau menghapus seluruh catatan tensi kapan saja.

---

## 📜 Lisensi

Proyek ini dirilis di bawah lisensi [MIT License](LICENSE). Bebas digunakan dan dikembangkan untuk kepentingan kesehatan publik.
