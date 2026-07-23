# HeartSync Security Policy & OpenSSF Criticality Score Alignment

## 🛡️ Security Overview

HeartSync is designed with a strict **Offline-First, Zero-Trust Architecture**. Patient health data (PHI/PII) is stored exclusively on the user's local device inside IndexedDB with end-to-end hardware-accelerated **Web Crypto API AES-256-GCM** encryption and **SHA-256 Cryptographic Audit Hash Chains**.

## 📊 OpenSSF Criticality Score Alignment

| OpenSSF Criterion | Implementation Detail | Status |
| :--- | :--- | :--- |
| **Open Source License** | MIT License | ✅ Compliant |
| **Cryptographic Integrity** | SHA-256 Hash Chain ($\text{Hash}_n = \text{SHA256}(\text{Hash}_{n-1} + \text{Data})$) | ✅ Compliant |
| **Data Encryption at Rest** | Web Crypto API AES-256-GCM + PBKDF2 100,000 Key Derivation | ✅ Compliant |
| **XSS & Injection Defense** | Automated Input Sanitizer (`sanitizeText`) & Strict Type Controls | ✅ Compliant |
| **Dependency Auditing** | Automated npm audit & GitHub Actions CI checks | ✅ Compliant |
| **Medical Interoperability** | HL7 FHIR v4 Observation (`LOINC 85354-9`) Export/Import | ✅ Compliant |

## 🔒 Threat Model & Security Controls

### 1. Data Tampering Defense
If any external script or browser extension attempts to alter IndexedDB records directly, HeartSync invalidates the record upon loading because the recalculated SHA-256 hash fails to match the stored `hash` chain node.

### 2. Physical / Shared Device Access
HeartSync supports a 4-digit Session PIN Lock and WebAuthn Biometric Authentication overlay to prevent unauthorized local viewing by family members or third parties.

### 3. Reporting Vulnerabilities
If you discover a security vulnerability within HeartSync, please do **NOT** open a public issue. Email security vulnerabilities to:
`security@heartsync.health` or submit via GitHub Security Advisory. We will respond within 48 hours and issue a CVE disclosure if applicable.
