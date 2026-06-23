/**
 * Lightweight in-memory session store for dashboard auth.
 * Sessions are keyed by a random token stored in a cookie.
 * Survives restarts only while the process is alive — fine for a single-server setup.
 */

export interface SessionData {
  userId: string;
  name: string;
  email: string;
  role: string;
  createdAt: number;
}

const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours
const sessions = new Map<string, SessionData>();

export function createSession(data: SessionData): string {
  const token = generateToken();
  sessions.set(token, { ...data, createdAt: Date.now() });
  return token;
}

export function getSession(token: string | undefined): SessionData | null {
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  if (Date.now() - session.createdAt > SESSION_TTL_MS) {
    sessions.delete(token);
    return null;
  }
  return session;
}

export function deleteSession(token: string): void {
  sessions.delete(token);
}

export function purgeExpiredSessions(): void {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now - session.createdAt > SESSION_TTL_MS) sessions.delete(token);
  }
}

function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export const SESSION_COOKIE = 'dpm_session';
