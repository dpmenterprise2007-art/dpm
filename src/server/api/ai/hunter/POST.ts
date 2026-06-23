/**
 * AI Hunter Control — Autonomous lead hunting, scoring, follow-up scheduling
 */
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';
import { eq, desc } from 'drizzle-orm';

interface HunterAction {
  leadId: string;
  action: string;
  priority: string;
  reason: string;
  suggestedMessage?: string;
  followUpDate?: string;
}

function scoreLeadLocally(lead: typeof leads.$inferSelect): number {
  let score = 0;
  if (lead.budget) {
    const b = lead.budget.toLowerCase();
    if (b.includes('50l') || b.includes('crore') || b.includes('1cr')) score += 40;
    else if (b.includes('20l') || b.includes('25l') || b.includes('30l')) score += 30;
    else if (b.includes('10l') || b.includes('15l')) score += 20;
    else score += 10;
  }
  if (lead.timeline) {
    const t = lead.timeline.toLowerCase();
    if (t.includes('immediate') || t.includes('urgent') || t.includes('asap')) score += 30;
    else if (t.includes('1 month') || t.includes('30 days')) score += 20;
    else if (t.includes('3 month')) score += 10;
  }
  if (lead.email) score += 10;
  if (lead.company) score += 15;
  const pt = (lead.projectType || '').toLowerCase();
  if (pt.includes('corporate') || pt.includes('government') || pt.includes('gem')) score += 20;
  else if (pt.includes('commercial')) score += 15;
  else score += 5;
  return Math.min(score, 100);
}

export default async function handler(req: Request, res: Response) {
  try {
    const { action: _action = 'scan' } = req.body;

    const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

    const actions: HunterAction[] = [];
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    let autoScored = 0;
    let followUpsScheduled = 0;
    let hotLeadsFound = 0;

    for (const lead of allLeads) {
      const score = scoreLeadLocally(lead);
      const createdAt = lead.createdAt ? new Date(lead.createdAt) : now;
      const followUpDate = lead.followUpDate ? new Date(lead.followUpDate) : null;

      // Auto-score unscored leads
      if (!lead.score || lead.score === 0) {
        const newStatus = score >= 60 ? 'hot' : score >= 30 ? 'warm' : 'cold';
        await db.update(leads).set({
          score,
          status: newStatus,
          updatedAt: new Date(),
        } as any).where(eq(leads.leadId, lead.leadId));
        autoScored++;

        if (newStatus === 'hot') {
          hotLeadsFound++;
          actions.push({
            leadId: lead.leadId,
            action: 'AUTO_SCORED_HOT',
            priority: 'URGENT',
            reason: `Score: ${score}/100 — High budget/urgency detected`,
            suggestedMessage: `Hello ${lead.name}, thank you for your interest in DPM Enterprise. We'd love to discuss your ${lead.projectType} project. When would be a good time to connect?`,
            followUpDate: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
          });
        }
      }

      // Flag overdue follow-ups
      if (followUpDate && followUpDate < now && lead.conversionStatus !== 'converted') {
        actions.push({
          leadId: lead.leadId,
          action: 'FOLLOWUP_OVERDUE',
          priority: lead.status === 'hot' ? 'URGENT' : 'HIGH',
          reason: `Follow-up was due ${Math.floor((now.getTime() - followUpDate.getTime()) / (1000 * 60 * 60))}h ago`,
          suggestedMessage: `Hi ${lead.name}, following up on your ${lead.projectType} inquiry. Are you still interested?`,
        });
      }

      // New leads with no follow-up scheduled
      if (createdAt > oneDayAgo && !followUpDate && lead.conversionStatus === 'new') {
        const nextFollowUp = new Date(now.getTime() + 4 * 60 * 60 * 1000);
        await db.update(leads).set({
          followUpDate: nextFollowUp,
          conversionStatus: 'contacted',
          updatedAt: new Date(),
        } as any).where(eq(leads.leadId, lead.leadId));
        followUpsScheduled++;
        actions.push({
          leadId: lead.leadId,
          action: 'FOLLOWUP_SCHEDULED',
          priority: 'MEDIUM',
          reason: 'New lead — auto-scheduled follow-up in 4 hours',
          followUpDate: nextFollowUp.toISOString(),
        });
      }

      // Stale warm leads
      if (lead.status === 'warm' && createdAt < sevenDaysAgo && lead.conversionStatus !== 'converted') {
        actions.push({
          leadId: lead.leadId,
          action: 'STALE_WARM_LEAD',
          priority: 'MEDIUM',
          reason: '7+ days old warm lead — needs re-engagement',
          suggestedMessage: `Hi ${lead.name}, we have some exciting new project ideas for your ${lead.projectType} space. Would you like a free consultation?`,
        });
      }
    }

    // Summary
    const summary = {
      totalLeadsScanned: allLeads.length,
      autoScored,
      hotLeadsFound,
      followUpsScheduled,
      overdueFollowUps: actions.filter(a => a.action === 'FOLLOWUP_OVERDUE').length,
      staleLeads: actions.filter(a => a.action === 'STALE_WARM_LEAD').length,
      actionsGenerated: actions.length,
    };

    res.json({
      success: true,
      summary,
      actions: actions.slice(0, 50), // Top 50 actions
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[AI/Hunter] error:', error);
    res.status(500).json({ error: 'Hunter scan failed', message: String(error) });
  }
}
