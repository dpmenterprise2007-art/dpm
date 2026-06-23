/**
 * Update Deal API
 * PUT /api/sales/deals/:dealId
 */
import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { deals } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { dealId } = req.params;
    const {
      stage,
      status,
      title,
      clientName,
      company,
      email,
      phone,
      projectType,
      estimatedValue,
      probability,
      description,
      assignedTo,
      lostReason,
      expectedCloseDate,
    } = req.body;

    if (!dealId) return res.status(400).json({ error: 'dealId required' });

    const updateData: Record<string, unknown> = { updatedAt: new Date() };

    if (stage !== undefined) updateData.stage = stage;
    if (status !== undefined) updateData.status = status;
    if (title !== undefined) updateData.title = title;
    if (clientName !== undefined) updateData.clientName = clientName;
    if (company !== undefined) updateData.company = company;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (projectType !== undefined) updateData.projectType = projectType;
    if (estimatedValue !== undefined) updateData.estimatedValue = String(estimatedValue);
    if (probability !== undefined) updateData.probability = Number(probability);
    if (description !== undefined) updateData.description = description;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (lostReason !== undefined) updateData.lostReason = lostReason;
    if (expectedCloseDate !== undefined) updateData.expectedCloseDate = expectedCloseDate;

    // Auto-set status on stage change
    if (stage === 'closed-won') updateData.status = 'won';
    if (stage === 'closed-lost') updateData.status = 'lost';

    await db.update(deals).set(updateData).where(eq(deals.dealId, dealId));

    console.log(`[Sales] Updated deal: ${dealId} → stage: ${stage || 'unchanged'}`);

    res.json({ success: true, dealId, message: 'Deal updated successfully' });
  } catch (error) {
    console.error('[Sales] Update deal error:', error);
    res.status(500).json({ error: 'Failed to update deal', message: String(error) });
  }
}
