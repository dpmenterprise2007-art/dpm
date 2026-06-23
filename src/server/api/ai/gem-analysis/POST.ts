/**
 * GeM Portal AI Analysis
 * POST /api/ai/gem-analysis
 * AI-powered tender analysis, BOQ generation, and bid writing
 */
import type { Request, Response } from 'express';
import { chatCompletion, DPM_SYSTEM_CONTEXT, isOpenAIConfigured } from '../../../lib/openai.js';

type AnalysisType = 'tender' | 'boq' | 'bid' | 'compliance' | 'document';

interface GeMAnalysisRequest {
  type: AnalysisType;
  tenderTitle?: string;
  tenderDescription?: string;
  budget?: number;
  department?: string;
  deadline?: string;
  requirements?: string;
  boqItems?: { item: string; quantity: number; unit: string }[];
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
      type,
      tenderTitle,
      tenderDescription,
      budget,
      department,
      deadline,
      requirements,
    }: GeMAnalysisRequest = req.body;

    if (!type) return res.status(400).json({ error: 'type is required' });

    let prompt = '';

    if (type === 'tender') {
      prompt = `Analyse this GeM Portal tender for DPM Enterprise and provide a bid recommendation:

Tender: ${tenderTitle || 'Interior Works Tender'}
Department: ${department || 'Government Department'}
Budget: ${budget ? `₹${budget.toLocaleString('en-IN')}` : 'Not specified'}
Deadline: ${deadline || 'Not specified'}
Description: ${tenderDescription || requirements || 'Interior design and furnishing works'}

Provide:
1. Win probability (0-100%)
2. Recommended bid strategy
3. Key compliance requirements
4. Competitive advantages DPM has
5. Risk factors
6. Recommended bid amount (as % of budget)
7. Go/No-Go recommendation with reasoning

Return ONLY valid JSON:
{
  "winProbability": 75,
  "recommendation": "GO",
  "bidStrategy": "...",
  "complianceItems": ["GST registration", "GeM registration", "..."],
  "advantages": ["15+ years experience", "..."],
  "risks": ["tight deadline", "..."],
  "recommendedBidPercent": 92,
  "recommendedBidAmount": 920000,
  "summary": "2-3 sentence analysis"
}`;
    } else if (type === 'boq') {
      prompt = `Generate a detailed Bill of Quantities (BOQ) for a government interior project:

Project: ${tenderTitle || 'Government Office Interior'}
Department: ${department || 'Government Office'}
Budget: ${budget ? `₹${budget.toLocaleString('en-IN')}` : 'Standard government budget'}
Requirements: ${requirements || 'Complete office interior with furniture and fittings'}

Generate a comprehensive BOQ with:
- Item description
- Unit (sqft, nos, rmt, etc.)
- Quantity (estimate)
- Unit rate in INR (GeM market rate)
- Total amount
- GST rate (18% for most items)

Return ONLY valid JSON:
{
  "items": [
    {
      "slNo": 1,
      "description": "False Ceiling - Gypsum Board",
      "unit": "sqft",
      "quantity": 1000,
      "unitRate": 85,
      "amount": 85000,
      "gstRate": 18,
      "gstAmount": 15300,
      "totalWithGst": 100300
    }
  ],
  "subtotal": 500000,
  "totalGst": 90000,
  "grandTotal": 590000,
  "notes": "Rates as per GeM portal market price"
}`;
    } else if (type === 'bid') {
      prompt = `Write a professional bid/proposal document for DPM Enterprise for this GeM tender:

Tender: ${tenderTitle || 'Interior Works'}
Department: ${department || 'Government Department'}
Budget: ${budget ? `₹${budget.toLocaleString('en-IN')}` : 'As per tender'}
Requirements: ${requirements || tenderDescription || 'Interior design works'}

Write a compelling bid document including:
1. Cover letter (professional, formal)
2. Company profile highlights
3. Technical approach
4. Quality assurance plan
5. Timeline
6. Why DPM Enterprise should be selected

Return ONLY valid JSON:
{
  "coverLetter": "...",
  "companyProfile": "...",
  "technicalApproach": "...",
  "qualityPlan": "...",
  "timeline": "...",
  "whyUs": ["reason1", "reason2", "reason3"],
  "certifications": ["GeM Registered", "GST Compliant", "ISO Certified"],
  "wordCount": 500
}`;
    } else if (type === 'compliance') {
      prompt = `Check GeM Portal compliance requirements for DPM Enterprise for this tender:

Tender: ${tenderTitle || 'Interior Works'}
Department: ${department || 'Government'}
Requirements: ${requirements || tenderDescription || 'Standard interior works'}

List all compliance requirements and check if DPM Enterprise meets them.

Return ONLY valid JSON:
{
  "requirements": [
    {
      "item": "GeM Registration",
      "required": true,
      "dpmStatus": "compliant",
      "notes": "DPM is registered on GeM portal"
    }
  ],
  "overallCompliance": "compliant",
  "missingDocuments": [],
  "recommendations": ["recommendation1"]
}`;
    } else {
      // document generation
      prompt = `Generate a professional government tender document for DPM Enterprise:

Type: ${requirements || 'Technical Bid Document'}
Tender: ${tenderTitle || 'Interior Works'}
Department: ${department || 'Government Department'}

Generate a formal document with proper headings, sections, and professional language suitable for government submission.

Return as JSON:
{
  "title": "Document Title",
  "sections": [
    { "heading": "Section 1", "content": "..." }
  ],
  "footer": "DPM Enterprise | +91 99309 98063 | info@dpmenterprise.in"
}`;
    }

    const result = await chatCompletion(
      [
        { role: 'system', content: DPM_SYSTEM_CONTEXT },
        { role: 'user', content: prompt },
      ],
      { model: 'gpt-4o-mini', temperature: 0.3, maxTokens: 3000 }
    );

    let analysis: unknown = {};
    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) analysis = JSON.parse(jsonMatch[0]);
    } catch {
      analysis = { result, type };
    }

    res.json({
      success: true,
      type,
      analysis,
      tenderTitle,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[AI] GeM analysis error:', error);
    res.status(500).json({
      error: 'AI analysis failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
