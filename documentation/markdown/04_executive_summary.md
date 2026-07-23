# Chapter 4: Executive Summary

## System Vision & Architectural Breakthrough

HeartSync is an open-source, client-side progressive web application engineered to solve critical challenges in self-blood pressure monitoring (SBPM), patient data privacy, and clinical communication. Operating on an **Offline-First** model, HeartSync eliminates patient vulnerability to cloud data breaches by guaranteeing that 100% of patient health data remains stored on the user's local device inside an encrypted IndexedDB database.

### Key Architectural & Feature Pillars

1. **Rust-Powered High Performance Engine**: Migrated to **Rsbuild v2 (Rspack)** and **React 19**, achieving 1.44-second production builds (an 8.75x performance improvement over legacy Vite pipelines) and reducing bundle CSS size by 31.5%.
2. **Type-Safe Routing & Reactive Caching**: Integrates **TanStack Router v1** for type-safe navigation and **TanStack Query v5** paired with **Zustand** for real-time memory cache invalidation upon state changes or profile switching.
3. **Cryptographic Security Guardrails**: Employs client-side **AES-256-GCM** encryption with PBKDF2 key derivation (100,000 iterations) for data backup files, combined with an in-memory **SHA-256 Tamper-Evident Hash Chain** to detect local data manipulation.
4. **Clinical Accessibility & Voice Assistant**: Implements Indonesian voice recognition via the **Web Speech API** (*"Tensi 120 per 80 nadi 72"*) for hands-free data entry, alongside synthesized audio feedback (*Web Audio API*) and a 5-minute Box Breathing rest protocol (*BPRestTimerModal*).
5. **Medical Interoperability & Lifestyle Tracking**: Features a 1-click **HL7 FHIR v4 Observation JSON** exporter, clinical PDF report generator, an interactive monthly calendar (`CalendarView.tsx`), custom Apple HIG profile selector (`CustomProfileSelector.tsx`), and a lifestyle tracker (`HabitsTrackerModal.tsx`) for monitoring sleep schedules, screen time, and outdoor physical activity.
