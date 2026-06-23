import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';

export default async function handler(req: Request, res: Response) {
  try {
    const { projectType, area, name, phone, location, estimate } = req.body;

    if (!projectType || !area || !name || !phone || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Normalise phone
    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);

    // Save to leads DB
    const leadId = `LEAD_BC_${Date.now()}`;
    await db.insert(leads).values({
      leadId,
      name: String(name).trim(),
      phone: cleanPhone,
      email: `bc_${cleanPhone}@noemail.dpmenterprise.in`,
      location: String(location).trim(),
      projectType: String(projectType).trim(),
      source: 'budget_calculator',
      score: 40,
      status: 'new',
      conversionStatus: 'new',
      message: `Area: ${area} sq ft | Estimate: ${estimate ? `₹${Number(estimate).toLocaleString('en-IN')}` : 'N/A'}`,
    });

    return res.status(200).json({
      success: true,
      message: 'Lead captured successfully',
      leadId,
    });
  } catch (error) {
    console.error('[BudgetCalc] Error saving lead:', error);
    return res.status(500).json({
      error: 'Failed to save lead',
      message: String(error),
    });
  }
}
