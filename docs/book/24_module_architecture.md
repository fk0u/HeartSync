# Chapter 24: Module Architecture

## 24.1 Non-UI Utility & Service Modules

The engine relies on modular utilities under `src/utils/`, `src/services/`, and `src/security/`:

- **`src/utils/bp-classifier.ts`**: Pure functions `classifyBP(systolic, diastolic)` and `classifyPulse(pulse)` evaluating AHA 2017 blood pressure guidelines into Normal, Elevated, Stage 1, Stage 2, or Crisis.
- **`src/utils/audio-fx.ts`**: Web Audio API tactile sound synthesizer (`playClickSound()`, `playSuccessChime()`, `playAlertSound()`) wrapped in fail-safe try-catch blocks to prevent UI event handler blockage.
- **`src/utils/voice-recognition.ts`**: Indonesian Web Speech API wrapper (`startVoiceBPRecognition()`, `parseBPFromSpeech()`) converting spoken phrases into numeric telemetry values.
- **`src/utils/speech-reader.ts`**: Text-to-speech engine (`speakTextIndonesian()`) reading BP values out loud for elderly patients.
- **`src/utils/crypto-storage.ts`**: AES-256-GCM encryption and decryption utilities (`encryptData()`, `decryptData()`) using Web Crypto API and PBKDF2 key derivation.
- **`src/security/sanitizer.ts`**: XSS prevention (`sanitizeText()`) and numeric validation (`validateBPRange()`).
- **`src/security/hasher.ts`**: SHA-256 hash node calculator (`computeAuditHash()`) for tamper-evident history chains.
- **`src/services/fhir/fhir-exporter.ts`**: HL7 FHIR v4 Observation JSON generator (`exportToFHIR()`) mapped to LOINC `85354-9`.
