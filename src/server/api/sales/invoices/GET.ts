import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { salesInvoices } from '../../../db/schema.js';
import { desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const invoices = await db
      .select()
      .from(salesInvoices)
      .orderBy(desc(salesInvoices.createdAt))
      .limit(100);

    res.json({
      success: true,
      data: invoices,
      count: invoices.length,
    });
  } catch (error) {
    console.error('[API] Error fetching sales invoices:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sales invoices',
      message: String(error),
    });
  }
}
