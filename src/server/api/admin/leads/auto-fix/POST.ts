/**
 * Auto-Fix Phones API
 * Finds all leads with fixable phone numbers (10-digit without +91 prefix)
 * and normalises them to +91XXXXXXXXXX in-place.
 *
 * POST /api/admin/leads/auto-fix
 * Body: { dryRun?: boolean }  — dryRun=true previews without writing
 */
import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { leads } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10 && /^[6-9]/.test(digits)) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith('91') && /^91[6-9]/.test(digits)) return `+${digits}`;
  return null; // can't fix
}

function isAlreadyNormalized(phone: string): boolean {
  return /^\+91[6-9]\d{9}$/.test(phone);
}

export default async function handler(req: Request, res: Response) {
  try {
    const dryRun = req.body?.dryRun === true;

    const allLeads = await db.select({
      id: leads.id,
      leadId: leads.leadId,
      name: leads.name,
      phone: leads.phone,
    }).from(leads);

    const toFix: Array<{ leadId: string; name: string; oldPhone: string; newPhone: string }> = [];
    const unfixable: Array<{ leadId: string; name: string; phone: string }> = [];

    for (const lead of allLeads) {
      if (!lead.phone) continue;
      if (isAlreadyNormalized(lead.phone)) continue;

      const fixed = normalizePhone(lead.phone);
      if (fixed) {
        toFix.push({ leadId: lead.leadId, name: lead.name, oldPhone: lead.phone, newPhone: fixed });
      } else {
        unfixable.push({ leadId: lead.leadId, name: lead.name, phone: lead.phone });
      }
    }

    if (!dryRun) {
      // Apply fixes
      for (const fix of toFix) {
        await db
          .update(leads)
          .set({ phone: fix.newPhone, updatedAt: new Date() })
          .where(eq(leads.leadId, fix.leadId));
      }
      console.log(`[AutoFix] Fixed ${toFix.length} phone numbers`);
    }

    res.json({
      success: true,
      dryRun,
      fixed: toFix.length,
      unfixable: unfixable.length,
      details: { toFix, unfixable },
      message: dryRun
        ? `Dry run: ${toFix.length} phones would be fixed, ${unfixable.length} cannot be auto-fixed`
        : `Fixed ${toFix.length} phone numbers. ${unfixable.length} require manual correction.`,
    });
  } catch (error) {
    console.error('[AutoFix] error:', error);
    res.status(500).json({ error: 'Auto-fix failed', message: String(error) });
  }
}
