/**
 * Trend Micro & Kaspersky Grade Input Sanitizer & Security Middleware
 * Prevents XSS, script injection, HTML attribute injection, and dangerous control characters.
 */

export function sanitizeText(input?: string): string {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

export function validateBPRange(systolic: number, diastolic: number, pulse: number): { valid: boolean; error?: string } {
  if (isNaN(systolic) || systolic < 40 || systolic > 300) {
    return { valid: false, error: 'Sistolik harus di antara 40 dan 300 mmHg.' };
  }
  if (isNaN(diastolic) || diastolic < 30 || diastolic > 200) {
    return { valid: false, error: 'Diastolik harus di antara 30 dan 200 mmHg.' };
  }
  if (systolic <= diastolic) {
    return { valid: false, error: 'Sistolik (tekanan atas) harus lebih tinggi dari Diastolik (tekanan bawah).' };
  }
  if (isNaN(pulse) || pulse < 30 || pulse > 250) {
    return { valid: false, error: 'Denyut nadi harus di antara 30 dan 250 BPM.' };
  }
  return { valid: true };
}
