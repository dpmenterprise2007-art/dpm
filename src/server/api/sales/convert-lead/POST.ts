/**
 * Auto-Lead to Deal Conversion API
 * Automatically converts HOT leads to sales deals
 */

import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads, deals, salesActivities } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { leadId, assignedTo } = req.body;

    if (!leadId) {
      return res.status(400).json({ error: 'Lead ID is required' });
    }

    // Fetch lead details
    const [lead] = await db.select().from(leads).where(eq(leads.leadId, leadId)).limit(1);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Check if already converted
    if (lead.conversionStatus === 'converted') {
      return res.status(400).json({ error: 'Lead already converted to deal' });
    }

    // Generate deal ID
    const dealId = `DEAL_${new Date().getFullYear()}_${String(Date.now()).slice(-6)}`;

    // Calculate estimated value from budget
    const budgetValue = parseFloat(lead.budget || '0');
    
    // Calculate probability based on lead score
    let probability = 50; // default
    const leadScore = lead.score || 0;
    if (leadScore >= 100) probability = 80; // HOT
    else if (leadScore >= 70) probability = 60; // WARM
    else probability = 40; // COLD

    // Determine expected close date (30-90 days based on timeline)
    const daysToClose = lead.timeline?.includes('1-2') ? 30 : 
                        lead.timeline?.includes('2-3') ? 45 :
                        lead.timeline?.includes('3-4') ? 60 : 90;
    
    const expectedCloseDate = new Date();
    expectedCloseDate.setDate(expectedCloseDate.getDate() + daysToClose);

    // Create deal
    await db.insert(deals).values({
      dealId,
      leadId: lead.leadId,
      title: `${lead.projectType} - ${lead.company || lead.name}`,
      clientName: lead.name,
      company: lead.company || 'Individual',
      email: lead.email,
      phone: lead.phone,
      projectType: lead.projectType,
      location: lead.location,
      description: lead.message,
      estimatedValue: budgetValue.toFixed(2),
      probability,
      stage: 'contacted', // Start at contacted stage
      expectedCloseDate,
      assignedTo: assignedTo || 'Dharmendra Prajapati',
      status: 'active',
      source: lead.source,
      lastContactDate: new Date(),
    });

    // Update lead status
    await db.update(leads)
      .set({ conversionStatus: 'converted' })
      .where(eq(leads.leadId, leadId));

    // Create activity log
    const activityId = `ACT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await db.insert(salesActivities).values({
      activityId,
      dealId,
      leadId: lead.leadId,
      type: 'stage-change',
      title: 'Lead Converted to Deal',
      description: `Lead ${lead.name} (${lead.leadId}) converted to deal ${dealId}. Score: ${lead.score}, Status: ${lead.status}`,
      outcome: 'positive',
      performedBy: assignedTo || 'System',
    });

    console.log(`[Sales] Lead converted: ${leadId} → ${dealId} (₹${budgetValue.toFixed(0)})`);

    res.status(201).json({
      success: true,
      dealId,
      leadId,
      estimatedValue: budgetValue,
      probability,
      stage: 'contacted',
      expectedCloseDate: expectedCloseDate.toISOString().split('T')[0],
      message: 'Lead successfully converted to deal',
    });
  } catch (error) {
    console.error('[Sales] Convert lead error:', error);
    res.status(500).json({
      error: 'Failed to convert lead to deal',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
