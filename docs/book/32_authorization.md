# Chapter 32: Authorization & Multi-Profile Data Isolation

## 32.1 Profile-Based Scope Isolation

HeartSync isolates telemetry data across multiple family members on the same device using indexed profile boundaries:

- Each profile has a unique `id` (e.g. `profile-self-default`, `profile-17848071`).
- All queries executed by `useReadings()` enforce explicit profile boundaries:
  `db.readings.where('profileId').equals(activeProfileId)`
- Switching active profiles via `CustomProfileSelector.tsx` updates `activeProfileId` and invalidates query caches, guaranteeing that records belonging to Profile A are never exposed inside Profile B's dashboard or export reports.
