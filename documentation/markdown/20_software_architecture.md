# Chapter 20: Software Architecture Overview

## 20.1 Explanation & System Context

HeartSync is engineered using a **Decoupled Client-Side Layered Architecture**. The system operates entirely inside the user's browser engine without requiring a server-side runtime, remote application server, or cloud database. Every architectural decision prioritizes zero-latency user interaction, type safety, security, and offline reliability.

## 20.2 Architectural Layer Specification

The architecture is partitioned into four explicit layers:

```
+-----------------------------------------------------------------------+
| 1. PRESENTATION LAYER                                                 |
|    - Pages: Dashboard, History, Reports, Reminders                    |
|    - Layout: DesktopHeader, MobileHeader, Navigation                  |
|    - Components: CustomProfileSelector, CalendarView, ReadingCard     |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
| 2. STATE & ROUTING LAYER                                              |
|    - Zustand Global Store: useAppStore (UI state & toast queue)        |
|    - TanStack Query v5: Async memory cache & invalidation engine      |
|    - TanStack Router v1: Code-based type-safe router                  |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
| 3. MIDDLEWARE & SECURITY SERVICES LAYER                               |
|    - Sanitizer: HTML tag stripping & numerical validation             |
|    - Hasher: SHA-256 tamper-evident audit hash chain                  |
|    - Crypto Storage: AES-256-GCM + PBKDF2 100,000 iterations          |
|    - FHIR Exporter: HL7 FHIR v4 Observation LOINC 85354-9 generator    |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
| 4. DATABASE & HARDWARE ENGINE LAYER                                   |
|    - Dexie.js (IndexedDB v2): profiles, readings, reminders, habits   |
|    - Web Speech API: Indonesian voice dictation parser                |
|    - Web Audio API: Haptic tactile sound synthesizer                  |
|    - Service Worker: PWA offline asset cache                          |
+-----------------------------------------------------------------------+
```

## 20.3 Detailed Data & Layer Flow Tables

### Table 20.1: Layer Responsibilities & Contracts

| Layer Name | Primary Technology | Core Files | Responsibility |
| :--- | :--- | :--- | :--- |
| **Presentation** | React 19 + Tailwind | `src/App.tsx`, `src/components/*` | UI rendering, user interaction, animation |
| **State & Routing** | Zustand + TanStack Query | `src/store/*`, `src/services/*` | Reactive cache management, active profile state |
| **Middleware** | Web Crypto + LOINC | `src/security/*`, `src/services/fhir/*` | Data sanitization, cryptographic encryption, FHIR export |
| **Persistence** | Dexie.js (IndexedDB v2) | `src/db/index.ts` | Local NoSQL storage, versioning, indexing |

## 20.4 Code References

- App Root Layout: [`src/App.tsx`](file:///d:/Project/HeartSync/src/App.tsx#L1-L150)
- Store Implementation: [`src/store/useAppStore.ts`](file:///d:/Project/HeartSync/src/store/useAppStore.ts#L1-L90)
- Database Engine: [`src/db/index.ts`](file:///d:/Project/HeartSync/src/db/index.ts#L1-L60)

## 20.5 Screenshots & Architecture Visuals

- High-Level Architecture Diagram: [architecture_diagram.png](file:///d:/Project/HeartSync/docs/images/architecture_diagram.png)

## 20.6 Enterprise Best Practices

1. **Strict Decoupling**: Components must never execute direct raw IndexedDB calls; they must consume custom hooks (`useReadings`, `useProfiles`).
2. **Immutability**: Store state mutations inside Zustand must use immutable update patterns.

## 20.7 Technical Implementation Details

The reactivity loop between Zustand, TanStack Query, and Dexie is configured as follows:
```typescript
// Changing Active Profile in Zustand triggers TanStack Query Invalidation
setActiveProfileId: (id: string) => {
  set({ activeProfileId: id, isCacheDirty: true });
  queryClient.invalidateQueries({ queryKey: ['readings'] });
}
```

## 20.8 Developer Notes & Gotchas

- **No Server API Calls**: Do not introduce `fetch()` or `axios` calls to external endpoints for patient telemetry.
