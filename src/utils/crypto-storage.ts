/**
 * Industry Standard AES-256-GCM Encryption Utility using Web Crypto API (window.crypto.subtle)
 * Fast, hardware-accelerated, zero-dependency, and highly secure encryption for backups & sensitive data.
 */

export interface EncryptedPayload {
  encrypted: true;
  version: string;
  algorithm: 'AES-GCM';
  keyDerivation: 'PBKDF2';
  iterations: number;
  salt: string; // Base64
  iv: string;   // Base64
  ciphertext: string; // Base64
  exportedAt: string;
}

// Convert ArrayBuffer <-> Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Derive an AES-256 key from a user password using PBKDF2
 */
async function deriveKey(password: string, salt: Uint8Array, iterations = 100000): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: 'SHA-256'
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt arbitrary JSON data with a user password using AES-256-GCM
 */
export async function encryptBackupData(data: any, password: string): Promise<EncryptedPayload> {
  const encoder = new TextEncoder();
  const jsonString = JSON.stringify(data);
  const dataBuffer = encoder.encode(jsonString);

  // Generate 16-byte random salt and 12-byte random IV
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const iterations = 100000;
  const key = await deriveKey(password, salt, iterations);

  const ciphertextBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    dataBuffer
  );

  return {
    encrypted: true,
    version: '1.1.0',
    algorithm: 'AES-GCM',
    keyDerivation: 'PBKDF2',
    iterations,
    salt: arrayBufferToBase64(salt.buffer),
    iv: arrayBufferToBase64(iv.buffer),
    ciphertext: arrayBufferToBase64(ciphertextBuffer),
    exportedAt: new Date().toISOString()
  };
}

/**
 * Decrypt an AES-256-GCM encrypted payload using the user password
 */
export async function decryptBackupData(payload: EncryptedPayload, password: string): Promise<any> {
  try {
    const salt = new Uint8Array(base64ToArrayBuffer(payload.salt));
    const iv = new Uint8Array(base64ToArrayBuffer(payload.iv));
    const ciphertext = base64ToArrayBuffer(payload.ciphertext);

    const iterations = payload.iterations || 100000;
    const key = await deriveKey(password, salt, iterations);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      ciphertext
    );

    const decoder = new TextDecoder();
    const jsonString = decoder.decode(decryptedBuffer);
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error('Password salah atau berkas cadangan terenkripsi rusak.');
  }
}
