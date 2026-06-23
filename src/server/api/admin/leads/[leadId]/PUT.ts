/**
 * Admin: Update a lead (status, assignment, notes)
 */
import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { leads } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { leadId } = req.params;
    const updates = req.body;

    const existing = await db.select().from(leads).where(eq(leads.leadId, leadId));
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const allowed = ['status', 'assignedTo', 'followUpDate', 'conversionStatus', 'score', 'priority', 'notes'];
    const safeUpdates: Record<string, unknown> = { updatedAt: new Date() };
    for (const key of allowed) {
      if (updates[key] !== undefined) safeUpdates[key] = updates[key];
    }

    await db.update(leads).set(safeUpdates as any).where(eq(leads.leadId, leadId));

    res.json({ success: true, message: `Lead ${leadId} updated` });
  } catch (error) {
    console.error('[Admin/Leads] PUT error:', error);
    res.status(500).json({ error: 'Failed to update lead', message: String(error) });
  }
}
