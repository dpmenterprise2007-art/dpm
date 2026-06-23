import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { gstReturns } from '../../../db/schema.js';
import { desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const returns = await db
      .select()
      .from(gstReturns)
      .orderBy(desc(gstReturns.createdAt))
      .limit(50);

    res.json({
      success: true,
      data: returns,
      count: returns.length,
    });
  } catch (error) {
    console.error('[API] Error fetching GST returns:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch GST returns',
      message: String(error),
    });
  }
}
