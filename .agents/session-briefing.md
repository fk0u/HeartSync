# HeartSync Session Briefing

## Overview
- **App Name:** HeartSync
- **Description:** Aplikasi Pencatatan & Monitoring Tekanan Darah (Interactive Month Calendar & Habits/Lifestyle Tracker System)
- **High-Impact Real-time Features:** Interactive Health Calendar + Sleep & Habit Tracker + Safe Web Audio Synthesizer + Custom Apple Profile Selector + Voice Dictation (Web Speech API) + Dual Header + Medication CRUD + SOS Emergency Direct Call
- **Tech Stack:** React 19 + TypeScript + Rsbuild v2 + Tailwind CSS + Dexie.js (IndexedDB) + TanStack Query v5 + TanStack Router v1 + Zustand + Recharts + jsPDF + Web Crypto API + Web Audio API + Web Speech API

## Advanced Features Added
- [x] **Interactive Health Calendar ([CalendarView.tsx](file:///d:/Project/HeartSync/src/components/calendar/CalendarView.tsx))**: Visual 7-day week grid for monthly/yearly navigation, badge status indicators per date, and interactive date inspector for historical readings.
- [x] **Lifestyle & Habit Tracker ([HabitsTrackerModal.tsx](file:///d:/Project/HeartSync/src/components/habits/HabitsTrackerModal.tsx))**: Bedtime and wake-up time recorder (calculating total sleep hours with clinical risk alert for < 6 hours sleep), screen time duration logger (HP & computer), outdoor activity / exercise logger, and Dexie IndexedDB persistence.
- [x] **Database Schema Upgrade**: Upgraded `HeartSyncDatabase` to version 2 with `habits` table.
- [x] Verified full typecheck (`npm run lint` — 0 errors) and build (`npm run build` — 2.15s).
- [x] Updated Graphify Knowledge Graph (`graphify update . --force` — 2664 nodes, 3259 edges).
