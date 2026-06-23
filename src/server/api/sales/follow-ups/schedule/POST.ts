/**
 * Schedule Follow-up API
 * Auto-schedule follow-ups based on deal stage and lead status
 */

import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { followUps, deals, leads } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

// Auto-schedule rules based on stage
const FOLLOW_UP_RULES = {
  'new': { days: 1, type: 'call', subject: 'Initial Contact Call' },
  'contacted': { days: 3, type: 'email', subject: 'Follow-up Email' },
  'qualified': { days: 5, type: 'meeting', subject: 'Project Discussion Meeting' },
  'proposal': { days: 7, type: 'call', subject: 'Proposal Follow-up Call' },
  'negotiation': { days: 3, type: 'call', subject: 'Negotiation Discussion' },
};

export default async function handler(req: Request, res: Response) {
  try {
    const { dealId, leadId, type, subject, description, scheduledDate, assignedTo } = req.body;

    if (!dealId && !leadId) {
      return res.status(400).json({ error: 'Either dealId or leadId is required' });
    }

    let followUpType = type;
    let followUpSubject = subject;
    let followUpDate = scheduledDate ? new Date(scheduledDate) : new Date();

    // Auto-schedule based on deal stage if dealId provided
    if (dealId && !type) {
      const [deal] = await db.select().from(deals).where(eq(deals.dealId, dealId)).limit(1);
      
      if (deal) {
        const rule = FOLLOW_UP_RULES[deal.stage as keyof typeof FOLLOW_UP_RULES] || FOLLOW_UP_RULES['new'];
        followUpType = rule.type;
        followUpSubject = rule.subject;
        followUpDate.setDate(followUpDate.getDate() + rule.days);
      }
    }

    // Auto-schedule based on lead status if leadId provided
    if (leadId && !dealId && !type) {
      const [lead] = await db.select().from(leads).where(eq(leads.leadId, leadId)).limit(1);
      
      if (lead) {
        if (lead.status === 'hot') {
          followUpType = 'call';
          followUpSubject = 'Urgent: HOT Lead Follow-up';
          followUpDate.setDate(followUpDate.getDate() + 1); // Next day
        } else if (lead.status === 'warm') {
          followUpType = 'email';
          followUpSubject = 'WARM Lead Follow-up';
          followUpDate.setDate(followUpDate.getDate() + 3); // 3 days
        } else {
          followUpType = 'email';
          followUpSubject = 'Lead Follow-up';
          followUpDate.setDate(followUpDate.getDate() + 7); // 7 days
        }
      }
    }

    // Generate follow-up ID
    const followUpId = `FU_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create follow-up
    await db.insert(followUps).values({
      followUpId,
      dealId: dealId || null,
      leadId: leadId || null,
      type: followUpType || 'call',
      subject: followUpSubject || 'Follow-up',
      description: description || `Scheduled follow-up for ${followUpType}`,
      scheduledDate: followUpDate,
      status: 'pending',
      assignedTo: assignedTo || 'Dharmendra Prajapati',
    });

    console.log(`[Sales] Follow-up scheduled: ${followUpId} - ${followUpSubject} on ${followUpDate.toISOString().split('T')[0]}`);

    res.status(201).json({
      success: true,
      followUpId,
      type: followUpType,
      subject: followUpSubject,
      scheduledDate: followUpDate.toISOString(),
      message: 'Follow-up scheduled successfully',
    });
  } catch (error) {
    console.error('[Sales] Schedule follow-up error:', error);
    res.status(500).json({
      error: 'Failed to schedule follow-up',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
