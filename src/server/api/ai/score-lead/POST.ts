/**
 * AI Lead Scoring API
 * POST /api/ai/score-lead
 * Uses GPT to intelligently score and analyse a lead
 */
import type { Request, Response } from 'express';
import { chatCompletion, DPM_SYSTEM_CONTEXT, isOpenAIConfigured } from '../../../lib/openai.js';

interface LeadData {
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  location?: string;
  message?: string;
  source?: string;
}

export default async function handler(req: Request, res: Response) {
  try {
    if (!isOpenAIConfigured()) {
      return res.status(503).json({
        error: 'OpenAI not configured',
        message: 'Add OPENAI_API_KEY in Settings → Secrets',
      });
    }

    const lead: LeadData = req.body;

    if (!lead.name) {
      return res.status(400).json({ error: 'Lead name is required' });
    }

    const prompt = `Analyse this lead for DPM Enterprise and provide a detailed scoring:

Lead Details:
- Name: ${lead.name}
- Company: ${lead.company || 'Not provided'}
- Project Type: ${lead.projectType || 'Not specified'}
- Budget: ${lead.budget ? `₹${parseInt(lead.budget).toLocaleString('en-IN')}` : 'Not specified'}
- Timeline: ${lead.timeline || 'Not specified'}
- Location: ${lead.location || 'Not specified'}
- Source: ${lead.source || 'Unknown'}
- Message: ${lead.message || 'No message'}

Score this lead on a scale of 0-100 and provide:
1. Overall score (0-100)
2. Temperature: hot (80+), warm (50-79), cold (below 50)
3. Key strengths of this lead (2-3 points)
4. Potential concerns (1-2 points)
5. Recommended next action (specific, actionable)
6. Estimated deal value in INR
7. Priority level: high/medium/low

Return ONLY valid JSON:
{
  "score": 75,
  "temperature": "warm",
  "strengths": ["point 1", "point 2"],
  "concerns": ["concern 1"],
  "nextAction": "specific action to take",
  "estimatedValue": 500000,
  "priority": "high",
  "summary": "2-3 sentence analysis"
}`;

    const result = await chatCompletion(
      [
        { role: 'system', content: DPM_SYSTEM_CONTEXT },
        { role: 'user', content: prompt },
      ],
      { model: 'gpt-4o-mini', temperature: 0.3, maxTokens: 800 }
    );

    let analysis: unknown = {};
    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) analysis = JSON.parse(jsonMatch[0]);
    } catch {
      analysis = { score: 50, temperature: 'warm', summary: result, nextAction: 'Follow up with lead' };
    }

    res.json({ success: true, analysis, lead: lead.name });
  } catch (error) {
    console.error('[AI] Lead scoring error:', error);
    res.status(500).json({
      error: 'AI scoring failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
