/**
 * Shared OTP store singleton
 * Both send and verify endpoints import from here so they share the same Map.
 * In-memory is fine — OTPs are short-lived (10 min) and single-server.
 */

export interface OTPEntry {
  otp: string;
  expiry: number;       // Date.now() + 10 min
  phone: string;        // formatted phone
  attempts: number;     // wrong-guess counter (max 3)
}

// Module-level singleton — guaranteed same reference across all imports in one process
export const otpStore = new Map<string, OTPEntry>();

/** Remove all expired entries (call periodically or on each request) */
export function purgeExpired(): void {
  const now = Date.now();
  for (const [key, entry] of otpStore.entries()) {
    if (now > entry.expiry) otpStore.delete(key);
  }
}
