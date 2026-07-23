# Chapter 29: State Management Architecture

## 29.1 Dual-Store Reactive Model (Zustand + TanStack Query)

HeartSync decouples UI transient state management from asynchronous data fetching:

1. **Zustand (`src/store/useAppStore.ts`)**: Manages modal visibility states (`isReadingModalOpen`, `isProfileModalOpen`, `isExportPdfModalOpen`), toast notification queue, active profile selection (`activeProfileId`), and cache dirty flags.
2. **TanStack Query v5 (`src/services/query-client.ts` & `src/hooks/useReadings.ts`)**: Manages asynchronous IndexedDB query caching under query key `['readings', activeProfileId]`.

```typescript
// Zustand Store Action Invalidation Integration
setActiveProfileId: (id) => {
  set({ activeProfileId: id, isCacheDirty: true });
  queryClient.invalidateQueries({ queryKey: ['readings'] });
},
setCacheDirty: (dirty) => {
  set({ isCacheDirty: dirty, cacheTimestamp: Date.now() });
  if (dirty) {
    queryClient.invalidateQueries({ queryKey: ['readings'] });
  }
}
```
