import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { purchaseBills } from '../../../db/schema.js';
import { desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const bills = await db
      .select()
      .from(purchaseBills)
      .orderBy(desc(purchaseBills.createdAt))
      .limit(100);

    res.json({
      success: true,
      data: bills,
      count: bills.length,
    });
  } catch (error) {
    console.error('[API] Error fetching purchase bills:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch purchase bills',
      message: String(error),
    });
  }
}
