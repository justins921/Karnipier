// Admin session handling. The password lives only in the ADMIN_PASSWORD env var;
// a successful login sets an HMAC-signed, httpOnly cookie that expires after 30 days.
// Uses Web Crypto so it works in both middleware (edge) and route handlers.

export const SESSION_COOKIE = "piers2u_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

const encoder = new TextEncoder();

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD is not set.");
  return secret;
}

async function hmac(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function checkPassword(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password) return false;
  // Compare HMACs so the comparison is constant-length.
  return safeEqual(await hmac(password), await hmac(expected));
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  return `${expires}.${await hmac(String(expires))}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  try {
    return safeEqual(sig, await hmac(expires));
  } catch {
    return false;
  }
}
