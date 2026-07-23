# Chapter 47: Known Issues & Technical Constraints

## 47.1 Browser Hardware & API Constraints

1. **Web Speech API Support**: Voice Dictation requires browser engines supporting `webkitSpeechRecognition` or `SpeechRecognition` (Chrome, Edge, Safari 14.1+). On unsupported browsers (Firefox desktop), clicking the Mic button displays a friendly toast message advising standard manual input.
2. **AudioContext Autoplay Policies**: Modern browsers require initial user gesture (click/tap) before allowing `AudioContext` sound synthesis. All sound effects inside `audio-fx.ts` are initialized inside user click handlers.
