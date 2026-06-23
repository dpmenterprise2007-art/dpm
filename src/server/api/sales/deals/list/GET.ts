/**
 * Sales Deals Listing API
 * Fetch all deals with filters
 */

import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { deals } from '../../../../db/schema.js';
import { eq, desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { stage, status, limit = 50, offset = 0 } = req.query;

    // Build query
    let query = db.select().from(deals);

    if (stage) {
      query = query.where(eq(deals.stage, stage as string)) as any;
    }

    const allDeals = await query.orderBy(desc(deals.createdAt));

    // Filter by status if provided
    const filteredDeals = status
      ? allDeals.filter((deal) => deal.status === status)
      : allDeals;

    // Pagination
    const paginatedDeals = filteredDeals.slice(
      Number(offset),
      Number(offset) + Number(limit)
    );

    console.log(`[Sales] Fetched ${paginatedDeals.length} deals (Total: ${filteredDeals.length})`);

    res.json({
      success: true,
      deals: paginatedDeals,
      pagination: {
        total: filteredDeals.length,
        limit: Number(limit),
        offset: Number(offset),
        hasMore: Number(offset) + paginatedDeals.length < filteredDeals.length,
      },
    });
  } catch (error) {
    console.error('[Sales] Deals list error:', error);
    res.status(500).json({
      error: 'Failed to fetch deals',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
