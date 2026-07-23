# Chapter 22: Low-Level Architecture & Data Pipelines

## 22.1 State & Database Invalidation Pipeline

When a user records a new reading or switches patient profiles, HeartSync executes the following sequence:

```
[User Action: Click 'Simpan Catatan Tensi Real']
  |
  v
[1. Validation & Sanitization] (src/security/sanitizer.ts)
  - validateBPRange(systolic, diastolic, pulse)
  - sanitizeText(notes)
  |
  v
[2. Database Insertion] (src/db/index.ts)
  - db.readings.add({ profileId, systolic, diastolic, pulse, timestamp, ... })
  |
  v
[3. Audio & Toast Feedback] (src/utils/audio-fx.ts & useAppStore)
  - playSuccessChime() [Safe Try-Catch Web Audio]
  - addToast({ type: 'success', title, message })
  |
  v
[4. Store & Cache Invalidation] (src/store/useAppStore.ts)
  - setCacheDirty(true)
  - queryClient.invalidateQueries({ queryKey: ['readings'] })
  |
  v
[5. Reactive Hook Refetch] (src/hooks/useReadings.ts)
  - useQuery re-executes db.readings.where('profileId').equals(activeProfileId)
  - Updates 'readings', 'rawReadings', and computes 'stats' (MAP, PP, Compliance Rate)
  |
  v
[6. UI Re-render] (App.tsx / BPTrendChart / AppleHealthRings / StatCards)
  - Dynamic smooth transition without full page reload.
```
