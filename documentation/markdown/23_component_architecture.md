# Chapter 23: Component Architecture

## 23.1 Component Categories & Responsibilities

HeartSync components are organized into logical directories under `src/components/`:

1. **`layout/`**: `Header.tsx`, `DesktopHeader.tsx`, `MobileHeader.tsx`, `Navigation.tsx`. Controls top and bottom navigation bars, platform-specific desktop/mobile visibility, and FAB triggers.
2. **`profiles/`**: `CustomProfileSelector.tsx`, `ProfileModal.tsx`. Manages custom Apple HIG popover dropdown profile switching and profile CRUD operations.
3. **`readings/`**: `ReadingFormModal.tsx`, `ReadingCard.tsx`, `HistoryFilter.tsx`. Manages blood pressure telemetry input, voice dictation integration, filtering, sorting, and individual reading cards.
4. **`calendar/`**: `CalendarView.tsx`. Manages monthly/yearly calendar grid, date selection, color-coded AHA category badges, and daily reading inspector.
5. **`habits/`**: `HabitsTrackerModal.tsx`. Manages sleep bedtime/wake time logging, screen time duration, and outdoor exercise tracking.
6. **`dashboard/`**: `StatCards.tsx`, `BPTrendChart.tsx`, `AppleHealthRings.tsx`, `EmergencyAlert.tsx`. Computes and visualizes summary telemetry, Recharts trend lines, AHA category rings, and crisis alert banners.
7. **`emergency/`**: `FamilySOSModal.tsx`. Formats emergency WhatsApp messages and provides direct `tel:118` phone call links.
8. **`dash/`**: `SodiumTrackerModal.tsx`. Manages daily DASH diet sodium consumption monitoring (2,000 mg limit).
9. **`meds/`**: `MedicationTrackerModal.tsx`. Manages hypertension medication dosage schedules and daily adherence streaks.
10. **`timer/`**: `BPRestTimerModal.tsx`. Provides a 5-minute Box Breathing relaxation timer before blood pressure measurement.
11. **`reports/`**: `ExportPdfModal.tsx`. Generates clean doctor consultation PDF reports.
12. **`reminders/`**: `ReminderModal.tsx`. Manages local alarm notification reminders.
13. **`security/`**: `SecurityBackupModal.tsx`. Manages AES-256-GCM encrypted database export and import.
14. **`common/`**: `Toast.tsx`, `ConfirmModal.tsx`, `KnowledgeGuideModal.tsx`, `ShimmerSkeleton.tsx`. Global notifications, confirmation dialogs, medical guidelines, and loading skeletons.
