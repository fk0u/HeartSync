/**
 * Web Speech API Voice Recognition & BP Dictation Parser
 * Listens to Indonesian speech input and automatically extracts Systolic, Diastolic, and Pulse numbers.
 */

export interface ParsedVoiceBP {
  systolic?: number;
  diastolic?: number;
  pulse?: number;
  transcript: string;
}

export function startVoiceBPRecognition(
  onResult: (parsed: ParsedVoiceBP) => void,
  onError: (errorMsg: string) => void,
  onEnd: () => void
): { stop: () => void } | null {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError('Browser Anda tidak mendukung fitur Dikte Suara (Web Speech API).');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'id-ID';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    console.log('Recognized speech:', transcript);

    const parsed = parseBPFromSpeech(transcript);
    onResult(parsed);
  };

  recognition.onerror = (event: any) => {
    console.error('Speech recognition error:', event.error);
    onError(`Gagal mengenali suara: ${event.error}`);
  };

  recognition.onend = () => {
    onEnd();
  };

  recognition.start();

  return {
    stop: () => recognition.stop(),
  };
}

/**
 * Parse numbers from Indonesian spoken text.
 * Examples:
 * - "tensi 120 per 80" -> sys: 120, dia: 80
 * - "130 85 nadi 72" -> sys: 130, dia: 85, pulse: 72
 */
export function parseBPFromSpeech(text: string): ParsedVoiceBP {
  const cleaned = text.toLowerCase();
  
  // Extract all 2 or 3 digit numbers
  const numbers = cleaned.match(/\b\d{2,3}\b/g)?.map(Number) || [];

  let systolic: number | undefined;
  let diastolic: number | undefined;
  let pulse: number | undefined;

  if (numbers.length >= 2) {
    systolic = numbers[0];
    diastolic = numbers[1];
    if (numbers.length >= 3) {
      pulse = numbers[2];
    }
  }

  return {
    systolic,
    diastolic,
    pulse,
    transcript: text,
  };
}
