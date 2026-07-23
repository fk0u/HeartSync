# Chapter 8: Introduction to HeartSync Architecture

## 8.1 Explanation & Clinical Context

HeartSync is an open-source, client-side progressive web application engineered to solve critical challenges in self-blood pressure monitoring (SBPM), patient data privacy, and clinical communication with healthcare providers. Built as a zero-trust, offline-first digital health ecosystem, HeartSync eliminates patient vulnerability to cloud data breaches by guaranteeing that 100% of patient health data remains stored on the user's physical device inside an encrypted IndexedDB database.

In modern healthcare, hypertension (persistently elevated blood pressure) affects over 1.28 billion adults globally. Effective clinical management requires consistent out-of-office blood pressure tracking. HeartSync provides a bridge between daily patient self-measurements and formal clinical diagnosis by converting raw telemetry into standardized **HL7 FHIR v4 Observation** resources and print-ready medical PDF reports.

## 8.2 Architectural Design

The system is constructed around three core architectural tenets:
1. **Absolute Data Sovereignty**: All telemetry, demographic profiles, medication schedules, and habit logs reside strictly inside local browser storage via **Dexie.js (IndexedDB v2)**.
2. **Accessible Medical UX**: Adheres to Apple HIG / SwiftUI visual guidelines, incorporating hands-free Indonesian voice dictation via the **Web Speech API**, safe audio synthesis via the **Web Audio API**, high-contrast color badges, and a 5-minute Box Breathing rest protocol.
3. **High-Performance Rust Infrastructure**: Built with **Rsbuild v2 (Rspack)** and **React 19 Native**, reducing production compilation time to 1.44 seconds and bundle CSS size by 31.5%.

## 8.3 System Diagram

```
+-----------------------------------------------------------------------+
|                       PRESENTATION LAYER (UI)                         |
|  React 19 | Tailwind CSS | DesktopHeader | MobileHeader | Navigation  |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                   STATE & QUERY MANAGEMENT LAYER                      |
|      Zustand Store (useAppStore)  <--->  TanStack Query v5 Cache      |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                  MIDDLEWARE & SECURITY SERVICES                       |
|   Sanitizer  |  Hasher (SHA-256)  |  AES-256-GCM  |  FHIR Exporter    |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                    PERSISTENCE & HARDWARE LAYER                       |
|  Dexie.js (IndexedDB v2) | Web Speech API | Web Audio API | PWA SW    |
+-----------------------------------------------------------------------+
```

## 8.4 Detailed Specification Tables

### Table 8.1: Core Infrastructure Stack & Versioning

| Component Layer | Technology Package | Version | Purpose |
| :--- | :--- | :--- | :--- |
| Compiler / Bundler | `@rsbuild/core` (Rspack) | v2.1.7 | Rust-powered production build toolchain |
| UI Framework | `react` / `react-dom` | v19.0.0 | Component rendering engine |
| Language | `typescript` | v5.7.3 | Static type safety and contract verification |
| Styling Engine | `tailwindcss` | v3.4.17 | Utility-first CSS styling system |
| Router | `@tanstack/react-router` | v1.95.1 | Type-safe code-based application routing |
| Query Engine | `@tanstack/react-query` | v5.62.11 | Async state caching and invalidation |
| Database Engine | `dexie` / `dexie-react-hooks` | v4.0.10 | Client-side IndexedDB wrapper |
| PDF Renderer | `jspdf` / `jspdf-autotable` | v2.5.2 | Client-side doctor report generation |

## 8.5 Code References & Implementation

- Primary Root Mounting: [`src/main.tsx`](file:///d:/Project/HeartSync/src/main.tsx#L1-L30)
- Application Container: [`src/App.tsx`](file:///d:/Project/HeartSync/src/App.tsx#L1-L150)
- Database Definition: [`src/db/index.ts`](file:///d:/Project/HeartSync/src/db/index.ts#L1-L60)

## 8.6 Screenshots & UI References

- Generated Architecture Diagram: [architecture_diagram.png](file:///d:/Project/HeartSync/docs/images/architecture_diagram.png)
- Generated Dashboard Mockup: [dashboard_mockup.png](file:///d:/Project/HeartSync/docs/images/dashboard_mockup.png)

## 8.7 Enterprise Best Practices

1. **Zero External Telemetry**: Never load third-party analytics or remote tracking scripts.
2. **Type-Safe Boundary Props**: All components must declare explicit TypeScript interface props.
3. **Fail-Safe Web APIs**: Wrap hardware APIs (`Web Speech API`, `Web Audio API`) in try-catch blocks to prevent UI event blocking on unsupported engines.

## 8.8 Technical Implementation Details

HeartSync initializes the database seed during the initial React render cycle (`App.tsx` -> `useEffect`):
```typescript
useEffect(() => {
  seedInitialData().catch(console.error);
}, []);
```
If no default profile exists, `seedInitialData()` creates the `profile-self-default` entry with default targets ($120/80\text{ mmHg}$).

## 8.9 Developer Notes & Gotchas

- **Dev Server Port**: Default server port is `3000` via `rsbuild.config.ts`.
- **HMR Behavior**: Hot Module Replacement (HMR) preserves Zustand store state across code updates.
