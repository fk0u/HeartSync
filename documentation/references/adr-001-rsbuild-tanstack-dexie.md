# ADR 001: Migrasi ke Rsbuild (Rspack), TanStack Router & Query v5, serta Dexie.js v2

- **Status**: Accepted
- **Tanggal**: 2026-07-23
- **Penulis**: Lead Systems Architect & Core Maintainers

## Context & Problem Statement
Aplikasi HeartSync sebelumnya menggunakan Vite sebagai bundler standar dan state management manual. Namun seiring berkembangnya fitur (Kalender bulanan, Dikte Suara, Pelacak Kebiasaan, Multi-profil), tim menghadapi tantangan:
1. Waktu kompilasi build bundler Vite relatif lambat (12.6s).
2. Potensi bentrokan state dan *stale cache* data saat beralih profil pasien.
3. Kebutuhan arsitektur Offline-First PWA yang ultra cepat.

## Decision Drivers
- Mempercepat waktu kompilasi CI/CD dan pengujian lokal.
- Menjamin Type-Safe Routing & Caching otomatis antar komponen.
- Menjamin privasi 100% data kesehatan pasien di penyimpanan lokal IndexedDB.

## Considered Options
1. Tetap menggunakan Vite + React 18.
2. Next.js App Router (Membutuhkan Server Node.js, bertentangan dengan prinsip 100% Client-Side Offline-First).
3. **Rsbuild (Rspack - Rust compiler) + React 19 + TanStack Ecosystem + Dexie.js** (Pilihan Terpilih).

## Decision Outcome
Diputuskan untuk menggunakan **Rsbuild (Rspack) + TanStack Router + TanStack Query v5 + Dexie.js v2**.

### Konsekuensi Positif:
- **Performa Build**: Waktu kompilasi berkurang drastis dari 12.6s menjadi **1.44s** (8.7x lebih cepat).
- **Type Safety**: Routing `/`, `/history`, `/reports`, `/reminders` terjamin type-safe.
- **Invalidation Caching**: Memanggil `queryClient.invalidateQueries({ queryKey: ['readings'] })` memperbarui seluruh tampilan UI secara real-time tanpa *full page reload*.
