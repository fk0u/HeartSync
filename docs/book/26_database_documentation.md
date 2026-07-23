# Chapter 26: Database Documentation & Dexie Schema

## 26.1 Explanation & Database Model

HeartSync uses **Dexie.js (v4.0.10)** as its Object-Relational Mapping (ORM) and abstraction layer over the browser's native **IndexedDB** database. IndexedDB is a transactional NoSQL key-value store capable of holding hundreds of megabytes of structured data directly within the browser client.

HeartSync defines a database named `HeartSyncDB` containing four core object stores:
1. `profiles`: Demographics, target blood pressure thresholds, and default profile flag.
2. `readings`: Blood pressure measurements, pulse rate, arm used, posture, tags, and notes.
3. `reminders`: Medication schedule alarms and blood pressure measurement reminder times.
4. `habits`: Lifestyle logs including sleep hours, screen time, and outdoor activity.

## 26.2 Schema Evolution & Migration Architecture

Dexie supports declarative database versioning. When updating from Schema Version 1 to Version 2, Dexie creates the new `habits` table automatically without corrupting existing records inside `profiles`, `readings`, or `reminders`:

```
+-----------------------------------------------------------------------+
| HeartSyncDB Version 1                                                 |
| Stores: profiles, readings, reminders                                 |
+-----------------------------------------------------------------------+
                                   |
                                   | (Automatic Zero-Data-Loss Migration)
                                   v
+-----------------------------------------------------------------------+
| HeartSyncDB Version 2                                                 |
| Stores: profiles, readings, reminders, habits [NEW]                   |
+-----------------------------------------------------------------------+
```

## 26.3 Detailed Schema Data Dictionaries

### Table 26.1: Object Store Indexes & Keys

| Store Name | Primary Key | Key Type | Indexed Secondary Fields | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `profiles` | `id` | `string` | `name`, `relationship`, `isDefault`, `createdAt` | Patient profiles |
| `readings` | `id` | `number` (Auto) | `profileId`, `timestamp`, `systolic`, `diastolic`, `pulse` | Telemetry logs |
| `reminders` | `id` | `number` (Auto) | `profileId`, `type`, `time`, `enabled` | Alarm schedules |
| `habits` | `id` | `number` (Auto) | `profileId`, `date`, `timestamp` | Lifestyle tracking |

### Table 26.2: `readings` Data Dictionary

| Column Field | Data Type | Constraint / Range | Description |
| :--- | :--- | :--- | :--- |
| `id` | `number` | Auto-increment Primary Key | Unique reading entry identifier |
| `profileId` | `string` | Foreign Key -> `profiles.id` | Profile owner boundary |
| `systolic` | `number` | $50 \text{ to } 250\text{ mmHg}$ | Peak systolic pressure |
| `diastolic` | `number` | $40 \text{ to } 150\text{ mmHg}$ | Minimum diastolic pressure |
| `pulse` | `number` | $30 \text{ to } 220\text{ BPM}$ | Heart rate per minute |
| `arm` | `'left' \| 'right'` | Enum String | Arm used for measurement |
| `position` | `'sitting' \| 'standing' \| 'lying'` | Enum String | Posture during measurement |
| `tags` | `string[]` | Array of Strings | Activity context tags |
| `notes` | `string` | Optional Sanitized Text | Patient observations |
| `timestamp` | `string` | ISO 8601 UTC String | Precision stempel waktu |

## 26.4 Code References

- Schema Class Definition: [`src/db/index.ts`](file:///d:/Project/HeartSync/src/db/index.ts#L1-L60)
- TypeScript Interface Types: [`src/types/blood-pressure.ts`](file:///d:/Project/HeartSync/src/types/blood-pressure.ts#L1-L100)

## 26.5 Enterprise Best Practices

1. **Explicit Indexing**: Always index fields used in `.where()` filter clauses (`profileId`, `timestamp`).
2. **Transactional Safety**: Wrap multi-table operations inside Dexie transaction blocks (`db.transaction('rw', db.readings, db.profiles, ...)`).

## 26.6 Technical Implementation Details

The database class constructor initializes schema versions explicitly:
```typescript
export class HeartSyncDatabase extends Dexie {
  profiles!: Table<Profile, string>;
  readings!: Table<BPReading, number>;
  reminders!: Table<Reminder, number>;
  habits!: Table<HabitLog, number>;

  constructor() {
    super('HeartSyncDB');
    this.version(1).stores({
      profiles: 'id, name, relationship, isDefault, createdAt',
      readings: '++id, profileId, timestamp, systolic, diastolic, pulse',
      reminders: '++id, profileId, type, time, enabled'
    });

    this.version(2).stores({
      profiles: 'id, name, relationship, isDefault, createdAt',
      readings: '++id, profileId, timestamp, systolic, diastolic, pulse',
      reminders: '++id, profileId, type, time, enabled',
      habits: '++id, profileId, date, timestamp'
    });
  }
}
```

## 26.7 Developer Notes & Gotchas

- **Auto-Increment IDs**: Note that `readings.id`, `reminders.id`, and `habits.id` are auto-incrementing numbers (`++id`), whereas `profiles.id` is a string UUID.
