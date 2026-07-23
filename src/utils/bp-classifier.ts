import { BPCategory, BPCategoryKey } from '../types/blood-pressure';

export const BP_CATEGORIES: Record<BPCategoryKey, BPCategory> = {
  normal: {
    key: 'normal',
    label: 'Normal',
    labelEn: 'Normal',
    description: 'Tekanan darah berada dalam rentang ideal yang sehat.',
    recommendation: 'Pertahankan gaya hidup sehat, konsumsi makanan bergizi, dan tetap aktif berolahraga.',
    colorClass: 'bg-emerald-500',
    bgLightClass: 'bg-emerald-50 dark:bg-emerald-950/40',
    bgDarkClass: 'dark:bg-emerald-950/50',
    badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    borderClass: 'border-emerald-500/30',
    textClass: 'text-emerald-600 dark:text-emerald-400',
    hexColor: '#10b981',
    iconName: 'CheckCircle2'
  },
  elevated: {
    key: 'elevated',
    label: 'Meningkat (Pre-Hipertensi)',
    labelEn: 'Elevated',
    description: 'Tekanan darah cenderung lebih tinggi dari batas normal ideal.',
    recommendation: 'Kurangi asupan garam, hindari stres, tingkatkan aktivitas fisik, dan evaluasi pola tidur.',
    colorClass: 'bg-amber-500',
    bgLightClass: 'bg-amber-50 dark:bg-amber-950/40',
    bgDarkClass: 'dark:bg-amber-950/50',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    borderClass: 'border-amber-500/30',
    textClass: 'text-amber-600 dark:text-amber-400',
    hexColor: '#f59e0b',
    iconName: 'AlertCircle'
  },
  stage1: {
    key: 'stage1',
    label: 'Hipertensi Tahap 1',
    labelEn: 'Hypertension Stage 1',
    description: 'Tekanan darah terindikasi Hipertensi Ringan.',
    recommendation: 'Konsultasikan dengan dokter, ubah pola makan (diet DASH), kurangi garam, dan lakukan pengukuran rutin.',
    colorClass: 'bg-orange-500',
    bgLightClass: 'bg-orange-50 dark:bg-orange-950/40',
    bgDarkClass: 'dark:bg-orange-950/50',
    badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    borderClass: 'border-orange-500/30',
    textClass: 'text-orange-600 dark:text-orange-400',
    hexColor: '#f97316',
    iconName: 'AlertTriangle'
  },
  stage2: {
    key: 'stage2',
    label: 'Hipertensi Tahap 2',
    labelEn: 'Hypertension Stage 2',
    description: 'Tekanan darah terindikasi Hipertensi Sedang hingga Berat.',
    recommendation: 'Sangat disarankan segera berkonsultasi ke dokter untuk penanganan medis dan evaluasi obat.',
    colorClass: 'bg-rose-500',
    bgLightClass: 'bg-rose-50 dark:bg-rose-950/40',
    bgDarkClass: 'dark:bg-rose-950/50',
    badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    borderClass: 'border-rose-500/30',
    textClass: 'text-rose-600 dark:text-rose-400',
    hexColor: '#ef4444',
    iconName: 'AlertOctagon'
  },
  crisis: {
    key: 'crisis',
    label: 'Krisis Hipertensi',
    labelEn: 'Hypertensive Crisis',
    description: 'PERINGATAN: Tekanan darah sangat tinggi dan membahayakan keselamatan!',
    recommendation: 'SEGERA HUBUNGI DOKTER ATAU FASILITAS KESEHATAN TERDEKAT (IGD)! Istirahat total dan jangan panik.',
    colorClass: 'bg-purple-600',
    bgLightClass: 'bg-purple-50 dark:bg-purple-950/50',
    bgDarkClass: 'dark:bg-purple-950/70',
    badgeClass: 'bg-purple-100 text-purple-900 dark:bg-purple-900/80 dark:text-purple-200 border-purple-300 dark:border-purple-700 animate-pulse',
    borderClass: 'border-purple-600/50',
    textClass: 'text-purple-700 dark:text-purple-300',
    hexColor: '#be123c',
    iconName: 'Flame'
  }
};

/**
 * Classify Blood Pressure according to AHA / WHO guidelines
 */
export function classifyBP(systolic: number, diastolic: number): BPCategory {
  if (systolic > 180 || diastolic > 120) {
    return BP_CATEGORIES.crisis;
  }
  if (systolic >= 140 || diastolic >= 90) {
    return BP_CATEGORIES.stage2;
  }
  if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
    return BP_CATEGORIES.stage1;
  }
  if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
    return BP_CATEGORIES.elevated;
  }
  return BP_CATEGORIES.normal;
}

/**
 * Calculate Mean Arterial Pressure (MAP)
 * MAP = Diastolic + (Systolic - Diastolic) / 3
 */
export function calculateMAP(systolic: number, diastolic: number): number {
  return Math.round(diastolic + (systolic - diastolic) / 3);
}

/**
 * Calculate Pulse Pressure (PP)
 * PP = Systolic - Diastolic
 */
export function calculatePulsePressure(systolic: number, diastolic: number): number {
  return Math.round(systolic - diastolic);
}

/**
 * Classify Pulse / Heart Rate
 */
export function classifyPulse(pulse: number): { label: string; status: 'normal' | 'low' | 'high'; color: string } {
  if (pulse < 60) {
    return { label: 'Lambat (Bradikardia)', status: 'low', color: 'text-amber-500' };
  }
  if (pulse > 100) {
    return { label: 'Cepat (Takikardia)', status: 'high', color: 'text-rose-500' };
  }
  return { label: 'Normal (Istirahat)', status: 'normal', color: 'text-emerald-500' };
}
