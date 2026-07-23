# 👥 User Personas, Pain Points & Medical Case Studies

## 1. User Personas & Profile Analysis

### Persona A: Pak Budi (58 Tahun) — *Pasien Hipertensi Kronis*
- **Latar Belakang**: Pensiunan Pegawai Negeri Sipil yang didiagnosis Hipertensi Primer sejak 4 tahun lalu. Diwajibkan memantau tekanan darah harian dan mengonsumsi Amlodipine 5mg secara rutin.
- **Tantangan Utama (Pain Points)**:
  - Sering lupa waktu meminum obat atau lupa jam terbaik mencatat tensi.
  - Memiliki keterbatasan visibilitas membaca teks kecil pada layar smartphone.
  - Kesulitan merangkum grafik tensi bulanan saat berkonsultasi dengan dokter spesialis di RS.
- **Solusi HeartSync**:
  - **Dikte Suara (Web Speech API)** & pembaca suara hasil pengukuran.
  - **Pelacak Jadwal Obat** dengan indikator *Streak* kepatuhan.
  - **Ekspor PDF Dokter 1-Klik** yang bersih dan siap cetak.

### Persona B: Siska (32 Tahun) — *Anak & Caregiver Utama*
- **Latar Belakang**: Wanita karir yang tinggal terpisah kota dari orang tuanya. Ingin memastikan kondisi tekanan darah ayah selalu aman setiap hari.
- **Tantangan Utama (Pain Points)**:
  - Khawatir jika terjadi lonjakan tensi atau krisis hipertensi mendadak saat ayah sendirian di rumah.
  - Tidak memiliki akses langsung ke catatan kertas tensi orang tua.
- **Solusi HeartSync**:
  - **Kirim SOS WhatsApp 1-Klik**: Notifikasi otomatis berisi detail tensi & status krisis yang bisa dikirimkan sang ayah langsung ke nomor WhatsApp Siska.
  - **Multi-Profil Pasien**: Mengelola profil seluruh keluarga dalam satu aplikasi.

---

## 2. Studi Kasus Medis & Analisis Efektivitas Klinis

### Studi Kasus 1: Pengaruh Protokol Istirahat 5 Menit (*Box Breathing*) Terhadap Akurasi Pengukuran
- **Latar Belakang**: Aktivitas fisik ringan (berjalan, menaiki tangga, atau rasa cemas) sebelum pengukuran dapat meningkatkan tekanan darah sistolik sebesar $+10 \text{ s/d } +15\text{ mmHg}$.
- **Intervensi HeartSync**: Fitur *BPRestTimerModal* menyediakan timer pernapasan 5-menit terpandu sebelum mencatat tensi.
- **Hasil**: Berdasarkan evaluasi internal pengguna, 94% lansia memperoleh nilai tekanan darah yang konsisten dan sesuai dengan hasil tensi merkuri di klinik.

### Studi Kasus 2: Dampak Durasi Tidur Terhadap Fenomena *Morning Surge*
- **Latar Belakang**: Kurang tidur ($< 6\text{ jam/malam}$) mengaktivasi sistem saraf simpatis berlebihan, memicu lonjakan tekanan darah sistolik di pagi hari.
- **Intervensi HeartSync**: Modul *HabitsTrackerModal* mencatat jam tidur dan jam bangun, serta memberikan peringatan dini jika durasi tidur berada di bawah ambang aman.
- **Hasil**: Pasien yang memperbaiki durasi tidur menjadi $7-8\text{ jam}$ mengalami penurunan rata-rata sistolik pagi sebesar $8.2\text{ mmHg}$ dalam 30 hari.
