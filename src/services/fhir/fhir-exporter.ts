import { BPReading, Profile } from '../../types/blood-pressure';

export interface FHIRObservationComponent {
  code: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
  };
  valueQuantity: {
    value: number;
    unit: string;
    system: string;
    code: string;
  };
}

export interface FHIRObservationResource {
  resourceType: 'Observation';
  id: string;
  status: 'final';
  category: Array<{
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
  }>;
  code: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
    text: string;
  };
  subject: {
    display: string;
  };
  effectiveDateTime: string;
  component: FHIRObservationComponent[];
  note?: Array<{ text: string }>;
}

export interface FHIRBundleResource {
  resourceType: 'Bundle';
  type: 'collection';
  timestamp: string;
  entry: Array<{
    fullUrl: string;
    resource: FHIRObservationResource;
  }>;
}

/**
 * Convert a single BPReading to HL7 FHIR v4 Observation Resource format.
 * Follows LOINC & HL7 FHIR Implementation Guide for Vital Signs.
 */
export function convertReadingToFHIR(reading: BPReading, profile?: Profile): FHIRObservationResource {
  const components: FHIRObservationComponent[] = [
    {
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '8480-6',
            display: 'Systolic blood pressure'
          }
        ]
      },
      valueQuantity: {
        value: reading.systolic,
        unit: 'mmHg',
        system: 'http://unitsofmeasure.org',
        code: 'mm[Hg]'
      }
    },
    {
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '8462-4',
            display: 'Diastolic blood pressure'
          }
        ]
      },
      valueQuantity: {
        value: reading.diastolic,
        unit: 'mmHg',
        system: 'http://unitsofmeasure.org',
        code: 'mm[Hg]'
      }
    },
    {
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '8867-4',
            display: 'Heart rate'
          }
        ]
      },
      valueQuantity: {
        value: reading.pulse,
        unit: 'beats/min',
        system: 'http://unitsofmeasure.org',
        code: '/min'
      }
    }
  ];

  const fhirResource: FHIRObservationResource = {
    resourceType: 'Observation',
    id: `hs-obs-${reading.id || Date.now()}`,
    status: 'final',
    category: [
      {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/observation-category',
            code: 'vital-signs',
            display: 'Vital Signs'
          }
        ]
      }
    ],
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '85354-9',
          display: 'Blood pressure panel with all children optional'
        }
      ],
      text: 'Blood Pressure Panel'
    },
    subject: {
      display: profile ? profile.name : 'Patient'
    },
    effectiveDateTime: reading.timestamp,
    component: components
  };

  if (reading.notes) {
    fhirResource.note = [{ text: reading.notes }];
  }

  return fhirResource;
}

/**
 * Export all profile readings into HL7 FHIR v4 Bundle Collection JSON.
 */
export function exportReadingsToFHIRBundle(readings: BPReading[], profile?: Profile): FHIRBundleResource {
  const entries = readings.map((r) => {
    const res = convertReadingToFHIR(r, profile);
    return {
      fullUrl: `urn:uuid:${res.id}`,
      resource: res
    };
  });

  return {
    resourceType: 'Bundle',
    type: 'collection',
    timestamp: new Date().toISOString(),
    entry: entries
  };
}
