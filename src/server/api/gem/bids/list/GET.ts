/**
 * GeM Bids Listing API
 * Fetch all submitted bids with status
 */

import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { gemBids, gemTenders } from '../../../../db/schema.js';
import { eq, desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    // Build query
    let query = db.select().from(gemBids);

    if (status) {
      query = query.where(eq(gemBids.status, status as string)) as any;
    }

    const bids = await query
      .orderBy(desc(gemBids.createdAt))
      .limit(Number(limit))
      .offset(Number(offset));

    // Fetch tender details for each bid
    const bidsWithTenders = await Promise.all(
      bids.map(async (bid) => {
        const [tender] = await db
          .select()
          .from(gemTenders)
          .where(eq(gemTenders.tenderId, bid.tenderId))
          .limit(1);

        return {
          ...bid,
          tender: tender || null,
        };
      })
    );

    console.log(`[GeM] Fetched ${bids.length} bids`);

    res.json({
      success: true,
      bids: bidsWithTenders,
      pagination: {
        limit: Number(limit),
        offset: Number(offset),
      },
    });
  } catch (error) {
    console.error('[GeM] Bid list error:', error);
    res.status(500).json({
      error: 'Failed to fetch bids',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
