# HeartSync Session Briefing

## Overview
- **App Name:** HeartSync
- **Description:** Aplikasi Pencatatan & Monitoring Tekanan Darah (PWA Offline-First)
- **Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Dexie.js (IndexedDB) + Zustand + Recharts + jsPDF
- **Target Audience:** Pasien hipertensi, lansia, anggota keluarga/caregiver, dan pengguna umum.

## Current Progress
- [x] Initialized Git Repository & Post-Commit Hooks
- [x] Created guardrail files (`.gitignore`, `.graphifyignore`, `.agents/session-briefing.md`)
- [x] Setup `package.json`, Vite, TypeScript, Tailwind CSS configuration
- [x] Built Dexie.js database schema & AHA/WHO BP Classifier engine with seed data
- [x] Implemented global Zustand store & profile manager
- [x] Implemented UI components (Dashboard, Form Input, Trend Charts, History, PDF Exporter, Reminders)
- [x] Configured PWA offline capabilities (VitePWA plugin, manifest, service worker)
- [x] Verified Production Build (`npx vite build`) — SUCCESS
