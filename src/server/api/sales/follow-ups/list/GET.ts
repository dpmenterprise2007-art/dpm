/**
 * Follow-ups List API
 * Returns all scheduled follow-ups
 */

import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { followUps } from '../../../../db/schema.js';
import { desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const allFollowUps = await db
      .select()
      .from(followUps)
      .orderBy(desc(followUps.scheduledDate))
      .limit(100);

    res.json({
      success: true,
      followUps: allFollowUps,
      total: allFollowUps.length
    });
  } catch (error) {
    console.error('[Follow-ups] List error:', error);
    res.status(500).json({ error: 'Failed to fetch follow-ups' });
  }
}
