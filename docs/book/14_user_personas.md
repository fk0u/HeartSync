# Chapter 14: User Personas & Clinical Analysis

## 14.1 Persona A: Pak Budi (58 Years Old) — Chronic Hypertension Patient

- **Demographics**: Retired Civil Servant, diagnosed with Essential Hypertension 4 years ago. Prescribed daily Amlodipine 5mg.
- **Goals**: Maintain consistent daily blood pressure records, avoid missing daily medication doses, and bring clean reports to monthly hospital checkups.
- **Pain Points**: Small UI fonts on standard mobile apps, confusing navigation menus, tendency to forget exact BP numbers by the time of hospital consultation, anxiety during clinical measurements.
- **HeartSync Solution**: Apple HIG high-contrast UI, **Voice Dictation (Web Speech API)**, 5-minute Box Breathing rest timer (`BPRestTimerModal.tsx`), **Medication Schedule Tracker** with adherence streaks, and 1-click **PDF Doctor Export**.

## 14.2 Persona B: Siska (32 Years Old) — Family Caregiver

- **Demographics**: Working professional living in a separate city from her aging parents.
- **Goals**: Remotely monitor her father's blood pressure trends and receive immediate alerts during hypertensive crises.
- **Pain Points**: Inability to inspect paper logbooks kept by her parents, worry over sudden medical emergencies while her father is home alone.
- **HeartSync Solution**: **Custom Profile Selector** (`CustomProfileSelector.tsx`) for managing multiple family members on a single device, and **1-Tap WhatsApp SOS Broadcast** (`FamilySOSModal.tsx`) with instant direct dial to emergency services (`tel:118`).
