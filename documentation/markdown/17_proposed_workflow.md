# Chapter 17: Proposed HeartSync Workflow

## 17.1 Optimized Digital Health Workflow

HeartSync transforms blood pressure monitoring into a seamless, accessible, and automated workflow:

1. **Rest Protocol Activation**: Patient clicks "Mulai Timer" to open `BPRestTimerModal.tsx` for a 5-minute Box Breathing relaxation session before measuring.
2. **Hands-Free Telemetry Entry**: Patient clicks "Dikte Suara" in `ReadingFormModal.tsx` and speaks: *"Tensi 120 per 80 nadi 72"*. The Web Speech API parser extracts Systolic = 120, Diastolic = 80, Pulse = 72 automatically.
3. **Real-Time Classification & Storage**: HeartSync classifies the reading into AHA 2017 categories, calculates MAP ($MAP = Diastolic + \frac{1}{3}(Systolic - Diastolic)$) and Pulse Pressure ($PP = Systolic - Diastolic$), updates Zustand store, invalidates TanStack Query keys `['readings']`, and persists to IndexedDB v2 (`db.readings`).
4. **Crisis Escalation**: If systolic $\ge 180$ or diastolic $\ge 120$, `EmergencyAlert.tsx` triggers a prominent crisis banner with sound alert (`playAlertSound()`), offering 1-click WhatsApp SOS dispatch (`FamilySOSModal.tsx`) and direct phone dialing (`tel:118`).
5. **Lifestyle & Calendar Tracking**: Patient inspects past monthly trends via `CalendarView.tsx` and logs sleep/screen-time habits via `HabitsTrackerModal.tsx`.
6. **Clinical Consultation**: Patient exports a clean, print-ready PDF via `ExportPdfModal.tsx` or HL7 FHIR v4 Observation JSON via `fhir-exporter.ts`.
