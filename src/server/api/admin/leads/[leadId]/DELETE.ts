/**
 * Admin: Delete a lead
 */
import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { leads } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { leadId } = req.params;

    const existing = await db.select().from(leads).where(eq(leads.leadId, leadId));
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    await db.delete(leads).where(eq(leads.leadId, leadId));

    res.json({ success: true, message: `Lead ${leadId} deleted` });
  } catch (error) {
    console.error('[Admin/Leads] DELETE error:', error);
    res.status(500).json({ error: 'Failed to delete lead', message: String(error) });
  }
}
