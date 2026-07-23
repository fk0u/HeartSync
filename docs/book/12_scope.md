# Chapter 12: Scope & System Boundaries

## 12.1 In-Scope Features & Modules

- **Core Telemetry Logging**: Systolic (50–250 mmHg), Diastolic (40–150 mmHg), Pulse (30–220 BPM), posture, arm used, activity tags, notes.
- **Voice Dictation**: Web Speech API parsing for spoken Indonesian phrases.
- **Multi-Profile Management**: Custom Apple HIG Profile Selector (`CustomProfileSelector.tsx`) supporting separate patient profiles (*Self, Parent, Spouse, Child*).
- **Interactive Calendar**: Monthly/yearly date grid (`CalendarView.tsx`) with color-coded AHA category dots and daily reading inspector drawer.
- **Lifestyle Habits Tracking**: Sleep bedtime/wake-up time calculator, screen time logger, outdoor activity logger (`HabitsTrackerModal.tsx`).
- **Emergency Protocols**: 1-Tap WhatsApp SOS broadcast generator and direct ambulance dialer (`tel:118` / `tel:112`).
- **Clinical Reporting**: PDF report generator and HL7 FHIR v4 JSON exporter.
- **Offline Storage & Security**: Dexie IndexedDB v2 schema, AES-256-GCM backup encryption, SHA-256 tamper-evident hash chain.

## 12.2 Out-of-Scope Elements

- Remote server backend database (by design, 100% offline-first).
- Direct Bluetooth LE hardware blood pressure monitor auto-pairing (planned for Phase 3).
- Machine learning stroke risk prediction (planned for Phase 3).
