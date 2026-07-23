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
 * Seed initial sample profiles & readings if database is empty
 */
export async function seedInitialData() {
  const profileCount = await db.profiles.count();
  if (profileCount === 0) {
    const defaultProfileId = 'profile-self-default';
    const parentProfileId = 'profile-parent-ibu';

    const defaultProfiles: Profile[] = [
      {
        id: defaultProfileId,
        name: 'Budi Santoso',
        relationship: 'self',
        avatar: '👨‍💼',
        age: 45,
        gender: 'male',
        targetSystolic: 120,
        targetDiastolic: 80,
        notes: 'Pola hidup aktif, rutin jalan pagi.',
        createdAt: new Date().toISOString(),
        isDefault: true
      },
      {
        id: parentProfileId,
        name: 'Ibu Maryam',
        relationship: 'parent',
        avatar: '👵',
        age: 68,
        gender: 'female',
        targetSystolic: 130,
        targetDiastolic: 85,
        notes: 'Riwayat hipertensi ringan. Obat: Amlodipine 5mg pagi.',
        createdAt: new Date().toISOString(),
        isDefault: false
      }
    ];

    await db.profiles.bulkAdd(defaultProfiles);

    // Generate 10 days of realistic sample readings for Budi
    const now = new Date();
    const sampleReadings: BPReading[] = [];

    const budiData = [
      { daysAgo: 9, time: '07:30', sys: 122, dia: 78, pulse: 72, pos: 'duduk', arm: 'kiri', tags: ['Bangun Tidur', 'Santai'], notes: 'Kondisi segar' },
      { daysAgo: 8, time: '08:00', sys: 118, dia: 76, pulse: 68, pos: 'duduk', arm: 'kiri', tags: ['Bangun Tidur'], notes: 'Sensasi nyaman' },
      { daysAgo: 7, time: '19:15', sys: 128, dia: 82, pulse: 75, pos: 'duduk', arm: 'kanan', tags: ['Pasca Olahraga'], notes: 'Setelah jalan santai' },
      { daysAgo: 6, time: '07:45', sys: 124, dia: 79, pulse: 70, pos: 'duduk', arm: 'kiri', tags: ['Bangun Tidur'] },
      { daysAgo: 5, time: '20:00', sys: 134, dia: 86, pulse: 78, pos: 'duduk', arm: 'kiri', tags: ['Stres', 'Bekerja'], notes: 'Lembur pekerjaan' },
      { daysAgo: 4, time: '07:30', sys: 120, dia: 78, pulse: 69, pos: 'duduk', arm: 'kiri', tags: ['Bangun Tidur'] },
      { daysAgo: 3, time: '18:30', sys: 126, dia: 81, pulse: 74, pos: 'duduk', arm: 'kanan', tags: ['Setelah Makan'] },
      { daysAgo: 2, time: '07:15', sys: 119, dia: 77, pulse: 67, pos: 'duduk', arm: 'kiri', tags: ['Bangun Tidur'] },
      { daysAgo: 1, time: '19:00', sys: 123, dia: 80, pulse: 71, pos: 'duduk', arm: 'kiri', tags: ['Sebelum Tidur'] },
      { daysAgo: 0, time: '08:00', sys: 121, dia: 79, pulse: 70, pos: 'duduk', arm: 'kiri', tags: ['Bangun Tidur', 'Santai'], notes: 'Merasa sangat sehat' }
    ];

    budiData.forEach(item => {
      const date = new Date(now);
      date.setDate(date.getDate() - item.daysAgo);
      const [h, m] = item.time.split(':');
      date.setHours(parseInt(h), parseInt(m), 0, 0);

      sampleReadings.push({
        profileId: defaultProfileId,
        systolic: item.sys,
        diastolic: item.dia,
        pulse: item.pulse,
        timestamp: date.toISOString(),
        position: item.pos as any,
        arm: item.arm as any,
        tags: item.tags,
        notes: item.notes
      });
    });

    // Sample readings for Ibu Maryam
    const ibuData = [
      { daysAgo: 5, time: '08:00', sys: 138, dia: 88, pulse: 76, pos: 'duduk', arm: 'kiri', tags: ['Sesudah Obat'], notes: 'Minum Amlodipin 5mg' },
      { daysAgo: 3, time: '08:15', sys: 142, dia: 92, pulse: 80, pos: 'duduk', arm: 'kiri', tags: ['Bangun Tidur'], notes: 'Sedikit pusing' },
      { daysAgo: 1, time: '08:00', sys: 135, dia: 85, pulse: 74, pos: 'duduk', arm: 'kiri', tags: ['Sesudah Obat'] },
      { daysAgo: 0, time: '07:30', sys: 132, dia: 84, pulse: 72, pos: 'duduk', arm: 'kiri', tags: ['Sesudah Obat'], notes: 'Kondisi stabil' }
    ];

    ibuData.forEach(item => {
      const date = new Date(now);
      date.setDate(date.getDate() - item.daysAgo);
      const [h, m] = item.time.split(':');
      date.setHours(parseInt(h), parseInt(m), 0, 0);

      sampleReadings.push({
        profileId: parentProfileId,
        systolic: item.sys,
        diastolic: item.dia,
        pulse: item.pulse,
        timestamp: date.toISOString(),
        position: item.pos as any,
        arm: item.arm as any,
        tags: item.tags,
        notes: item.notes
      });
    });

    await db.readings.bulkAdd(sampleReadings);

    // Initial reminders
    const initialReminders: Reminder[] = [
      {
        profileId: defaultProfileId,
        title: 'Cek Tensi Pagi Hari',
        type: 'measurement',
        time: '07:00',
        days: [0, 1, 2, 3, 4, 5, 6],
        enabled: true,
        notes: 'Ukur sebelum sarapan dalam keadaan santai.'
      },
      {
        profileId: parentProfileId,
        title: 'Minum Obat Amlodipine 5mg',
        type: 'medication',
        time: '08:00',
        days: [0, 1, 2, 3, 4, 5, 6],
        enabled: true,
        dosage: '1 tablet (5mg)',
        notes: 'Diminum sesudah sarapan.'
      }
    ];

    await db.reminders.bulkAdd(initialReminders);
  }
}
