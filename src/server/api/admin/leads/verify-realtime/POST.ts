/**
 * Real-time Lead Verification: dedup check + phone format validation
 */
import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { leads } from '../../../../db/schema.js';
import { eq, or } from 'drizzle-orm';

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  if (digits.length === 13 && digits.startsWith('91')) return `+${digits.slice(1)}`;
  return `+${digits}`;
}

function isValidIndianPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10 && /^[6-9]/.test(digits)) return true;
  if (digits.length === 12 && digits.startsWith('91') && /^91[6-9]/.test(digits)) return true;
  return false;
}

export default async function handler(req: Request, res: Response) {
  try {
    const { phone, email } = req.body;

    if (!phone && !email) {
      return res.status(400).json({ error: 'phone or email required' });
    }

    const issues: string[] = [];
    const warnings: string[] = [];
    let isDuplicate = false;
    let existingLead = null;

    // Phone validation
    if (phone) {
      if (!isValidIndianPhone(phone)) {
        issues.push('Invalid Indian phone number format');
      }

      // Dedup check
      const normalized = normalizePhone(phone);
      const existing = await db.select().from(leads).where(
        or(eq(leads.phone, phone), eq(leads.phone, normalized))
      );

      if (existing.length > 0) {
        isDuplicate = true;
        existingLead = {
          leadId: existing[0].leadId,
          name: existing[0].name,
          status: existing[0].status,
          source: existing[0].source,
          createdAt: existing[0].createdAt,
        };
        warnings.push(`Duplicate phone — existing lead: ${existing[0].leadId} (${existing[0].name})`);
      }
    }

    // Email dedup
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        issues.push('Invalid email format');
      } else {
        const existing = await db.select().from(leads).where(eq(leads.email, email));
        if (existing.length > 0) {
          isDuplicate = true;
          if (!existingLead) {
            existingLead = {
              leadId: existing[0].leadId,
              name: existing[0].name,
              status: existing[0].status,
              source: existing[0].source,
              createdAt: existing[0].createdAt,
            };
          }
          warnings.push(`Duplicate email — existing lead: ${existing[0].leadId}`);
        }
      }
    }

    res.json({
      success: true,
      valid: issues.length === 0,
      isDuplicate,
      existingLead,
      issues,
      warnings,
      normalizedPhone: phone ? normalizePhone(phone) : null,
    });
  } catch (error) {
    console.error('[Admin/Leads/VerifyRealtime] error:', error);
    res.status(500).json({ error: 'Verification failed', message: String(error) });
  }
}
