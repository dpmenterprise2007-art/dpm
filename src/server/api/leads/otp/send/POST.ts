/**
 * OTP Send API
 * Generates a 6-digit OTP, stores it in the shared singleton, and returns
 * a WhatsApp deep-link so the admin can forward it to the lead.
 *
 * POST /api/leads/otp/send
 * Body: { leadId?: string, phone?: string, method?: 'whatsapp' }
 */
import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { leads } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';
import { otpStore, purgeExpired } from '../../../../lib/otp-store.js';

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/** Normalise any Indian phone to "91XXXXXXXXXX" (no + prefix) for WhatsApp links */
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

    const { leadId, phone, method = 'whatsapp' } = req.body;

    if (!leadId && !phone) {
      return res.status(400).json({ error: 'leadId or phone required' });
    }

    let targetPhone = phone as string | undefined;
    let targetLeadId = leadId as string | undefined;

    // Resolve phone from DB when only leadId is supplied
    if (leadId && !phone) {
      const [lead] = await db.select().from(leads).where(eq(leads.leadId, leadId)).limit(1);
      if (!lead) return res.status(404).json({ error: 'Lead not found' });
      targetPhone = lead.phone;
      targetLeadId = lead.leadId;
    }

    if (!targetPhone) {
      return res.status(400).json({ error: 'No phone number available for this lead' });
    }

    const formattedPhone = formatPhone(targetPhone);
    const otp = generateOTP();
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Key: prefer leadId so the verify endpoint can look up by the same key
    const storeKey = targetLeadId || formattedPhone;
    otpStore.set(storeKey, { otp, expiry, phone: formattedPhone, attempts: 0 });

    console.log(`[OTP] Generated for ${formattedPhone} (key=${storeKey}): ${otp}`);

    const message = encodeURIComponent(
      `🔐 DPM Enterprise Verification\n\nYour OTP is: *${otp}*\n\nValid for 10 minutes. Do not share with anyone.\n\n— DPM Enterprise Team`
    );
    const whatsappLink = `https://wa.me/${formattedPhone}?text=${message}`;

    res.json({
      success: true,
      leadId: targetLeadId,
      phone: targetPhone,
      formattedPhone,
      // Only expose OTP in development to help with testing
      otp: process.env.NODE_ENV !== 'production' ? otp : undefined,
      whatsappLink,
      method,
      expiresIn: 600,
      message: `OTP generated for ${targetPhone}. Send via WhatsApp.`,
    });
  } catch (error) {
    console.error('[OTP/Send] error:', error);
    res.status(500).json({ error: 'Failed to generate OTP', message: String(error) });
  }
}
