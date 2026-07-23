# Chapter 37: Data Flow Specifications

## 37.1 Voice Dictation Speech-to-Text Telemetry Flow

```
[User Clicks Mic Button] (ReadingFormModal.tsx)
  |
  v
[startVoiceBPRecognition()] (src/utils/voice-recognition.ts)
  - SpeechRecognition lang = 'id-ID'
  |
  v
[User Speaks: "Tensi 120 per 80 nadi 72"]
  |
  v
[parseBPFromSpeech(transcript)]
  - Regex match: (\d{2,3})\s*(?:per|\/)\s*(\d{2,3}) -> Systolic: 120, Diastolic: 80
  - Regex match: (?:nadi|heart rate|pulse)\s*(\d{2,3}) -> Pulse: 72
  |
  v
[onResult Callback]
  - setState({ systolic: '120', diastolic: '80', pulse: '72' })
  - playSuccessChime()
```
