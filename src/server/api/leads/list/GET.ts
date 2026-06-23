/**
 * Leads Listing API
 * Fetch all leads with filters
 */

import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';
import { eq, desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { status, source, limit = 50, offset = 0 } = req.query;

    // Build query
    let query = db.select().from(leads);

    if (status) {
      query = query.where(eq(leads.status, status as string)) as any;
    }

    const allLeads = await query.orderBy(desc(leads.createdAt));

    // Filter by temperature and source
    let filteredLeads = allLeads;

    // Temperature filter removed - not in schema

    if (source) {
      filteredLeads = filteredLeads.filter((lead) => lead.source === source);
    }

    // Pagination
    const paginatedLeads = filteredLeads.slice(
      Number(offset),
      Number(offset) + Number(limit)
    );

    console.log(`[Leads] Fetched ${paginatedLeads.length} leads (Total: ${filteredLeads.length})`);

    res.json({
      success: true,
      leads: paginatedLeads,
      pagination: {
        total: filteredLeads.length,
        limit: Number(limit),
        offset: Number(offset),
        hasMore: Number(offset) + paginatedLeads.length < filteredLeads.length,
      },
    });
  } catch (error) {
    console.error('[Leads] List error:', error);
    res.status(500).json({
      error: 'Failed to fetch leads',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
