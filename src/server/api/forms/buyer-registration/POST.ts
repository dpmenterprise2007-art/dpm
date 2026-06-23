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

    if (!formData.organizationName || !formData.email || !formData.phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to DB
    try {
      const existing = await db.select().from(leads).where(
        or(eq(leads.phone, formData.phone), eq(leads.email, formData.email))
      );
      if (existing.length === 0) {
        await db.insert(leads).values({
          leadId: generateLeadId(),
          name: formData.contactPerson || formData.organizationName,
          phone: formData.phone,
          email: formData.email,
          company: formData.organizationName,
          projectType: 'Buyer Registration',
          location: formData.city ? `${formData.city}, ${formData.state}` : null,
          source: 'Buyer Registration Form',
          status: 'warm',
          score: 55,
        });
      }
    } catch (dbErr) {
      console.error('[BuyerReg] DB save error:', dbErr);
    }

    // Email content
    // Send email (skipped — email transport not configured)
    console.log('[BuyerReg] Email notification skipped (no transporter configured):', formData.organizationName);

    res.status(200).json({ success: true, message: 'Registration submitted successfully' });
  } catch (error) {
    console.error('Buyer registration error:', error);
    res.status(500).json({ error: 'Failed to submit registration', message: String(error) });
  }
}
