import { BPReading } from '../types/blood-pressure';
import { calculateMAP, calculatePulsePressure } from './bp-classifier';
import { parseISO, getHours } from 'date-fns';

export interface AdvancedMedicalMetrics {
  morningAvgSystolic: number;
  morningAvgDiastolic: number;
  eveningAvgSystolic: number;
  eveningAvgDiastolic: number;
  morningSurge: number; // Difference between morning and evening systolic
  systolicSD: number; // Standard Deviation
  diastolicSD: number;
  systolicCV: number; // Coefficient of Variation (%)
  estimatedArterialAge?: number;
  variabilityRiskLevel: 'low' | 'moderate' | 'high';
}

/**
 * Compute Advanced Cardiovascular Metrics (Circadian dipping, SD, CV%, Vascular Age)
 */
export function computeAdvancedAnalytics(readings: BPReading[], patientAge?: number): AdvancedMedicalMetrics {
  if (!readings || readings.length === 0) {
    return {
      morningAvgSystolic: 0,
      morningAvgDiastolic: 0,
      eveningAvgSystolic: 0,
      eveningAvgDiastolic: 0,
      morningSurge: 0,
      systolicSD: 0,
      diastolicSD: 0,
      systolicCV: 0,
      variabilityRiskLevel: 'low'
    };
  }

  const morningReadings: BPReading[] = [];
  const eveningReadings: BPReading[] = [];

  let sumSys = 0;
  let sumDia = 0;

  readings.forEach((r) => {
    sumSys += r.systolic;
    sumDia += r.diastolic;

    const hour = getHours(parseISO(r.timestamp));
    if (hour >= 4 && hour <= 11) {
      morningReadings.push(r);
    } else if (hour >= 18 && hour <= 23) {
      eveningReadings.push(r);
    }
  });

  const total = readings.length;
  const meanSys = sumSys / total;
  const meanDia = sumDia / total;

  // Standard Deviation (SD) calculation
  let sysVarianceSum = 0;
  let diaVarianceSum = 0;

  readings.forEach((r) => {
    sysVarianceSum += Math.pow(r.systolic - meanSys, 2);
    diaVarianceSum += Math.pow(r.diastolic - meanDia, 2);
  });

  const sysSD = Math.sqrt(sysVarianceSum / total);
  const diaSD = Math.sqrt(diaVarianceSum / total);

  // Coefficient of Variation (CV% = SD / Mean * 100)
  const sysCV = meanSys > 0 ? (sysSD / meanSys) * 100 : 0;

  // Morning vs Evening Averages
  const morningAvgSys = morningReadings.length > 0 ? Math.round(morningReadings.reduce((acc, curr) => acc + curr.systolic, 0) / morningReadings.length) : Math.round(meanSys);
  const morningAvgDia = morningReadings.length > 0 ? Math.round(morningReadings.reduce((acc, curr) => acc + curr.diastolic, 0) / morningReadings.length) : Math.round(meanDia);

  const eveningAvgSys = eveningReadings.length > 0 ? Math.round(eveningReadings.reduce((acc, curr) => acc + curr.systolic, 0) / eveningReadings.length) : Math.round(meanSys);
  const eveningAvgDia = eveningReadings.length > 0 ? Math.round(eveningReadings.reduce((acc, curr) => acc + curr.diastolic, 0) / eveningReadings.length) : Math.round(meanDia);

  const surge = morningAvgSys - eveningAvgSys;

  // Risk Classification
  let riskLevel: 'low' | 'moderate' | 'high' = 'low';
  if (sysCV > 15 || sysSD > 15) {
    riskLevel = 'high';
  } else if (sysCV > 10 || sysSD > 10) {
    riskLevel = 'moderate';
  }

  // Estimated Arterial Age calculation (Framingham Heart Study formula approximation)
  let estimatedAge: number | undefined;
  if (patientAge && meanSys > 0) {
    const sysDiff = meanSys - 120;
    const diaDiff = meanDia - 80;
    const ageAdjustment = Math.round(sysDiff * 0.35 + diaDiff * 0.25);
    estimatedAge = Math.max(18, patientAge + ageAdjustment);
  }

  return {
    morningAvgSystolic: morningAvgSys,
    morningAvgDiastolic: morningAvgDia,
    eveningAvgSystolic: eveningAvgSys,
    eveningAvgDiastolic: eveningAvgDia,
    morningSurge: surge,
    systolicSD: Math.round(sysSD * 10) / 10,
    diastolicSD: Math.round(diaSD * 10) / 10,
    systolicCV: Math.round(sysCV * 10) / 10,
    estimatedArterialAge: estimatedAge,
    variabilityRiskLevel: riskLevel
  };
}
