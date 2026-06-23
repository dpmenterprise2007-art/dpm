/**
 * GeM Tender Listing API
 * Fetch active government tenders with filters
 */

import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { gemTenders } from '../../../../db/schema.js';
import { sql, desc, and, gte, lte, like } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { 
      status = 'active', 
      category, 
      minValue, 
      maxValue, 
      location,
      limit = 50,
      offset = 0 
    } = req.query;

    // Build filter conditions
    const conditions = [];
    
    if (status) {
      conditions.push(sql`${gemTenders.status} = ${status}`);
    }
    
    if (category) {
      conditions.push(like(gemTenders.category, `%${category}%`));
    }
    
    if (minValue) {
      conditions.push(gte(gemTenders.estimatedValue, minValue as string));
    }
    
    if (maxValue) {
      conditions.push(lte(gemTenders.estimatedValue, maxValue as string));
    }
    
    if (location) {
      conditions.push(like(gemTenders.location, `%${location}%`));
    }

    // Fetch tenders
    const tenders = await db
      .select()
      .from(gemTenders)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(gemTenders.publishDate))
      .limit(Number(limit))
      .offset(Number(offset));

    // Count total
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(gemTenders)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    console.log(`[GeM] Fetched ${tenders.length} tenders (Total: ${count})`);

    res.json({
      success: true,
      tenders,
      pagination: {
        total: count,
        limit: Number(limit),
        offset: Number(offset),
        hasMore: Number(offset) + tenders.length < count,
      },
    });
  } catch (error) {
    console.error('[GeM] Tender list error:', error);
    res.status(500).json({
      error: 'Failed to fetch tenders',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
