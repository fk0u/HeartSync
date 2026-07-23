# Chapter 15: Business Process & Clinical Workflows

## 15.1 Clinical Blood Pressure Monitoring Workflow

Self-Blood Pressure Monitoring (SBPM) must follow strict medical protocols established by the American Heart Association (AHA) and European Society of Hypertension (ESH):

```
+-----------------------------------------------------------------------+
| 1. REST PROTOCOL (5 Minutes)                                           |
| Sit quietly in a quiet room, back supported, feet flat on the floor.  |
| Trigger HeartSync Box Breathing Rest Timer (BPRestTimerModal).       |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
| 2. MEASUREMENT                                                        |
| Apply cuff at heart level. Perform measurement on designated arm.    |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
| 3. TELEMETRY LOGGING                                                  |
| Open HeartSync Reading Form (Alt+N) or tap Mic for Voice Dictation.  |
| Save Systolic, Diastolic, Pulse, Arm, Posture, and Activity Tags.    |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
| 4. CLASSIFICATION & EVALUATION                                        |
| System evaluates AHA category (Normal, Elevated, Stage 1/2, Crisis).  |
| Updates trend charts, target compliance rate, and Dexie IndexedDB.   |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
| 5. CLINICAL EXPORT & CONSULTATION                                     |
| Generate PDF Report or HL7 FHIR v4 Observation JSON for Physician.   |
+-----------------------------------------------------------------------+
```
