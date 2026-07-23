# Chapter 28: Dexie.js Architecture & Migration

## 28.1 Automatic Schema Migration (v1 -> v2)

Dexie handles seamless database schema upgrades. When a user who created data on Version 1 opens the updated application, Dexie upgrades `HeartSyncDB` to Version 2 by creating the new `habits` table while preserving existing `profiles`, `readings`, and `reminders` entries without data corruption.

## 28.2 Seed Initialization (`seedInitialData()`)

On initial startup (`App.tsx` -> `useEffect`), HeartSync executes `seedInitialData()`:
```typescript
export async function seedInitialData() {
  const profileCount = await db.profiles.count();
  if (profileCount === 0) {
    const defaultProfileId = 'profile-self-default';
    const initialProfile: Profile = {
      id: defaultProfileId,
      name: 'Saya',
      relationship: 'self',
      avatar: '👤',
      targetSystolic: 120,
      targetDiastolic: 80,
      createdAt: new Date().toISOString(),
      isDefault: true
    };
    await db.profiles.add(initialProfile);
  }
}
```

This guarantees that first-time users immediately possess a valid active profile (`Saya`) without injecting artificial mock blood pressure readings.
