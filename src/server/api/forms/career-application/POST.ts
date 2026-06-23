import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';
import { eq, or } from 'drizzle-orm';

function generateLeadId(): string {
  const year = new Date().getFullYear();
  const num = String(Math.floor(Math.random() * 90000) + 10000);
  return `LEAD_${year}_${num}`;
}

export default async function handler(req: Request, res: Response) {
  try {
    const formData = req.body;

    if (!formData.fullName || !formData.email || !formData.phone || !formData.position) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to DB as lead (career applicants are potential contacts)
    try {
      const existing = await db.select().from(leads).where(
        or(eq(leads.phone, formData.phone), eq(leads.email, formData.email))
      );
      if (existing.length === 0) {
        await db.insert(leads).values({
          leadId: generateLeadId(),
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          projectType: `Career Application — ${formData.position}`,
          source: 'Career Application Form',
          status: 'cold',
          score: 10,
        });
      }
    } catch (dbErr) {
      console.error('[CareerApp] DB save error:', dbErr);
    }

    // Email content
    // Send email (skipped — email transport not configured)
    console.log('[CareerApp] Email notification skipped (no transporter configured):', formData.fullName);

    res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Career application error:', error);
    res.status(500).json({ error: 'Failed to submit application', message: String(error) });
  }
}
