# Chapter 25: Folder Structure Specifications

```
d:\Project\HeartSync\
├── .agents/                        # Agent briefings, rules, and skills
├── docs/                           # Complete project documentation & PDF exports
│   ├── book/                       # 50-Chapter Software Engineering Book
│   ├── images/                     # System architecture & dashboard graphics
│   ├── ARCHITECTURE.md             # Architecture overview document
│   ├── HEARTSYNC_DOCUMENTATION.typ # Typst publication source file
│   ├── HEARTSYNC_ENTERPRISE_DOCUMENTATION.pdf # Compiled enterprise PDF (280kB)
│   ├── SECURITY_AUDIT.md           # Security audit compliance report
│   ├── USER_PERSONAS_CASE_STUDIES.md # Clinical case studies and user personas
│   ├── history/                    # Architectural Decision Records (ADR 001)
│   └── project/                    # Phase-by-phase project roadmap
├── public/                         # PWA static assets and manifest
│   ├── favicon.svg
│   ├── manifest.json
│   └── sw.js                       # Service Worker caching engine
├── src/                            # TypeScript source code
│   ├── components/                 # Component tree
│   │   ├── calendar/               # CalendarView.tsx
│   │   ├── common/                 # Toast, ConfirmModal, KnowledgeGuide, Skeleton
│   │   ├── dash/                   # SodiumTrackerModal.tsx
│   │   ├── dashboard/              # StatCards, BPTrendChart, AppleHealthRings, EmergencyAlert
│   │   ├── emergency/              # FamilySOSModal.tsx
│   │   ├── habits/                 # HabitsTrackerModal.tsx
│   │   ├── layout/                 # Header, DesktopHeader, MobileHeader, Navigation
│   │   ├── meds/                   # MedicationTrackerModal.tsx
│   │   ├── profiles/               # CustomProfileSelector, ProfileModal
│   │   ├── readings/               # ReadingFormModal, ReadingCard, HistoryFilter
│   │   ├── reminders/              # ReminderModal.tsx
│   │   ├── reports/                # ExportPdfModal.tsx
│   │   ├── security/               # SecurityBackupModal.tsx
│   │   └── timer/                  # BPRestTimerModal.tsx
│   ├── db/                         # Dexie.js database schema & initial seed
│   │   └── index.ts
│   ├── hooks/                      # Custom React hooks
│   │   ├── useProfiles.ts
│   │   └── useReadings.ts
│   ├── security/                   # Sanitization & cryptographic hashing
│   │   ├── hasher.ts
│   │   └── sanitizer.ts
│   ├── services/                   # External services & TanStack Query
│   │   ├── fhir/
│   │   │   └── fhir-exporter.ts
│   │   └── query-client.ts
│   ├── store/                      # Zustand global store
│   │   └── useAppStore.ts
│   ├── types/                      # TypeScript interface definitions
│   │   └── blood-pressure.ts
│   ├── utils/                      # Helper & hardware API modules
│   │   ├── audio-fx.ts
│   │   ├── bp-classifier.ts
│   │   ├── crypto-storage.ts
│   │   ├── formatters.ts
│   │   ├── speech-reader.ts
│   │   └── voice-recognition.ts
│   ├── App.tsx                     # Main layout & router container
│   ├── index.css                   # Global CSS & Tailwind utilities
│   ├── main.tsx                    # React DOM root & PWA Service Worker register
│   └── router.tsx                  # TanStack Router type-safe route tree
├── index.html                      # HTML5 entry template
├── package.json                    # Project dependencies & Rsbuild scripts
├── rsbuild.config.ts               # Rsbuild Rspack bundler configuration
└── tsconfig.json                   # TypeScript compiler configuration
```
