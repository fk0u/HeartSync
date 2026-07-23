# Chapter 3: Preface

## Audience & Purpose

This documentation book is engineered to serve as the single, authoritative architectural blueprint and software reference manual for the HeartSync blood pressure monitoring ecosystem. It is authored for software architects, healthcare system integrators, clinical informatics specialists, frontend engineers, and security auditors who intend to understand, maintain, security-audit, or extend HeartSync.

## Technical Scope

HeartSync represents a paradigm shift in patient-controlled health record (PHR) architecture:
1. **Zero External Dependency on Centralized Cloud Infrastructure**: Built to operate entirely client-side using browser-native capabilities (*IndexedDB*, *Web Crypto API*, *Web Speech API*, *Web Audio API*).
2. **Industrial Build & Bundling Pipeline**: Engineered using the Rust-based **Rsbuild / Rspack** compiler pipeline, reducing production build times to 1.44 seconds.
3. **Medical Interoperability**: Implements standard HL7 FHIR v4 Observation payloads mapped to LOINC coding systems (`85354-9`), enabling seamless export for hospital Electronic Health Records (EHR) and national digital health portals (e.g., Kemenkes SATUSEHAT).
