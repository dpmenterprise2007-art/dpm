/**
 * Admin: Get ALL leads with full data, stats, and real-time counts
 */
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';
import { desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { status, source, search, limit = '100', offset = '0', from } = req.query;

    let allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

    // Filters
    if (status) allLeads = allLeads.filter(l => l.status === status);
    if (source) allLeads = allLeads.filter(l => l.source === source);
    if (from) {
      const fromDate = new Date(from as string);
      allLeads = allLeads.filter(l => l.createdAt && new Date(l.createdAt) >= fromDate);
    }
    if (search) {
      const q = (search as string).toLowerCase();
      allLeads = allLeads.filter(l =>
        l.name?.toLowerCase().includes(q) ||
        l.phone?.includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.company?.toLowerCase().includes(q) ||
        l.location?.toLowerCase().includes(q)
      );
    }

    // Stats
    const total = allLeads.length;
    const hot = allLeads.filter(l => l.status === 'hot').length;
    const warm = allLeads.filter(l => l.status === 'warm').length;
    const cold = allLeads.filter(l => l.status === 'cold').length;

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const today = allLeads.filter(l => l.createdAt && new Date(l.createdAt) >= todayStart).length;
    const thisWeek = allLeads.filter(l => l.createdAt && new Date(l.createdAt) >= weekStart).length;
    const thisMonth = allLeads.filter(l => l.createdAt && new Date(l.createdAt) >= monthStart).length;

    // Sources breakdown
    const sourceMap: Record<string, number> = {};
    allLeads.forEach(l => { sourceMap[l.source] = (sourceMap[l.source] || 0) + 1; });

    // Pagination
    const lim = Number(limit);
    const off = Number(offset);
    const paginated = allLeads.slice(off, off + lim);

    res.json({
      success: true,
      leads: paginated,
      stats: { total, hot, warm, cold, today, thisWeek, thisMonth },
      sources: sourceMap,
      pagination: { total, limit: lim, offset: off, hasMore: off + paginated.length < total },
    });
  } catch (error) {
    console.error('[Admin/Leads] GET error:', error);
    res.status(500).json({ error: 'Failed to fetch leads', message: String(error) });
  }
}
