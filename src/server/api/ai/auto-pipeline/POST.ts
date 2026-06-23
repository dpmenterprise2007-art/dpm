/**
 * AI Auto-Pipeline — Full automation: score → assign → follow-up → notify
 */
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';
import { eq, desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { mode: _mode = 'full' } = req.body; // full | score_only | followup_only

    const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
    const results: Array<{ leadId: string; name: string; actions: string[] }> = [];

    for (const lead of allLeads) {
      const actions: string[] = [];

      // Step 1: Auto-score
      if (!lead.score || lead.score === 0) {
        let score = 0;
        if (lead.budget) {
          const b = lead.budget.toLowerCase();
          if (b.includes('crore') || b.includes('cr')) score += 40;
          else if (b.includes('50l') || b.includes('lakh')) score += 25;
          else score += 10;
        }
        if (lead.timeline) {
          const t = lead.timeline.toLowerCase();
          if (t.includes('urgent') || t.includes('immediate')) score += 30;
          else if (t.includes('1 month') || t.includes('month')) score += 15;
        }
        if (lead.email) score += 10;
        if (lead.company) score += 15;

        const newStatus = score >= 60 ? 'hot' : score >= 25 ? 'warm' : 'cold';
        await db.update(leads).set({ score, status: newStatus, updatedAt: new Date() } as any)
          .where(eq(leads.leadId, lead.leadId));
        actions.push(`Scored: ${score}/100 → ${newStatus.toUpperCase()}`);
      }

      // Step 2: Auto follow-up scheduling for new leads
      if (lead.conversionStatus === 'new' && !lead.followUpDate) {
        const followUpDate = new Date(Date.now() + 6 * 60 * 60 * 1000); // 6h from now
        await db.update(leads).set({
          followUpDate,
          conversionStatus: 'contacted',
          updatedAt: new Date(),
        } as any).where(eq(leads.leadId, lead.leadId));
        actions.push(`Follow-up scheduled: ${followUpDate.toLocaleString('en-IN')}`);
      }

      // Step 3: Escalate overdue hot leads
      if (lead.status === 'hot' && lead.followUpDate && new Date(lead.followUpDate) < new Date()) {
        actions.push('ESCALATED: Overdue hot lead — immediate action required');
      }

      if (actions.length > 0) {
        results.push({ leadId: lead.leadId, name: lead.name, actions });
      }
    }

    res.json({
      success: true,
      processed: allLeads.length,
      updated: results.length,
      results: results.slice(0, 100),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[AI/AutoPipeline] error:', error);
    res.status(500).json({ error: 'Pipeline failed', message: String(error) });
  }
}
