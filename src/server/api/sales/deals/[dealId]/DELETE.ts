/**
 * Delete Deal API
 * DELETE /api/sales/deals/:dealId
 */
import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { deals } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { dealId } = req.params;
    if (!dealId) return res.status(400).json({ error: 'dealId required' });

    await db.delete(deals).where(eq(deals.dealId, dealId));

    console.log(`[Sales] Deleted deal: ${dealId}`);
    res.json({ success: true, dealId, message: 'Deal deleted successfully' });
  } catch (error) {
    console.error('[Sales] Delete deal error:', error);
    res.status(500).json({ error: 'Failed to delete deal', message: String(error) });
  }
}
