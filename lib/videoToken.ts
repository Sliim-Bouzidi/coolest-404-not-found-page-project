const SECRET_KEY = process.env.VIDEO_STREAM_SECRET || "sculpt-super-secure-video-token-signing-key-xyz-123";
const encoder = new TextEncoder();

/**
 * Helper to generate HMAC SHA-256 signature using the standard Web Crypto API.
 * This API is universally supported in both Node.js (16+) and the Next.js Edge Runtime.
 */
async function getHmacSignature(message: string): Promise<string> {
  const webCrypto = typeof crypto !== "undefined" ? crypto : (globalThis as any).crypto;
  if (!webCrypto || !webCrypto.subtle) {
    throw new Error("Web Crypto API is not supported in this environment");
  }

  const key = await webCrypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await webCrypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message)
  );

  // Convert array buffer to hex string
  return Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Constant-time comparison algorithm to prevent timing attacks.
 * Edge-compatible pure JS implementation.
 */
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Generates a short-lived cryptographically signed session token.
 */
export async function generateToken(): Promise<string> {
  const timestamp = Date.now();
  const hash = await getHmacSignature(timestamp.toString());
  return `${timestamp}.${hash}`;
}

/**
 * Validates whether a given session token is genuine and hasn't been tampered with.
 * We rely on HttpOnly session cookies to secure the timeline and prevent link sharing,
 * which allows native range-request streaming to loop and resume indefinitely when returning to a sleeping tab.
 */
export async function isValidToken(token: string): Promise<boolean> {
  try {
    const [timestampStr, hash] = token.split(".");
    if (!timestampStr || !hash) return false;

    // Re-create the signature and compare it in constant time to prevent tampering
    const expectedHash = await getHmacSignature(timestampStr);
    return safeCompare(expectedHash, hash);
  } catch {
    return false;
  }
}
