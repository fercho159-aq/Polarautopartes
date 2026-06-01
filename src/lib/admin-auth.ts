// Credenciales hardcodeadas y helpers de sesión para el panel /admin/*.
// Edge-runtime compatible: usa Web Crypto API (sin Buffer ni node:crypto).

export const ADMIN_USERNAME = 'polarautopartes';
export const ADMIN_PASSWORD = 'Polar*2026';

export const SESSION_COOKIE_NAME = 'polar_admin_session';
export const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas

// Llave de firma HMAC para la cookie. Cambiarla invalida todas las sesiones activas.
const SESSION_SECRET = 'polar-admin-hmac-v1-9f3a7c2e1b5d8a4f';

function bytesToBase64Url(bytes: Uint8Array): string {
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmacSign(data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return bytesToBase64Url(new Uint8Array(sig));
}

// Comparación en tiempo constante para evitar timing attacks sobre el password.
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export function credentialsMatch(username: string, password: string): boolean {
  // Importante: evaluar ambos lados aunque uno falle, para mantener tiempo constante.
  const userOk = timingSafeEqual(username, ADMIN_USERNAME);
  const passOk = timingSafeEqual(password, ADMIN_PASSWORD);
  return userOk && passOk;
}

export async function createSessionToken(username: string): Promise<string> {
  const expiry = Date.now() + SESSION_DURATION_MS;
  const payload = `${username}.${expiry}`;
  const sig = await hmacSign(payload);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [, expiryStr] = parts;
  const expiry = parseInt(expiryStr, 10);
  if (isNaN(expiry) || expiry < Date.now()) return false;
  const expectedSig = await hmacSign(`${parts[0]}.${parts[1]}`);
  return timingSafeEqual(parts[2], expectedSig);
}
