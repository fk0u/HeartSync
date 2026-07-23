# Chapter 18: Functional Requirements Specifications

## 18.1 Explanation & System Context

Functional requirements define the specific behaviors, data processing pipelines, user interactions, and clinical calculations that HeartSync MUST execute. Every requirement documented here is mapped directly to implemented components, hooks, services, or utilities inside the codebase.

## 18.2 Architectural Design

Functional requirements are organized into six functional subsystems:
1. **Telemetry Input & Classification Subsystem**: Captures blood pressure, pulse, arm, posture, tags, notes, and evaluates AHA 2017 risk categories.
2. **Accessibility & Hardware Subsystem**: Manages Web Speech API voice recognition and Web Audio API synthesizer feedback.
3. **Multi-Patient Profile Subsystem**: Manages profile creation, avatar selection, target thresholds, and strict query isolation.
4. **Lifestyle & Analytics Subsystem**: Manages the interactive calendar (`CalendarView.tsx`), habits tracker (`HabitsTrackerModal.tsx`), and DASH sodium counter (`SodiumTrackerModal.tsx`).
5. **Emergency Escalation Subsystem**: Formats emergency WhatsApp broadcasts (`FamilySOSModal.tsx`) and direct ambulance dialers (`tel:118`).
6. **Interoperability & Security Subsystem**: Manages HL7 FHIR v4 JSON exports, PDF generation, AES-256-GCM encryption, and SHA-256 hash auditing.

## 18.3 System Diagram

```
+-----------------------------------------------------------------------+
|                    FUNCTIONAL REQUIREMENT ROUTING                     |
+-----------------------------------------------------------------------+
       |                  |                  |                  |
       v                  v                  v                  v
+--------------+   +--------------+   +--------------+   +--------------+
| FR-001/002   |   | FR-004       |   | FR-006/007   |   | FR-009/010   |
| Reading Form |   | Custom Apple |   | Interactive  |   | PDF Doctor   |
| & Speech     |   | Profile      |   | Calendar &   |   | Report &     |
| Dictation    |   | Selector     |   | Habits Logs  |   | FHIR Export  |
+--------------+   +--------------+   +--------------+   +--------------+
```

## 18.4 Detailed Requirement Specification Tables

### Table 18.1: Complete Functional Requirements Matrix

| Requirement ID | Module / File | Description & Technical Specification | Verification Command | Status |
| :--- | :--- | :--- | :--- | :--- |
| **FR-001** | `ReadingFormModal.tsx` | Allows user to input Systolic (50-250), Diastolic (40-150), Pulse (30-220), arm, posture, tags, and notes. | `npm run lint` | Implemented |
| **FR-002** | `voice-recognition.ts` | Listens to spoken Indonesian phrases and extracts Systolic, Diastolic, and Pulse via regex parsing. | Speech API Test | Implemented |
| **FR-003** | `bp-classifier.ts` | Classifies readings into AHA 2017 categories: Normal, Elevated, Stage 1, Stage 2, or Crisis. | Unit Verification | Implemented |
| **FR-004** | `CustomProfileSelector.tsx` | Manages multi-patient profiles with isolated IndexedDB queries by `profileId`. | UI Audit | Implemented |
| **FR-005** | `BPRestTimerModal.tsx` | Provides a 5-minute Box Breathing relaxation timer before blood pressure measurement. | Timer Audit | Implemented |
| **FR-006** | `CalendarView.tsx` | Renders a monthly/yearly calendar grid with color-coded AHA badges and daily inspector drawer. | UI Audit | Implemented |
| **FR-007** | `HabitsTrackerModal.tsx` | Logs bedtime, wake time, screen time, and outdoor exercise minutes in `db.habits`. | DB Test | Implemented |
| **FR-008** | `FamilySOSModal.tsx` | Displays crisis banner, direct `tel:118` ambulance link, and pre-formatted WhatsApp SOS text. | SOS Audit | Implemented |
| **FR-009** | `ExportPdfModal.tsx` | Generates a doctor consultation PDF report with statistical summary and reading history table. | PDF Test | Implemented |
| **FR-010** | `fhir-exporter.ts` | Exports readings as HL7 FHIR v4 Observation JSON mapped to LOINC `85354-9`. | FHIR Test | Implemented |
| **FR-011** | `crypto-storage.ts` | Encrypts export backup files using AES-256-GCM and PBKDF2 (100,000 iterations). | Crypto Test | Implemented |

## 18.5 Code References

- Reading Entry Form: [`src/components/readings/ReadingFormModal.tsx`](file:///d:/Project/HeartSync/src/components/readings/ReadingFormModal.tsx#L1-L150)
- Speech Dictation Parser: [`src/utils/voice-recognition.ts`](file:///d:/Project/HeartSync/src/utils/voice-recognition.ts#L1-L80)
- AHA Risk Classifier: [`src/utils/bp-classifier.ts`](file:///d:/Project/HeartSync/src/utils/bp-classifier.ts#L1-L60)

## 18.6 Screenshots & UI Media

- Dashboard Overview: [dashboard_mockup.png](file:///d:/Project/HeartSync/docs/images/dashboard_mockup.png)

## 18.7 Enterprise Best Practices

1. **Validation at Component Boundary**: Validate all numeric inputs before invoking database mutation hooks.
2. **Deterministic Classification**: Never hardcode threshold values inside UI components; always import `classifyBP()` from `bp-classifier.ts`.

## 18.8 Technical Implementation Details

When a user submits a reading inside `ReadingFormModal.tsx`, the form executes:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const sys = parseInt(systolic);
  const dia = parseInt(diastolic);
  const pul = parseInt(pulse);

  if (!validateBPRange(sys, dia, pul)) {
    addToast({ type: 'error', title: 'Input Tidak Valid', message: 'Nilai tensi di luar batas medis aman.' });
    return;
  }

  await addReading.mutateAsync({
    profileId: activeProfileId,
    systolic: sys,
    diastolic: dia,
    pulse: pul,
    arm,
    position,
    tags,
    notes: sanitizeText(notes),
    timestamp: new Date().toISOString()
  });

  playSuccessChime();
  closeReadingModal();
};
```

## 18.9 Developer Notes & Gotchas

- **Input Trimming**: Text notes are sanitized using `sanitizeText()` from `sanitizer.ts` to prevent XSS payloads stored inside local IndexedDB.
