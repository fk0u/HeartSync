# Chapter 31: Authentication Architecture

## 31.1 Offline-First Authentication & Identity Model

Because HeartSync operates 100% offline without a centralized authentication server or OAuth API, patient authentication is managed through:
1. **Device Physical Access Boundary**: Local device passcode / biometric authentication protects the browser session.
2. **Master Key Password Derivation**: When exporting or importing encrypted backup files (`SecurityBackupModal.tsx`), users set a local master password used by **PBKDF2** to derive the AES-256-GCM encryption key.
3. **No Unauthenticated Remote Exposure**: No remote login server exists, eliminating password reuse attacks, credential stuffing, and session hijacking risks.
