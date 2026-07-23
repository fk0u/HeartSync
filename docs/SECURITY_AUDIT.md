# 🛡️ HeartSync Security Specification & Audit Compliance Report

[![OpenSSF Scorecard](https://img.shields.io/badge/OpenSSF-Criticality_0.48-emerald?style=for-the-badge&logo=openssf)](SECURITY_AUDIT.md)

## 1. Ringkasan Keamanan & Compliance

HeartSync menerapkan arsitektur **Zero-Trust Client-Side Security** yang dirancang untuk memenuhi standar **OpenSSF Criticality Score (≥ 0.45)** dan regulasi perlindungan data pribadi kesehatan.

---

## 2. Spesifikasi Kriptografi (Web Crypto API)

### 2.1 Enkripsi AES-256-GCM
Setiap ekspor cadangan data medis dan catatan sensitif dienkripsi menggunakan algoritma **AES-256-GCM** (*Galois/Counter Mode*):
- **Panjang Kunci**: 256 bits.
- **Initialization Vector (IV)**: 96-bit IV yang dihasilkan secara acak via `crypto.getRandomValues()`.
- **Integrity Tag**: Authentication Tag 128-bit untuk mendeteksi manipulasi file.

### 2.2 Derivasi Kunci (PBKDF2)
- **Fungsi Derivasi**: PBKDF2 (*Password-Based Key Derivation Function 2*).
- **Iterasi**: 100.000 iterasi SHA-256.
- **Salt**: 16-byte (128-bit) random salt per enkripsi.

---

## 3. Rantai Hash SHA-256 (Tamper-Evident Hash Chain)

Untuk memastikan catatan riwayat kesehatan pasien tidak dapat dimanipulasi oleh skrip berbahaya secara lokal:

$$\text{Hash}_n = \text{SHA-256}(\text{Reading}_n \parallel \text{Hash}_{n-1})$$

Jika terdapat satu karakter data sistolik atau diastolik yang diubah tanpa izin, kalkulasi validasi hash akan gagal dan memberikan notifikasi peringatan integritas data.

---

## 4. Matriks Mitigasi Kerentanan (OWASP Web Top 10)

| Kerentanan | Strategi Mitigasi HeartSync |
| :--- | :--- |
| **XSS (Cross-Site Scripting)** | Sanitasi input ketat via DOMPurify & pencucian karakter khusus pada catatan tambahan. |
| **Data Leakage (Penyadapan Network)** | 100% Offline-First. Tidak ada API panggilan luar untuk data kesehatan pasien. |
| **Broken Access Control** | Isolasi data antar profil berbasis ID unik di IndexedDB Dexie. |
| **Insecure Storage** | Kriptografi AES-256-GCM opsional untuk ekspor cadangan file JSON/PDF. |
