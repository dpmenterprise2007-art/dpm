/**
 * Bulk Lead Scan API
 * Scans all leads and returns a report of:
 *  - invalid phone numbers
 *  - invalid emails
 *  - duplicate phone/email pairs
 *  - incomplete records (missing name/phone/email)
 *
 * POST /api/admin/leads/bulk-scan
 * Body: {} (no params needed — scans everything)
 */
import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { leads } from '../../../../db/schema.js';

function isValidIndianPhone(phone: string | null | undefined): boolean {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10 && /^[6-9]/.test(digits)) return true;
  if (digits.length === 12 && /^91[6-9]/.test(digits)) return true;
  return false;
}

function isValidEmail(email: string | null | undefined): boolean {
  if (!email) return true; // email is optional — only flag if present but malformed
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  return phone; // return as-is if we can't fix it
}

export default async function handler(req: Request, res: Response) {
  try {
    const allLeads = await db.select({
      id: leads.id,
      leadId: leads.leadId,
      name: leads.name,
      phone: leads.phone,
      email: leads.email,
      source: leads.source,
      status: leads.status,
      createdAt: leads.createdAt,
    }).from(leads);

    const invalidPhone: typeof allLeads = [];
    const invalidEmail: typeof allLeads = [];
    const incomplete: typeof allLeads = [];
    const phoneMap = new Map<string, typeof allLeads[0]>();
    const emailMap = new Map<string, typeof allLeads[0]>();
    const duplicatePhones: Array<{ lead: typeof allLeads[0]; duplicateOf: typeof allLeads[0] }> = [];
    const duplicateEmails: Array<{ lead: typeof allLeads[0]; duplicateOf: typeof allLeads[0] }> = [];

    for (const lead of allLeads) {
      // Phone checks
      if (!lead.phone) {
        incomplete.push(lead);
      } else if (!isValidIndianPhone(lead.phone)) {
        invalidPhone.push(lead);
      } else {
        const normalised = normalizePhone(lead.phone);
        if (phoneMap.has(normalised)) {
          duplicatePhones.push({ lead, duplicateOf: phoneMap.get(normalised)! });
        } else {
          phoneMap.set(normalised, lead);
        }
      }

      // Email checks
      if (lead.email && !isValidEmail(lead.email)) {
        invalidEmail.push(lead);
      } else if (lead.email) {
        const lc = lead.email.toLowerCase();
        if (emailMap.has(lc)) {
          duplicateEmails.push({ lead, duplicateOf: emailMap.get(lc)! });
        } else {
          emailMap.set(lc, lead);
        }
      }

      // Incomplete check
      if (!lead.name || !lead.phone) {
        if (!incomplete.find(l => l.leadId === lead.leadId)) {
          incomplete.push(lead);
        }
      }
    }

    res.json({
      success: true,
      scannedAt: new Date().toISOString(),
      totalLeads: allLeads.length,
      summary: {
        invalidPhone: invalidPhone.length,
        invalidEmail: invalidEmail.length,
        duplicatePhones: duplicatePhones.length,
        duplicateEmails: duplicateEmails.length,
        incomplete: incomplete.length,
        totalIssues:
          invalidPhone.length +
          invalidEmail.length +
          duplicatePhones.length +
          duplicateEmails.length +
          incomplete.length,
      },
      issues: {
        invalidPhone,
        invalidEmail,
        duplicatePhones,
        duplicateEmails,
        incomplete,
      },
    });
  } catch (error) {
    console.error('[BulkScan] error:', error);
    res.status(500).json({ error: 'Bulk scan failed', message: String(error) });
  }
}
