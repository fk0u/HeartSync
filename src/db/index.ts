import Dexie, { type Table } from 'dexie';
import { Profile, BPReading, Reminder } from '../types/blood-pressure';

export class HeartSyncDatabase extends Dexie {
  profiles!: Table<Profile, string>;
  readings!: Table<BPReading, number>;
  reminders!: Table<Reminder, number>;

  constructor() {
    super('HeartSyncDB');
    this.version(1).stores({
      profiles: 'id, name, relationship, isDefault, createdAt',
      readings: '++id, profileId, timestamp, systolic, diastolic, pulse',
      reminders: '++id, profileId, type, time, enabled'
    });
  }
}

export const db = new HeartSyncDatabase();

/**
 * Initialize fresh database with default profile if empty.
 * NO mock data, NO fake readings, NO simulated logs. Pure real data storage!
 */
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
