# Chapter 34: Cryptography & AES-256-GCM Encryption

## 34.1 Explanation & Cryptographic Model

HeartSync provides end-to-end client-side backup file encryption using the browser's native **Web Crypto API** (`window.crypto.subtle`). When users export their health database via `SecurityBackupModal.tsx`, the system protects the JSON payload using **AES-256-GCM (Galois/Counter Mode)** authenticated encryption.

Key material is derived from a user-supplied master password using **PBKDF2 (Password-Based Key Derivation Function 2)** configured with 100,000 iterations of SHA-256 and a 128-bit cryptographically secure random salt.

## 34.2 Cryptographic Key Derivation Flow

```
[User Input Master Password]  +  [Crypto Random Salt (16 Bytes)]
                                 |
                                 v
                 [PBKDF2 SHA-256 (100,000 Iterations)]
                                 |
                                 v
                    [AES-256 Encryption Key]
                                 |
                                 v
     [AES-256-GCM Encryption] + [Initialization Vector IV (12 Bytes)]
                                 |
                                 v
               [Encrypted Base64 Backup Payload]
```

## 34.3 Cryptographic Parameter Specification Tables

### Table 34.1: Cryptographic Primitives & Parameters

| Cryptographic Primitive | Standard / Algorithm | Parameter Setting | Security Purpose |
| :--- | :--- | :--- | :--- |
| Bulk Cipher | AES-GCM | 256-bit Key Length | Confidentiality and Data Integrity Tag |
| Key Derivation | PBKDF2 | SHA-256 / 100,000 Iterations | Brute-force resistance against dictionary attacks |
| Random Salt | CSPRNG | 16 Bytes (128 bits) | Rainbow table prevention |
| Initialization Vector | CSPRNG | 12 Bytes (96 bits) | Ciphertext non-repeatability |

## 34.4 Code References & Complete Source Code

- Cryptographic Module: [`src/utils/crypto-storage.ts`](file:///d:/Project/HeartSync/src/utils/crypto-storage.ts#L1-L100)
- Security Modal UI: [`src/components/security/SecurityBackupModal.tsx`](file:///d:/Project/HeartSync/src/components/security/SecurityBackupModal.tsx#L1-L150)

```typescript
export async function encryptData(data: string, secretKey: string): Promise<{ ciphertext: string; iv: string; salt: string }> {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(secretKey),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(data)
  );

  return {
    ciphertext: bufferToBase64(encrypted),
    iv: bufferToBase64(iv),
    salt: bufferToBase64(salt)
  };
}
```

## 34.5 Enterprise Best Practices

1. **Unique Salt & IV per Operation**: Always generate fresh random Uint8Array buffers for `salt` and `iv` using `crypto.getRandomValues()`. Never reuse IVs.
2. **Authenticated Encryption Mode**: Prefer AES-GCM over AES-CBC because AES-GCM incorporates an authentication tag that detects ciphertext tampering prior to decryption.

## 34.6 Technical Implementation Details

During decryption (`decryptData`), the system derives the identical key from the salt and master password, then passes the IV and ciphertext to `crypto.subtle.decrypt()`. If the password is wrong or the ciphertext has been modified, `crypto.subtle.decrypt()` throws an exception, preventing corrupted data restoration.

## 34.7 Developer Notes & Gotchas

- **Browser Web Crypto Support**: `window.crypto.subtle` is available in all modern secure contexts (HTTPS or localhost).
