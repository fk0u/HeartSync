# HeartSync — Blood Pressure Tracker & Monitoring App (PWA)

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Stack: React 18 + Vite](https://img.shields.io/badge/Stack-React%2018%20%2B%20Vite-sky.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Style-Tailwind%20CSS-teal.svg)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline%20First-purple.svg)](https://web.dev/progressive-web-apps/)

**HeartSync** adalah aplikasi web Progressive Web App (PWA) pencatatan & monitoring tekanan darah yang powerful, intuitif, dan ramah keluarga. Dirancang untuk pasien hipertensi, lansia, serta anggota keluarga/caregiver yang membantu memantau kesehatan orang tua.

---

## 🌟 Fitur Utama (MVP Ready)

1. **Multi-Profil Pasien & Keluarga**:
   - Kelola pencatatan untuk diri sendiri, orang tua, pasangan, atau anak dalam 1 aplikasi.
   - Switch profil sangat cepat & mudah (1-klik).
   - Atur target tekanan darah individual per profil.

2. **Smart AHA/WHO Classification Engine**:
   - Otomatis mengklasifikasikan tekanan darah secara real-time:
     - 🟢 **Normal** (< 120 / < 80 mmHg)
     - 🟡 **Meningkat / Elevated** (120-129 / < 80 mmHg)
     - 🟠 **Hipertensi Tahap 1** (130-139 / 80-89 mmHg)
     - 🔴 **Hipertensi Tahap 2** (≥ 140 / ≥ 90 mmHg)
     - 🚨 **Krisis Hipertensi** (> 180 / > 120 mmHg — disertai peringatan darurat)
   - Disertai rekomendasi tindakan medis & gaya hidup langsung di layar.

3. **Input Pengukuran Ramah Lansia & Forgiving UX**:
   - Tombol pengatur angka besar (`+`, `-`), stepper cepat, & keyboard friendly.
   - Pilihan posisi tubuh (*Duduk, Baring, Berdiri*), lengan yang diukur (*Kiri, Kanan*), label kondisi (*Bangun Tidur, Sebelum Obat, Pasca Olahraga, Stres*), dan catatan harian.

4. **Dashboard Tren & Statistik Interaktif**:
   - Ringkasan statistik (Tensi terakhir, Rata-rata 7/30 Hari, Rata-rata Nadi, Rentang Min/Max).
   - Visualisasi grafik kurva Sistolik & Diastolik interaktif (Recharts) dengan garis batas standar.

5. **Laporan Dokter 1-Klik (PDF Export)**:
   - Membuat dokumen laporan medis berformat profesional (jsPDF) berisi header profil, ringkasan statistik, tabel lengkap riwayat pengukuran, serta area paraf/catatan klinis dokter.
   - Efek selebrasi selebrasi confetti saat ekspor berhasil.

6. **Cadangan Data & Privasi 100% Offline (IndexedDB)**:
   - Seluruh data disimpan lokal di browser menggunakan **Dexie.js** (IndexedDB). Tidak ada server luar yang menyimpan data medis sensitif Anda.
   - Dukungan ekspor & impor file **CSV** untuk cadangan data kapan saja.

7. **Jadwal Pengingat (Reminders)**:
   - Atur jadwal pengingat rutin untuk cek tensi dan minum obat harian.
   - Terintegrasi dengan notifikasi browser lokal.

8. **PWA Standalone Capabilities**:
   - 100% Offline-First dengan Service Worker.
   - Dapat di-install ke layar utama (*Add to Home Screen*) di Android, iOS, Windows, dan macOS seperti aplikasi native.

---

## 🛠️ Tech Stack & Arsitektur

- **Framework:** React 18 + TypeScript (Strict Mode)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Custom Medical Color Tokens
- **Icons & Motion:** Lucide Icons + Framer Motion (Smooth Micro-interactions)
- **Offline Storage:** Dexie.js (IndexedDB wrapper)
- **State Management:** Zustand (Reactive Global Store)
- **Visualisasi Chart:** Recharts
- **PDF Generation:** jsPDF + jspdf-autotable
- **PWA:** `vite-plugin-pwa` + Service Worker

---

## 🚀 Panduan Setup & Pengembangan Lokal

### Prasyarat
- Node.js version 18+ atau 20+
- npm, yarn, atau pnpm

### Langkah Setup
1. **Clone repository ini & masuk ke direktori proyek:**
   ```bash
   cd HeartSync
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:5173`.

4. **Build untuk Produksi:**
   ```bash
   npm run build
   ```

---

## 🌐 Panduan Deployment ke Vercel

HeartSync dirancang sebagai SPA PWA murni tanpa backend server, sehingga sangat ideal di-deploy gratis ke **Vercel**:

### Metode 1: Via Vercel CLI (Cepat)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Jalankan perintah deploy di folder proyek:
   ```bash
   vercel
   ```
3. Ikuti petunjuk interaktif (Pilih framework: **Vite**, Root directory: `./`).

### Metode 2: Via GitHub + Vercel Dashboard
1. Push repositori ini ke GitHub:
   ```bash
   git add .
   git commit -m "feat: initial release of HeartSync Blood Pressure Tracker"
   git remote add origin https://github.com/USERNAME/HeartSync.git
   git push -u origin main
   ```
2. Buka [Vercel Dashboard](https://vercel.com/new).
3. Import repositori **HeartSync**.
4. Klik **Deploy**. Vercel akan otomatis mendeteksi Vite dan membangun aplikasi.

---

## 📜 Lisensi & Kontribusi

Proyek ini dirilis di bawah lisensi MIT. Kontribusi terbuka untuk pengembangan fitur kesehatan publik yang lebih luas.
