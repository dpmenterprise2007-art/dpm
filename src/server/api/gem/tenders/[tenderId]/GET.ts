import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { gemTenders } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const tenderId = parseInt(req.params.tenderId);

    if (isNaN(tenderId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid tender ID',
      });
    }

    const tender = await db
      .select()
      .from(gemTenders)
      .where(eq(gemTenders.id, tenderId))
      .limit(1);

    if (tender.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tender not found',
      });
    }

    res.json({
      success: true,
      data: tender[0],
    });
  } catch (error) {
    console.error('[API] Error fetching tender:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tender',
      message: String(error),
    });
  }
}
