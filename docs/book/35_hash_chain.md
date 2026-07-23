# Chapter 35: Cryptographic Hash Chain Audit

## 35.1 Implementation (`src/security/hasher.ts`)

HeartSync links every blood pressure entry into a SHA-256 cryptographic audit chain:

$ \text{Hash}_n = \text{SHA-256}(\text{Data}_n + \text{Hash}_{n-1}) $

```typescript
export async function computeAuditHash(data: string, previousHash: string = ''): Promise<string> {
  const msgUint8 = new TextEncoder().encode(data + previousHash);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

If an unauthorized process or browser extension alters a historical reading's systolic or diastolic value directly in IndexedDB, the recalculated hash chain will fail to match, triggering a data manipulation warning.
