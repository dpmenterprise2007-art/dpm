/**
 * OTP Verify API
 * Checks the submitted OTP against the shared store and marks the lead verified.
 *
 * POST /api/leads/otp/verify
 * Body: { leadId?: string, phone?: string, otp: string }
 */
import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { leads } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { otpStore, purgeExpired } from '../../../../lib/otp-store.js';

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return digits;
  if (digits.length === 13 && digits.startsWith('91')) return digits.slice(1);
  return digits;
}

export default async function handler(req: Request, res: Response) {
  try {
    purgeExpired(); // housekeeping

    const { leadId, phone, otp } = req.body;

    if (!otp) {
      return res.status(400).json({ error: 'OTP is required' });
    }

    // Resolve lookup key — must match what send used
    let storeKey = leadId as string | undefined;
    if (!storeKey && phone) {
      storeKey = formatPhone(phone as string);
    }
    if (!storeKey) {
      return res.status(400).json({ error: 'leadId or phone required' });
    }

    const stored = otpStore.get(storeKey);

    if (!stored) {
      return res.status(400).json({
        error: 'OTP not found or already used. Please request a new OTP.',
        code: 'OTP_NOT_FOUND',
      });
    }

    // Expiry check
    if (Date.now() > stored.expiry) {
      otpStore.delete(storeKey);
      return res.status(400).json({
        error: 'OTP has expired. Please request a new one.',
        code: 'OTP_EXPIRED',
      });
    }

    // Brute-force guard — max 3 wrong attempts
    if (stored.attempts >= 3) {
      otpStore.delete(storeKey);
      return res.status(400).json({
        error: 'Too many incorrect attempts. Please request a new OTP.',
        code: 'TOO_MANY_ATTEMPTS',
      });
    }

    // Wrong OTP
    if (stored.otp !== otp.toString().trim()) {
      stored.attempts += 1;
      const remaining = 3 - stored.attempts;
      return res.status(400).json({
        error: `Incorrect OTP. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
        code: 'WRONG_OTP',
        attemptsRemaining: remaining,
      });
    }

    // ✅ Correct — consume the OTP
    otpStore.delete(storeKey);

    // Mark lead as verified in DB
    if (leadId) {
      await db
        .update(leads)
        .set({
          conversionStatus: 'verified',
          updatedAt: new Date(),
        })
        .where(eq(leads.leadId, leadId as string));

      console.log(`[OTP/Verify] Lead ${leadId} phone verified ✓`);
    }

    res.json({
      success: true,
      verified: true,
      leadId,
      message: 'Phone number verified successfully!',
    });
  } catch (error) {
    console.error('[OTP/Verify] error:', error);
    res.status(500).json({ error: 'Verification failed', message: String(error) });
  }
}
