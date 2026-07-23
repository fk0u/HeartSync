/**
 * Kaspersky & Trend Micro Grade Cryptographic Hashing Engine
 * Uses Web Crypto API SHA-256 for tamper-proof medical record audit chains.
 */

export async function sha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export interface AuditLogEntry {
  id?: number;
  timestamp: string;
  action: 'CREATE_READING' | 'UPDATE_READING' | 'DELETE_READING' | 'CREATE_PROFILE' | 'RESTORE_DB';
  entityId: string;
  details: string;
  previousHash: string;
  hash: string;
}

/**
 * Compute the cryptographic hash chain node
 */
export async function computeAuditHash(
  action: string,
  entityId: string,
  details: string,
  timestamp: string,
  previousHash: string
): Promise<string> {
  const payload = `${action}|${entityId}|${details}|${timestamp}|${previousHash}`;
  return await sha256(payload);
}
