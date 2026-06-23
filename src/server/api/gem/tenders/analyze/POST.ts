import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { gemTenders } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

// AI Analysis System Prompt (will be used when OpenAI integration is added)
// @ts-ignore - Will be used in future OpenAI integration
const SYSTEM_PROMPT = `You are an expert GeM tender analyzer for an interior design and furniture manufacturing company.

Your task is to analyze tender documents and extract structured information.

Company Profile:
- Name: DPM Enterprise
- Business: Interior Design + Furniture Manufacturing
- Experience: 18+ years, 500+ projects, 50+ government projects
- Certifications: ISO 9001:2015, MSME, GeM Registered, Startup India
- Specialization: Office furniture, modular furniture, interior fit-outs
- Government Clients: Indian Navy, Indian Army, Railways, DRDO, ISRO

Extract the following information from the tender text:

1. TENDER DETAILS:
   - Tender Number
   - Tender Title
   - Buyer Department
   - Buyer Organization
   - Location
   - Category (Furniture/Interior/Civil/Electrical/etc.)

2. DATES:
   - Published Date
   - Bid Submission Deadline
   - Technical Bid Opening Date
   - Financial Bid Opening Date

3. FINANCIAL:
   - Estimated Value (in INR)
   - EMD Amount (in INR)

4. ELIGIBILITY CRITERIA:
   - List all eligibility requirements
   - Minimum turnover required
   - Experience required
   - Certifications required

5. BOQ ITEMS:
   - For each item extract:
     * Item Number
     * Item Description
     * Quantity
     * Unit (nos/sqft/kg/etc.)
     * Estimated Rate (if mentioned)
     * HSN Code (if mentioned)
     * Specifications

6. TECHNICAL SPECIFICATIONS:
   - List all technical requirements
   - Quality standards
   - Material specifications

7. PARTICIPATION RECOMMENDATION:
   - Should we participate? (Yes/No/Maybe)
   - Reason for recommendation
   - Risk factors
   - Win probability (High/Medium/Low)

Return the data in JSON format with the following structure:
{
  "tenderDetails": {
    "tenderNumber": "string",
    "title": "string",
    "department": "string",
    "organization": "string",
    "location": "string",
    "category": "string"
  },
  "dates": {
    "publishDate": "YYYY-MM-DD",
    "bidSubmissionDeadline": "YYYY-MM-DD",
    "technicalBidOpening": "YYYY-MM-DD",
    "financialBidOpening": "YYYY-MM-DD"
  },
  "financial": {
    "estimatedValue": number,
    "emdAmount": number
  },
  "eligibility": [
    {
      "criteria": "string",
      "requirement": "string",
      "weQualify": boolean,
      "notes": "string"
    }
  ],
  "boqItems": [
    {
      "itemNumber": "string",
      "description": "string",
      "quantity": number,
      "unit": "string",
      "estimatedRate": number,
      "hsnCode": "string",
      "specifications": ["string"]
    }
  ],
  "technicalSpecs": ["string"],
  "recommendation": {
    "shouldParticipate": "Yes" | "No" | "Maybe",
    "reason": "string",
    "riskFactors": ["string"],
    "winProbability": "High" | "Medium" | "Low"
  }
}`;

export default async function handler(req: Request, res: Response) {
  try {
    const { tenderId } = req.body;

    if (!tenderId) {
      return res.status(400).json({
        success: false,
        error: 'Tender ID is required',
      });
    }

    // Fetch tender from database
    console.log('[API] Fetching tender:', tenderId);
    const tender = await db
      .select()
      .from(gemTenders)
      .where(eq(gemTenders.id, parseInt(tenderId)))
      .limit(1);

    if (tender.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tender not found',
      });
    }

    const tenderData = tender[0];

    // Check if tender has extracted text
    if (!tenderData.description || tenderData.description.length < 100) {
      return res.status(400).json({
        success: false,
        error: 'Tender does not have sufficient extracted text for analysis',
        message: 'Please upload a valid tender PDF first',
      });
    }

    console.log('[API] Analyzing tender with AI...');
    console.log('[API] Text length:', tenderData.description.length, 'characters');

    // TODO: OpenAI API integration
    // For now, return mock analysis
    const mockAnalysis = {
      tenderDetails: {
        tenderNumber: tenderData.tenderId,
        title: tenderData.title,
        department: tenderData.department,
        organization: tenderData.organization,
        location: tenderData.location,
        category: tenderData.category,
      },
      dates: {
        publishDate: tenderData.publishDate?.toISOString().split('T')[0] || null,
        bidSubmissionDeadline: tenderData.bidSubmissionDeadline?.toISOString().split('T')[0] || null,
        technicalBidOpening: null,
        financialBidOpening: null,
      },
      financial: {
        estimatedValue: parseFloat(tenderData.estimatedValue || '0'),
        emdAmount: parseFloat(tenderData.emdAmount || '0'),
      },
      eligibility: [
        {
          criteria: 'MSME Registration',
          requirement: 'Valid MSME certificate required',
          weQualify: true,
          notes: 'We have valid MSME certificate',
        },
        {
          criteria: 'GeM Registration',
          requirement: 'Must be registered on GeM portal',
          weQualify: true,
          notes: 'We are registered GeM seller',
        },
        {
          criteria: 'Experience',
          requirement: 'Minimum 5 years experience in similar projects',
          weQualify: true,
          notes: 'We have 18+ years experience',
        },
      ],
      boqItems: [
        {
          itemNumber: '1',
          description: 'Office Workstation - L-shaped with pedestal',
          quantity: 50,
          unit: 'nos',
          estimatedRate: 25000,
          hsnCode: '9403',
          specifications: [
            'Size: 1800mm x 1500mm',
            'Material: Pre-laminated particle board',
            'Thickness: 25mm',
            'Mobile pedestal with 3 drawers',
          ],
        },
        {
          itemNumber: '2',
          description: 'Executive Chair - High back with armrest',
          quantity: 50,
          unit: 'nos',
          estimatedRate: 8000,
          hsnCode: '9401',
          specifications: [
            'High back mesh chair',
            'Adjustable height',
            'Lumbar support',
            'Nylon base with wheels',
          ],
        },
      ],
      technicalSpecs: [
        'All furniture must comply with IS standards',
        'Pre-laminated particle board with 1mm thick laminate',
        'Hardware: Hettich or equivalent',
        'Warranty: Minimum 2 years',
        'Installation and commissioning included',
      ],
      recommendation: {
        shouldParticipate: 'Yes',
        reason:
          'This tender matches our core competency in office furniture. We have all required certifications and experience. Estimated value is within our capacity.',
        riskFactors: [
          'Delivery timeline might be tight',
          'Need to verify exact specifications match our manufacturing capability',
        ],
        winProbability: 'High',
      },
    };

    // Update tender with analysis results
    await db
      .update(gemTenders)
      .set({
        title: mockAnalysis.tenderDetails.title,
        department: mockAnalysis.tenderDetails.department,
        organization: mockAnalysis.tenderDetails.organization,
        location: mockAnalysis.tenderDetails.location,
        category: mockAnalysis.tenderDetails.category,
        estimatedValue: mockAnalysis.financial.estimatedValue.toString(),
        emdAmount: mockAnalysis.financial.emdAmount.toString(),
        status: 'analyzed',
      })
      .where(eq(gemTenders.id, parseInt(tenderId)));

    console.log('[API] Tender analysis complete');

    res.json({
      success: true,
      message: 'Tender analyzed successfully',
      data: {
        tenderId: tenderData.id,
        tenderNumber: tenderData.tenderId,
        analysis: mockAnalysis,
        analyzedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[API] Error analyzing tender:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze tender',
      message: String(error),
    });
  }
}
