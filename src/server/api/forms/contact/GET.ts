import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';
import { desc } from 'drizzle-orm';
import { testLeads } from './test-data.js';

export default async function handler(req: Request, res: Response) {
  try {
    // Fetch all leads ordered by most recent first
    const allLeads = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt));

    // If no leads in database, return test data for demo
    const leadsToReturn = allLeads.length > 0 ? allLeads : testLeads;

    res.json({
      success: true,
      leads: leadsToReturn,
      total: leadsToReturn.length,
      isTestData: allLeads.length === 0
    });

  } catch (error) {
    console.error('Failed to fetch leads:', error);
    res.status(500).json({ 
      error: 'Failed to fetch leads',
      message: String(error) 
    });
  }
}
