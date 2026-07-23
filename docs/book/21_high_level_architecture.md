# Chapter 21: High-Level Architecture

## 21.1 High-Level Component Topology

HeartSync operates as a single-page progressive web application served via Rsbuild Rspack static bundles. The high-level topology operates entirely client-side:

```
[User Browser Node]
  |
  +---> [PWA Service Worker Cache (public/sw.js)]
  |
  +---> [React 19 Application Root (src/main.tsx)]
         |
         +---> [QueryClientProvider (TanStack Query v5)]
         |      |
         |      +---> [RouterProvider (TanStack Router v1)]
         |             |
         |             +---> [App Component (src/App.tsx)]
         |                    |
         |                    +---> [Header (DesktopHeader / MobileHeader)]
         |                    +---> [Tab Views (Dashboard / History / Reports / Reminders)]
         |                    +---> [Modals Container (Reading, Profile, PDF, Habits, SOS)]
         |                    +---> [ToastContainer (Global Notifications)]
         |
         +---> [Dexie.js Engine (HeartSyncDB v2 IndexedDB)]
```

## 21.2 Data Sovereignty & Offline Execution Model
Because there are no outbound API endpoints for patient records, HeartSync exhibits zero network latency during telemetry reads, writes, and profile switches. Network requests occur strictly when downloading static assets or initializing the Service Worker cache.
