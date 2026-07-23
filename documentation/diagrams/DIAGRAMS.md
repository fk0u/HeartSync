# HeartSync System Architecture Mermaid Diagram Suite

This document contains 13 formal Mermaid diagrams illustrating the complete software engineering architecture, data pipelines, security encryption flows, entity relationships, and medical interoperability mappings of the **HeartSync** ecosystem.

---

## 1. Flowchart: Telemetry Logging & AHA Risk Classification Flow

```mermaid
flowchart TD
    A[Start: User Opens HeartSync] --> B{Choose Input Mode}
    B -->|Manual Form| C[Open ReadingFormModal.tsx]
    B -->|Voice Dictation| D[Activate Web Speech API]
    D -->|Spoken Indonesian Phrase| E[parseBPFromSpeech Parser]
    E --> C
    C --> F[Input Systolic, Diastolic, Pulse, Posture, Arm, Tags, Notes]
    F --> G[Submit Form Trigger]
    G --> H{validateBPRange Sanitizer}
    H -->|Invalid Range| I[Show Error Toast & Play Alert Sound]
    I --> C
    H -->|Valid Data| J[classifyBP Evaluator]
    J --> K[Compute AHA Category: Normal / Elevated / Stage 1 / Stage 2 / Crisis]
    K --> L[db.readings.add Inserter]
    L --> M[Zustand setCacheDirty & TanStack Query Invalidation]
    M --> N[Play Success Sound & Re-render Dashboard UI]
    N --> O{Is Hypertensive Crisis?}
    O -->|Yes: Sys >= 180 or Dia >= 120| P[Trigger EmergencyAlert Banner & WhatsApp SOS Modal]
    O -->|No| Q[End: Telemetry Saved]
    P --> Q
```

---

## 2. Use Case Diagram: User Roles & System Interactions

```mermaid
graph LR
    subgraph Actors
        P[Hypertension Patient]
        C[Family Caregiver]
        D[Treating Physician]
    end

    subgraph HeartSync Ecosystem
        UC1((Record Blood Pressure))
        UC2((Use Voice Dictation))
        UC3((Run Box Breathing Timer))
        UC4((Manage Multi-Patient Profiles))
        UC5((Track Lifestyle & Habits))
        UC6((View Interactive Calendar))
        UC7((Trigger Family SOS Alert))
        UC8((Export PDF Doctor Report))
        UC9((Export HL7 FHIR v4 JSON))
        UC10((Encrypt Database Backup))
    end

    P --> UC1
    P --> UC2
    P --> UC3
    P --> UC5
    P --> UC6

    C --> UC4
    C --> UC7

    D --> UC8
    D --> UC9

    P --> UC10
    C --> UC10
```

---

## 3. Activity Diagram: 5-Minute Box Breathing & Measurement Activity

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> RestTimerActivated: Click 'Mulai Rest Protocol'
    
    state RestTimerActivated {
        [*] --> InhalePhase: 4 Seconds (Breathe In)
        InhalePhase --> HoldPhase1: 4 Seconds (Hold Air)
        HoldPhase1 --> ExhalePhase: 4 Seconds (Breathe Out)
        ExhalePhase --> HoldPhase2: 4 Seconds (Hold Empty)
        HoldPhase2 --> Check5Minutes
        Check5Minutes --> InhalePhase: Elapsed < 300s
        Check5Minutes --> TimerCompleted: Elapsed >= 300s
    }

    TimerCompleted --> MeasurementPhase: Chime Sound & Open Form
    MeasurementPhase --> TelemetryLogged: Enter Blood Pressure & Save
    TelemetryLogged --> [*]
```

---

## 4. Sequence Diagram: Profile Switch & Query Invalidation Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant CustomProfileSelector as CustomProfileSelector.tsx
    participant Store as Zustand (useAppStore)
    participant QueryClient as TanStack Query v5
    participant Hook as useReadings Hook
    participant Dexie as Dexie.js (HeartSyncDB)
    participant UI as Dashboard View Components

    User->>CustomProfileSelector: Click Profile Option (e.g. 'Ayah Budi')
    CustomProfileSelector->>Store: setActiveProfileId('profile-ayah-budi')
    Store->>Store: Update activeProfileId & setCacheDirty(true)
    Store->>QueryClient: invalidateQueries({ queryKey: ['readings'] })
    QueryClient->>Hook: Trigger Refetch Observer
    Hook->>Dexie: db.readings.where('profileId').equals('profile-ayah-budi').toArray()
    Dexie-->>Hook: Return Readings Array for 'profile-ayah-budi'
    Hook->>Hook: Re-calculate MAP, Pulse Pressure & AHA Stats
    Hook-->>UI: Update State (readings, stats, AHA rings)
    UI-->>User: Render Smooth Transition to Ayah Budi's Dashboard
```

---

## 5. State Diagram: AHA Blood Pressure Category State Machine

```mermaid
stateDiagram-v2
    [*] --> EvaluationState

    state EvaluationState {
        [*] --> CheckCrisis
        CheckCrisis --> HypertensiveCrisis: Systolic > 180 OR Diastolic > 120
        CheckCrisis --> CheckStage2: Else
        
        CheckStage2 --> Stage2Hypertension: Systolic >= 140 OR Diastolic >= 90
        CheckStage2 --> CheckStage1: Else

        CheckStage1 --> Stage1Hypertension: Systolic 130-139 OR Diastolic 80-89
        CheckStage1 --> CheckElevated: Else

        CheckElevated --> ElevatedBP: Systolic 120-129 AND Diastolic < 80
        CheckElevated --> NormalBP: Systolic < 120 AND Diastolic < 80
    }

    NormalBP --> RenderGreenBadge: Emerald Badge (#10b981)
    ElevatedBP --> RenderYellowBadge: Amber Badge (#f59e0b)
    Stage1Hypertension --> RenderOrangeBadge: Orange Badge (#f97316)
    Stage2Hypertension --> RenderRedBadge: Red Badge (#ef4444)
    HypertensiveCrisis --> RenderPulseBanner: Dark Red Pulse (#991b1b) + Audio Alert
```

---

## 6. Component Diagram: Decoupled 4-Layer Architecture

```mermaid
componentDiagram
    package "Presentation Layer (UI)" {
        [DesktopHeader]
        [MobileHeader]
        [CustomProfileSelector]
        [CalendarView]
        [ReadingFormModal]
        [HabitsTrackerModal]
        [StatCards]
        [BPTrendChart]
    }

    package "State & Query Layer" {
        [Zustand Store]
        [TanStack Query Cache]
        [TanStack Router]
    }

    package "Middleware Services Layer" {
        [Sanitizer & Hasher]
        [Crypto Storage (AES-256-GCM)]
        [HL7 FHIR Exporter]
        [PDF Report Engine]
    }

    package "Persistence & Hardware Layer" {
        [Dexie.js IndexedDB Engine]
        [Web Speech API Parser]
        [Web Audio Synthesizer]
        [PWA Service Worker]
    }

    [Presentation Layer (UI)] --> [State & Query Layer]
    [State & Query Layer] --> [Middleware Services Layer]
    [Middleware Services Layer] --> [Persistence & Hardware Layer]
```

---

## 7. ER Diagram: IndexedDB Dexie.js Schema Entity Relationships

```mermaid
erDiagram
    PROFILES ||--o{ READINGS : owns
    PROFILES ||--o{ REMINDERS : schedules
    PROFILES ||--o{ HABITS : tracks

    PROFILES {
        string id PK "Unique Profile UUID"
        string name "Patient Full Name"
        string relationship "self | parent | spouse | child"
        string avatar "Emoji Avatar Token"
        number targetSystolic "Target Systolic mmHg"
        number targetDiastolic "Target Diastolic mmHg"
        string createdAt "ISO 8601 Timestamp"
        boolean isDefault "Default Profile Flag"
    }

    READINGS {
        number id PK "Auto-increment ID"
        string profileId FK "Foreign Key to PROFILES"
        number systolic "Systolic Value mmHg"
        number diastolic "Diastolic Value mmHg"
        number pulse "Heart Rate BPM"
        string arm "left | right"
        string position "sitting | standing | lying"
        string_array tags "Activity Context Tags"
        string notes "Sanitized Text Notes"
        string timestamp "ISO 8601 UTC Timestamp"
    }

    REMINDERS {
        number id PK "Auto-increment ID"
        string profileId FK "Foreign Key to PROFILES"
        string type "medication | measurement"
        string title "Alarm Title"
        string time "HH:mm 24h Time String"
        string_array days "Active Alarm Days"
        boolean enabled "Alarm Active Toggle"
    }

    HABITS {
        number id PK "Auto-increment ID"
        string profileId FK "Foreign Key to PROFILES"
        string date "yyyy-MM-dd Date String"
        string bedtime "HH:mm Sleep Bedtime"
        string wakeTime "HH:mm Wake-up Time"
        number sleepHours "Calculated Sleep Duration"
        number screenTimeHours "Screen Time Duration"
        number outdoorMinutes "Outdoor Activity Minutes"
        string timestamp "ISO 8601 Timestamp"
    }
```

---

## 8. Deployment Diagram: Offline-First Client Architecture

```mermaid
graph TD
    subgraph Client Physical Device
        subgraph Web Browser Runtime Engine
            subgraph Service Worker Sandbox
                SW[public/sw.js PWA Cache]
                MF[public/manifest.json]
            end

            subgraph Application Memory Space
                React[React 19 DOM Renderer]
                Store[Zustand & TanStack Query State]
            end

            subgraph Browser Storage Engine
                IDB[(Dexie IndexedDB Database)]
            end

            subgraph Hardware Native APIs
                Audio[Web Audio API Synthesizer]
                Speech[Web Speech API Voice Engine]
                Crypto[Web Crypto API Subsystem]
            end
        end
    end

    SW -->|Serve Offline Static Bundles| React
    React <--> Store
    Store <--> IDB
    React --> Audio
    React --> Speech
    React --> Crypto
```

---

## 9. Authentication Flow: Zero-Trust Local & Encryption Auth

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant BackupUI as SecurityBackupModal.tsx
    participant CryptoStorage as crypto-storage.ts
    participant WebCrypto as Web Crypto API (subtle)
    participant FileSaver as Browser Download Initiator

    User->>BackupUI: Open Export Modal & Input Password
    BackupUI->>BackupUI: Validate Password Strength
    User->>BackupUI: Click 'Export Terenkripsi'
    BackupUI->>CryptoStorage: encryptData(rawJsonPayload, masterPassword)
    CryptoStorage->>WebCrypto: getRandomValues(salt 16B & iv 12B)
    CryptoStorage->>WebCrypto: importKey('raw', password, 'PBKDF2')
    CryptoStorage->>WebCrypto: deriveKey(PBKDF2 100,000 Iterations SHA-256)
    WebCrypto-->>CryptoStorage: AES-256-GCM Derived Key
    CryptoStorage->>WebCrypto: encrypt({ name: 'AES-GCM', iv }, DerivedKey, payload)
    WebCrypto-->>CryptoStorage: Encrypted ArrayBuffer Ciphertext
    CryptoStorage-->>BackupUI: Return { ciphertext, iv, salt }
    BackupUI->>FileSaver: Trigger Download 'heartsync-backup-encrypted.json'
    FileSaver-->>User: File Saved Securely on Patient Device
```

---

## 10. Encryption Flow: AES-256-GCM + PBKDF2 Pipeline

```mermaid
flowchart LR
    subgraph Input Data
        P[Master Password]
        D[Raw Patient Health JSON]
    end

    subgraph Cryptographic Key Derivation
        S[CSPRNG Salt: 16 Bytes]
        PBKDF2[PBKDF2 SHA-256 Engine<br>100,000 Iterations]
        P --> PBKDF2
        S --> PBKDF2
        PBKDF2 --> K[Derived AES-256 Key]
    end

    subgraph Authenticated Encryption
        IV[CSPRNG IV: 12 Bytes]
        GCM[AES-256-GCM Bulk Cipher]
        K --> GCM
        IV --> GCM
        D --> GCM
    end

    subgraph Encrypted Output File
        GCM --> C[Encrypted Base64 Payload<br>+ Authentication Tag]
        S --> Out[Final JSON Backup File]
        IV --> Out
        C --> Out
    end
```

---

## 11. FHIR Mapping: HL7 FHIR v4 Observation LOINC Panel

```mermaid
graph TD
    Bundle[HL7 FHIR v4 Bundle Resource<br>type: 'collection']
    
    Bundle --> Entry1[Bundle Entry 1: Observation]
    
    subgraph FHIR Observation Resource
        Entry1 --> Cat[category: vital-signs]
        Entry1 --> Code[code: LOINC 85354-9 Blood pressure panel]
        Entry1 --> Subj[subject: Patient/profile-id]
        Entry1 --> Time[effectiveDateTime: ISO 8601]
        
        Entry1 --> Comp1[Component 1: Systolic BP]
        Comp1 --> C1Code[code: LOINC 8480-6]
        Comp1 --> C1Val[valueQuantity: Value + unit 'mmHg']

        Entry1 --> Comp2[Component 2: Diastolic BP]
        Comp2 --> C2Code[code: LOINC 8462-4]
        Comp2 --> C2Val[valueQuantity: Value + unit 'mmHg']

        Entry1 --> Comp3[Component 3: Heart Rate]
        Comp3 --> C3Code[code: LOINC 8867-4]
        Comp3 --> C3Val[valueQuantity: Value + unit '/min']
    end
```

---

## 12. Folder Tree: Visual Workspace Topology

```mermaid
graph TD
    Root[HeartSync Workspace Root]
    
    Root --> Agents[.agents/ Session & Rules]
    Root --> Docs[docs/ Documentation & Book]
    Docs --> Book[docs/book/ 50 Architectural Chapters]
    
    Root --> Public[public/ Static & PWA]
    Public --> Manifest[manifest.json]
    Public --> SW[sw.js Service Worker]

    Root --> Src[src/ Source Code]
    Src --> Components[src/components/]
    Components --> Calendar[calendar/ CalendarView.tsx]
    Components --> Dashboard[dashboard/ StatCards, BPTrendChart, AppleHealthRings]
    Components --> Habits[habits/ HabitsTrackerModal.tsx]
    Components --> Layout[layout/ DesktopHeader, MobileHeader, Navigation]
    Components --> Profiles[profiles/ CustomProfileSelector.tsx]
    Components --> Readings[readings/ ReadingFormModal.tsx, ReadingCard.tsx]

    Src --> DB[src/db/ index.ts Dexie Schema]
    Src --> Hooks[src/hooks/ useReadings.ts, useProfiles.ts]
    Src --> Security[src/security/ sanitizer.ts, hasher.ts]
    Src --> Services[src/services/ fhir-exporter.ts, query-client.ts]
    Src --> Store[src/store/ useAppStore.ts Zustand]
    Src --> Utils[src/utils/ audio-fx.ts, crypto-storage.ts, voice-recognition.ts]
```

---

## 13. Dependency Graph: Core Package Interconnections

```mermaid
graph TD
    App[src/App.tsx]
    
    subgraph UI & Animation Libraries
        React[react v19.0.0]
        Lucide[lucide-react v0.469.0]
        Framer[framer-motion v12.4.7]
        Recharts[recharts v2.15.0]
    end

    subgraph State & Router Infrastructure
        Zustand[zustand v5.0.3]
        TanStackQuery[@tanstack/react-query v5.62.11]
        TanStackRouter[@tanstack/react-router v1.95.1]
    end

    subgraph Persistence & Tooling
        Dexie[dexie v4.0.10]
        JsPDF[jspdf v2.5.2]
        Rsbuild[@rsbuild/core v2.1.7]
    end

    App --> React
    App --> Lucide
    App --> Framer
    App --> Recharts
    App --> Zustand
    App --> TanStackQuery
    App --> TanStackRouter
    App --> Dexie
    App --> JsPDF
    Rsbuild --> App
```
