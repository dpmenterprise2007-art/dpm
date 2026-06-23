/**
 * AI Quote Generator
 * POST /api/ai/generate-quote
 * Generates professional project quotes using GPT
 */
import type { Request, Response } from 'express';
import { chatCompletion, DPM_SYSTEM_CONTEXT, isOpenAIConfigured } from '../../../lib/openai.js';

interface QuoteRequest {
  projectType: string;
  area?: number;         // sq ft
  location?: string;
  requirements?: string;
  budget?: string;
  clientName?: string;
  timeline?: string;
}

export default async function handler(req: Request, res: Response) {
  try {
    if (!isOpenAIConfigured()) {
      return res.status(503).json({
        error: 'OpenAI not configured',
        message: 'Add OPENAI_API_KEY in Settings → Secrets',
      });
    }

    const {
      projectType,
      area,
      location,
      requirements,
      budget,
      clientName,
      timeline,
    }: QuoteRequest = req.body;

    if (!projectType) {
      return res.status(400).json({ error: 'projectType is required' });
    }

    const prompt = `Generate a detailed professional project quote for DPM Enterprise:

Project Details:
- Client: ${clientName || 'Valued Client'}
- Project Type: ${projectType}
- Area: ${area ? `${area} sq ft` : 'To be measured'}
- Location: ${location || 'Navi Mumbai / Mumbai'}
- Requirements: ${requirements || 'Standard finish'}
- Budget Range: ${budget ? `₹${parseInt(budget).toLocaleString('en-IN')}` : 'To be discussed'}
- Timeline: ${timeline || 'Standard'}

Generate a comprehensive quote with:
1. Executive summary (2-3 sentences)
2. Scope of work (itemised list with estimated costs in INR)
3. Material specifications (quality grade)
4. Timeline breakdown (phases)
5. Total estimated cost range (min-max in INR)
6. Payment terms (standard DPM terms: 30% advance, 40% mid, 30% completion)
7. Inclusions and exclusions
8. Validity period

Return ONLY valid JSON:
{
  "summary": "...",
  "scopeItems": [
    { "item": "Design & Planning", "description": "...", "estimatedCost": 50000 }
  ],
  "materialGrade": "Premium / Standard / Economy",
  "timeline": { "total": "3 months", "phases": ["Phase 1: ...", "Phase 2: ..."] },
  "costRange": { "min": 500000, "max": 750000 },
  "paymentTerms": "30% advance, 40% at mid-stage, 30% on completion",
  "inclusions": ["item1", "item2"],
  "exclusions": ["item1", "item2"],
  "validity": "30 days",
  "totalItems": 5
}`;

    const result = await chatCompletion(
      [
        { role: 'system', content: DPM_SYSTEM_CONTEXT },
        { role: 'user', content: prompt },
      ],
      { model: 'gpt-4o-mini', temperature: 0.4, maxTokens: 2000 }
    );

    let quote: unknown = {};
    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) quote = JSON.parse(jsonMatch[0]);
    } catch {
      quote = { summary: result, costRange: { min: 0, max: 0 } };
    }

    res.json({
      success: true,
      quote,
      projectType,
      clientName: clientName || 'Valued Client',
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[AI] Quote generation error:', error);
    res.status(500).json({
      error: 'AI quote generation failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
