/**
 * Create Deal API
 * POST /api/sales/deals
 */
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { deals } from '../../../db/schema.js';

export default async function handler(req: Request, res: Response) {
  try {
    const {
      title,
      clientName,
      company,
      email,
      phone,
      projectType,
      location,
      description,
      estimatedValue,
      probability,
      stage,
      expectedCloseDate,
      assignedTo,
      source,
      leadId,
    } = req.body;

    if (!title || !clientName || !projectType || !estimatedValue) {
      return res.status(400).json({ error: 'title, clientName, projectType, estimatedValue are required' });
    }

    const dealId = `DEAL_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    await db.insert(deals).values({
      dealId,
      leadId: leadId || null,
      title,
      clientName,
      company: company || null,
      email: email || null,
      phone: phone || null,
      projectType,
      location: location || null,
      description: description || null,
      estimatedValue: String(estimatedValue),
      probability: probability ? Number(probability) : 50,
      stage: stage || 'new',
      expectedCloseDate: expectedCloseDate || null,
      assignedTo: assignedTo || 'Sales Team',
      source: source || 'Manual',
      status: 'active',
    });

    console.log(`[Sales] Created deal: ${dealId} — ${title}`);

    res.status(201).json({
      success: true,
      dealId,
      message: `Deal "${title}" created successfully`,
    });
  } catch (error) {
    console.error('[Sales] Create deal error:', error);
    res.status(500).json({ error: 'Failed to create deal', message: String(error) });
  }
}
