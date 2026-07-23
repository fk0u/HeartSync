// Typst Document: HeartSync Technical & Medical Documentation
// Designed for professional medical and software engineering presentation

#set page(
  paper: "a4",
  margin: (top: 2.5cm, bottom: 2.5cm, left: 2.2cm, right: 2.2cm),
  header: context {
    let page-num = counter(page).get().first()
    if page-num > 1 [
      #grid(
        columns: (1fr, auto),
        align(left)[#text(size: 8.5pt, fill: rgb("#64748b"), weight: "bold")[HeartSync — Dokumentasi Teknis & Medis]],
        align(right)[#text(size: 8.5pt, fill: rgb("#0d9488"), weight: "bold")[PWA Blood Pressure Tracker]]
      )
      #v(-2pt)
      #line(length: 100%, stroke: 0.5pt + rgb("#e2e8f0"))
    ]
  },
  footer: context {
    let page-num = counter(page).get().first()
    if page-num > 1 [
      #line(length: 100%, stroke: 0.5pt + rgb("#e2e8f0"))
      #v(4pt)
      #grid(
        columns: (1fr, auto),
        align(left)[#text(size: 8pt, fill: rgb("#94a3b8"))[Dokumentasi Resmi v1.0.0 — HeartSync Open Source]],
        align(right)[#text(size: 8.5pt, fill: rgb("#475569"), weight: "bold")[Halaman #page-num]]
      )
    ]
  }
)

#set text(
  font: ("Segoe UI", "Arial", "Calibri"),
  size: 10pt,
  fill: rgb("#0f172a"),
  lang: "id"
)

#set par(justify: true, leading: 0.65em)
#set heading(numbering: "1.1")

// Color Tokens
#let primary-color = rgb("#0284c7")
#let secondary-color = rgb("#0d9488")
#let dark-slate = rgb("#0f172a")

// Callout Box Function
#let callout(title: "INFORMASI", body, type: "info") = {
  let border-color = primary-color
  let bg-color = rgb("#f0f9ff")
  let text-color = rgb("#0369a1")

  if type == "warning" {
    border-color = rgb("#f59e0b")
    bg-color = rgb("#fef3c7")
    text-color = rgb("#92400e")
  } else if type == "danger" {
    border-color = rgb("#ef4444")
    bg-color = rgb("#fee2e2")
    text-color = rgb("#991b1b")
  } else if type == "success" {
    border-color = rgb("#10b981")
    bg-color = rgb("#d1fae5")
    text-color = rgb("#065f46")
  }

  rect(
    width: 100%,
    fill: bg-color,
    radius: 6pt,
    inset: 10pt,
    stroke: (left: 4pt + border-color, rest: 0.5pt + border-color.lighten(60%))
  )[
    #text(weight: "bold", size: 9pt, fill: text-color)[#title]
    #v(2pt)
    #text(size: 9pt, fill: dark-slate)[#body]
  ]
}

// ---------------------------------------------------------
// COVER PAGE / HALAMAN SAMPUL
// ---------------------------------------------------------
#align(center + horizon)[
  #v(-2cm)
  #rect(
    width: 70pt,
    height: 70pt,
    radius: 18pt,
    fill: gradient.linear(secondary-color, primary-color, angle: 45deg)
  )[
    #align(center + horizon)[
      #text(size: 32pt, fill: white)[🩺]
    ]
  ]

  #v(1.5cm)

  #text(size: 28pt, weight: "extrabold", fill: dark-slate)[HeartSync] \
  #v(0.3cm)
  #text(size: 14pt, weight: "medium", fill: secondary-color)[Aplikasi Pencatatan & Monitoring Tekanan Darah (PWA Offline-First)]

  #v(1cm)
  #rect(
    fill: rgb("#f1f5f9"),
    radius: 20pt,
    inset: (x: 16pt, y: 8pt)
  )[
    #text(size: 9.5pt, weight: "bold", fill: rgb("#334155"))[DOKUMENTASI TEKNIS & PANDUAN PENGGUNA RESMI]
  ]

  #v(3cm)

  #grid(
    columns: (1fr, 1fr),
    align: (left, right),
    [
      #text(size: 9pt, fill: rgb("#64748b"))[Dipublikasikan Oleh:] \
      #text(size: 10pt, weight: "bold")[HeartSync Open-Source Team] \
      #text(size: 8.5pt, fill: rgb("#64748b"))[Pengembangan Aplikasi Kesehatan]
    ],
    [
      #text(size: 9pt, fill: rgb("#64748b"))[Versi Dokumen:] \
      #text(size: 10pt, weight: "bold")[v1.0.0 (Produksi)] \
      #text(size: 8.5pt, fill: rgb("#64748b"))[Tanggal: Juli 2026]
    ]
  )

  #v(2cm)
  #line(length: 100%, stroke: 1.5pt + gradient.linear(secondary-color, primary-color))
]

#pagebreak()

// ---------------------------------------------------------
// DAFTAR ISI
// ---------------------------------------------------------
#outline(
  title: [Daftar Isi Dokumentasi],
  indent: 1.5em,
  depth: 3
)

#v(1cm)
#line(length: 100%, stroke: 0.5pt + rgb("#cbd5e1"))
#v(0.5cm)

// ---------------------------------------------------------
// BAB 1: RINGKASAN EKSEKUTIF & VISI
// ---------------------------------------------------------
= Ringkasan Eksekutif & Visi Produk

*HeartSync* adalah aplikasi Progressive Web App (PWA) pencatatan dan analisis tekanan darah yang dirancang untuk memberikan pengalaman _immersive, interaktif, dan intuitif_. Aplikasi ini menggabungkan kemudahan pencatatan harian dengan visualisasi tren klinis yang aman dan menjaga privasi pengguna secara 100%.

== Permasalahan yang Disederhanakan
Hipertensi sering disebut sebagai _"silent killer"_ karena banyak penderita yang tidak menyadari perubahan tekanan darah mereka sampai terjadi komplikasi serius. Tantangan utama pasien dan keluarga saat ini meliputi:
1. Catatan manual di kertas sering hilang atau rusak sebelum konsultasi dokter.
2. Aplikasi kesehatan komersial yang rumit, dipenuhi iklan, atau mewajibkan akun server luar yang berisiko meretas privasi data medis sensitif.
3. Antarmuka aplikasi yang tidak ramah lansia (teks kecil, navigasi berbelit-belit).

== Solusi HeartSync
HeartSync memecahkan masalah ini dengan pendekatan _"Notion untuk Tekanan Darah"_:
- *Penyimpanan Offline-First (IndexedDB)*: Seluruh data tersimpan aman di memori perangkat browser pengguna.
- *Antarmuka Ramah Keluarga*: Dukungan *Multi-Profil* instan (Saya, Orang Tua, Pasangan, Anak) dalam satu aplikasi.
- *Klasifikasi AHA/WHO Real-Time*: Penilaian otomatis kategori tensi beserta saran medis kontekstual.
- *Laporan Medis 1-Klik (PDF)*: Generator dokumen laporan berformat bersih untuk dokter saat konsultasi.

#callout(
  title: "PRINSIP UTAMA PRIVASI",
  [HeartSync tidak mengirimkan data tekanan darah Anda ke server cloud mana pun. Seluruh kalkulasi, grafik, dan dokumen PDF dibuat secara lokal di browser perangkat Anda.],
  type: "success"
)

// ---------------------------------------------------------
// BAB 2: STANDAR MEDIS & KLASIFIKASI AHA/WHO
// ---------------------------------------------------------
= Standar Medis & Klasifikasi AHA/WHO

Algoritma pengklasifikasi tekanan darah pada HeartSync mengikuti panduan resmi dari *American Heart Association (AHA)* dan *World Health Organization (WHO)*.

#v(0.5em)

#table(
  columns: (1.2fr, 1fr, 1fr, 2.5fr),
  fill: (x, y) => if y == 0 { primary-color } else if calc.even(y) { rgb("#f8fafc") } else { white },
  stroke: 0.5pt + rgb("#cbd5e1"),
  inset: 7pt,
  align: (col, row) => if row == 0 { center + horizon } else { left + horizon },
  
  [#text(weight: "bold", fill: white)[Kategori BP]],
  [#text(weight: "bold", fill: white)[Sistolik (mmHg)]],
  [#text(weight: "bold", fill: white)[Diastolik (mmHg)]],
  [#text(weight: "bold", fill: white)[Rekomendasi Clinical Action]],

  [🟢 Normal], [< 120], [DAN < 80], [Kondisi sehat ideal. Pertahankan pola makan seimbang dan olahraga teratur.],
  [🟡 Meningkat (Elevated)], [120 – 129], [DAN < 80], [Pre-hipertensi. Kurangi garam/natrium, hindari stres, dan evaluasi pola tidur.],
  [🟠 Hipertensi Tahap 1], [130 – 139], [ATAU 80 – 89], [Terindikasi ringan. Ubah diet (DASH), rutin olahraga, dan konsultasi ke dokter.],
  [🔴 Hipertensi Tahap 2], [≥ 140], [ATAU ≥ 90], [Hipertensi sedang/berat. Disarankan segera konsultasi dokter untuk penanganan obat.],
  [🚨 Krisis Hipertensi], [> 180], [ATAU > 120], [PERINGATAN DARURAT! Istirahat total dan SEGERA ke IGD / panggil 119.]
)

#v(0.5em)

#callout(
  title: "PERINGATAN DARURAT KRISIS HIPERTENSI",
  [Jika pencatatan Sistolik > 180 atau Diastolik > 120 mmHg, aplikasi HeartSync akan menampilkan spanduk peringatan krisis berwarna ungu/merah lengkap dengan tombol panggil darurat 119.],
  type: "danger"
)

// ---------------------------------------------------------
// BAB 3: ARSITEKTUR PERANGKAT LUNAK & TECH STACK
// ---------------------------------------------------------
= Arsitektur Perangkat Lunak & Tech Stack

HeartSync menggunakan arsitektur *Single Page Application (SPA)* berbasis React 18 & TypeScript dengan struktur komponen yang sangat terpisah (_separation of concerns_).

== Spesifikasi Modul Utama

1. *Dexie.js Storage (`src/db/index.ts`)*:
   Menyediakan API penyimpanan berkecepatan tinggi di atas IndexedDB dengan dukungan transaksi aman dan pengindeksan data berdasarkan `profileId` dan `timestamp`.

2. *State Management (`src/store/useAppStore.ts`)*:
   Mengelola state global terpusat seperti `activeProfileId`, filter tanggal, filter pencarian, status modal dialog, dan notifikasi toast.

3. *Custom Hooks (`src/hooks/useReadings.ts` & `useProfiles.ts`)*:
   Memanfaatkan `useLiveQuery` dari Dexie untuk menyajikan data secara reaktif dan instan begitu ada perubahan data di IndexedDB.

// ---------------------------------------------------------
// BAB 4: SCHEMA DATABASE INDEXEDDB
// ---------------------------------------------------------
= Schema Database IndexedDB (Dexie.js)

Database bernama `HeartSyncDB` memiliki 3 tabel utama:

== Tabel 1: `profiles`
Menyimpan data identitas profil pengguna dan target tekanan darah.
- `id` (string, Primary Key): ID unik profil (contoh: `profile-self-default`).
- `name` (string): Nama lengkap atau panggilan pengguna.
- `relationship` (string): Hubungan (`self`, `parent`, `spouse`, `child`, `other`).
- `avatar` (string): Emoji avatar pilihan pengguna.
- `targetSystolic` & `targetDiastolic` (number): Ambang batas acuan target pengguna.
- `notes` (string, opsional): Catatan medis khusus profil.

== Tabel 2: `readings`
Menyimpan seluruh catatan riwayat pengukuran tekanan darah.
- `id` (number, Auto-Increment Primary Key).
- `profileId` (string, Indexed Foreign Key).
- `systolic` & `diastolic` (number): Nilai tensi dalam mmHg.
- `pulse` (number): Denyut nadi per menit (BPM).
- `timestamp` (string, ISO 8601, Indexed): Waktu pengukuran.
- `position` (string): Posisi tubuh (`duduk`, `baring`, `berdiri`).
- `arm` (string): Lengan (`kiri`, `kanan`).
- `tags` (array of string): Chip kondisi (`Bangun Tidur`, `Sebelum Obat`, `Pasca Olahraga`, dll).

== Tabel 3: `reminders`
Menyimpan jadwal pengingat lokal pengukuran tensi & konsumsi obat.
- `id` (number, Auto-Increment).
- `profileId` (string, Foreign Key).
- `title` & `type` (string): Judul dan tipe (`measurement` / `medication`).
- `time` (string): Jam pengingat (format `07:00`).
- `enabled` (boolean): Status aktif/non-aktif pengingat.

// ---------------------------------------------------------
// BAB 5: FITUR UTAMA & PANDUAN PENGGUNAAN
// ---------------------------------------------------------
= Fitur Utama & Panduan Penggunaan

== 1. Manajemen Multi-Profil Pasien
Pengguna dapat mengklik tombol switcher profil di header bagian atas untuk:
- Mengganti profil pasien aktif secara instan.
- Menambah profil baru untuk anggota keluarga (misal: Ibu Maryam, 68 tahun).
- Mengatur target tekanan darah dan catatan medis per profil.

== 2. Pencatatan Tekanan Darah (Frictionless Form)
Buka modal pencatatan via tombol *"+ Catat Tensi"*:
- Gunakan tombol `+` dan `-` untuk menyesuaikan Sistolik, Diastolik, dan Nadi dengan mudah.
- Lihat warna badge klasifikasi AHA yang berubah secara real-time saat angka disesuaikan.
- Pilih tag kondisi (misal: _Sesudah Obat_, _Stres_, _Santai_).
- Simpan catatan. Data akan langsung terupdate di grafik dan tabel riwayat secara reaktif.

== 3. Laporan Medis Dokter (1-Click PDF Export)
Dokumen PDF laporan medis berformat resmi dapat diunduh kapan saja melalui tab *Laporan Dokter*:
- Berisi header identitas pasien & tanggal cetak.
- Menyajikan ringkasan statistik (rata-rata tensi, rata-rata nadi, rentang min/max).
- Tabel lengkap riwayat pencatatan beserta kategori AHA.
- Kolom paraf & catatan evaluasi klinis untuk dokter penanggung jawab.

// ---------------------------------------------------------
// BAB 6: PANDUAN DEPLOYMENT VERCEL & PWA
// ---------------------------------------------------------
= Panduan Deployment Vercel & PWA

HeartSync dapat di-deploy secara mudah dan gratis ke platform cloud seperti *Vercel*.

== Langkah Deployment Vercel:
1. Pastikan seluruh kode sudah di-push ke repositori GitHub.
2. Buka dashboard Vercel (vercel.com) -> Klik *New Project*.
3. Import repositori HeartSync.
4. Pilih preset framework *Vite*.
5. Klik *Deploy*. Aplikasi akan aktif dalam hitungan detik.

== Fitur PWA (Progressive Web App):
Aplikasi ini sudah dilengkapi `vite-plugin-pwa` dan `manifest.webmanifest`. Pengguna di perangkat Android/iOS dapat menekan tombol *"Add to Home Screen"* pada browser untuk menginstal HeartSync sebagai aplikasi native di smartphone mereka yang bekerja 100% offline.

#v(2cm)

#align(center)[
  #text(size: 9pt, fill: rgb("#94a3b8"))[— Akhir dari Dokumentasi Resmi HeartSync —]
]
