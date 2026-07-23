# Chapter 36: HL7 FHIR v4 Integration

## 36.1 Explanation & Clinical Interoperability

HeartSync provides native compliance with the **Health Level Seven Fast Healthcare Interoperability Resources (HL7 FHIR) Release 4** standard. FHIR defines a modular JSON/XML specification used by modern Electronic Health Record (EHR) platforms (Epic, Cerner, Allscripts) and national healthcare exchanges (e.g., Indonesia's **Kemenkes SATUSEHAT**).

HeartSync exports blood pressure readings as FHIR `Bundle` resources of type `collection`, containing individual `Observation` resources mapped to international **LOINC (Logical Observation Identifiers Names and Codes)** terminology.

## 36.2 FHIR Observation Mapping Topology

```
+-----------------------------------------------------------------------+
| HL7 FHIR v4 Bundle Resource (type: 'collection')                       |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | Observation Resource (LOINC Panel: 85354-9)                     |  |
|  | Subject: Patient/profile-id                                     |  |
|  | EffectiveDateTime: ISO 8601 Timestamp                           |  |
|  |                                                                 |  |
|  | Component 1: Systolic BP (LOINC 8480-6) -> Value + mm[Hg]        |  |
|  | Component 2: Diastolic BP (LOINC 8462-4) -> Value + mm[Hg]       |  |
|  | Component 3: Heart Rate   (LOINC 8867-4) -> Value + /min        |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

## 36.3 LOINC Coding Reference Table

### Table 36.1: LOINC & UCUM Coding Specifications

| Vital Sign Component | LOINC Code | Display Name | UCUM Unit Code | UCUM Unit Display |
| :--- | :--- | :--- | :--- | :--- |
| Blood Pressure Panel | `85354-9` | Blood pressure panel with all children optional | N/A | N/A |
| Systolic Blood Pressure | `8480-6` | Systolic blood pressure | `mm[Hg]` | mmHg |
| Diastolic Blood Pressure | `8462-4` | Diastolic blood pressure | `mm[Hg]` | mmHg |
| Heart Rate / Pulse | `8867-4` | Heart rate | `/min` | /min |

## 36.4 Code References & Exporter Source Code

- FHIR Exporter Engine: [`src/services/fhir/fhir-exporter.ts`](file:///d:/Project/HeartSync/src/services/fhir/fhir-exporter.ts#L1-L70)

```typescript
import { BPReading, Profile } from '../../types/blood-pressure';

export function exportToFHIR(profile: Profile, readings: BPReading[]): string {
  const fhirBundle = {
    resourceType: 'Bundle',
    type: 'collection',
    entry: readings.map(r => ({
      resource: {
        resourceType: 'Observation',
        id: `hs-obs-${r.id}`,
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
          ]
        },
        subject: {
          reference: `Patient/${profile.id}`,
          display: profile.name
        },
        effectiveDateTime: r.timestamp,
        component: [
          {
            code: {
              coding: [{ system: 'http://loinc.org', code: '8480-6', display: 'Systolic blood pressure' }]
            },
            valueQuantity: { value: r.systolic, unit: 'mmHg', system: 'http://unitsofmeasure.org', code: 'mm[Hg]' }
          },
          {
            code: {
              coding: [{ system: 'http://loinc.org', code: '8462-4', display: 'Diastolic blood pressure' }]
            },
            valueQuantity: { value: r.diastolic, unit: 'mmHg', system: 'http://unitsofmeasure.org', code: 'mm[Hg]' }
          },
          {
            code: {
              coding: [{ system: 'http://loinc.org', code: '8867-4', display: 'Heart rate' }]
            },
            valueQuantity: { value: r.pulse, unit: '/min', system: 'http://unitsofmeasure.org', code: '/min' }
          }
        ]
      }
    }))
  };

  return JSON.stringify(fhirBundle, null, 2);
}
```

## 36.5 Enterprise Best Practices

1. **UCUM Standard Compliance**: Always use official UCUM unit strings (`mm[Hg]` and `/min`) inside `valueQuantity.code`.
2. **Category Vital Signs Binding**: Bind observations to `http://terminology.hl7.org/CodeSystem/observation-category` with code `vital-signs`.

## 36.6 Technical Implementation Details

The FHIR exporter maps every reading entry into a valid FHIR Observation JSON object. The resulting bundle can be downloaded as a `.json` file or submitted directly to an EHR gateway.

## 36.7 Developer Notes & Gotchas

- **Valid System URLs**: Ensure terminology system URLs use HTTP (e.g. `http://loinc.org`), as specified by the HL7 FHIR standard.
