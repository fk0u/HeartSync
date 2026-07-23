# HeartSync Session Briefing

## Overview
- **App Name:** HeartSync
- **Description:** Aplikasi Pencatatan & Monitoring Tekanan Darah (PWA Apple iOS/Android APK Design)
- **Advanced Core Architecture:** Reactive Data Caching + Shimmer Loading Skeletons + Apple Pull-to-Refresh Simulation
- **Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Dexie.js (IndexedDB) + Zustand + Recharts + jsPDF + Typst + Web Crypto API + Web Audio API + Web Speech API + HTML5 Canvas

## Cache & Load System Completed
- [x] Integrated dirty flags and timestamps for reactive cache control inside `src/store/useAppStore.ts`.
- [x] Built SwiftUI/Apple Health style Shimmer Loading Skeleton Cards ([ShimmerSkeleton.tsx](file:///d:/Project/HeartSync/src/components/common/ShimmerSkeleton.tsx)).
- [x] Embedded a manual **"Segarkan Data" (Pull-to-Refresh)** bar with clock timestamp on Dashboard tab ([App.tsx](file:///d:/Project/HeartSync/src/App.tsx)).
- [x] Verified Production Build (`npx vite build`) — SUCCESS (0 errors)
- [x] Recompiled Typst PDF Documentation (`docs/HeartSync_Dokumentasi.pdf`)
- [x] Updated Graphify Knowledge Graph (`graphify update . --force` — 2634 nodes, 3149 edges)
