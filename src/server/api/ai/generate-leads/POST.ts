import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';

/**
 * AI Lead Generation Engine
 * POST /api/ai/generate-leads
 * 
 * Simulates lead discovery from multiple sources:
 * - Google Maps (local businesses)
 * - LinkedIn (corporate contacts)
 * - GeM Portal (government tenders)
 * - Website (organic inquiries)
 * 
 * Generates realistic mock leads with AI scoring
 */

interface LeadGenerationRequest {
  source: 'Google Maps' | 'LinkedIn' | 'GeM Portal' | 'Website' | 'All';
  industry?: string;
  location?: string;
  budget?: string;
  count?: number;
}

interface GeneratedLead {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: number;
  timeline: string;
  location: string;
  message: string;
  source: string;
  aiScore: number;
  classification: 'HOT' | 'WARM' | 'COLD';
}

// Lead generation templates by source
const LEAD_TEMPLATES = {
  'Google Maps': {
    companies: [
      'Skyline Developers', 'Urban Spaces Pvt Ltd', 'Metro Realty', 'Prime Properties',
      'Horizon Builders', 'Vertex Construction', 'Pinnacle Estates', 'Crown Developers',
      'Elite Homes', 'Royal Residency', 'Prestige Builders', 'Landmark Properties',
    ],
    projectTypes: ['Residential Interior', 'Commercial Showroom', 'Corporate Interior'],
    budgets: [500000, 800000, 1200000, 1500000, 2000000, 2500000],
    timelines: ['1-2 months', '2-3 months', '3-4 months', '4-6 months'],
    locations: ['Navi Mumbai', 'Thane', 'Mumbai', 'Pune', 'Panvel', 'Kharghar', 'Vashi'],
  },
  'LinkedIn': {
    companies: [
      'TCS', 'Infosys', 'Wipro', 'Tech Mahindra', 'Cognizant', 'HCL Technologies',
      'Accenture India', 'Capgemini', 'IBM India', 'Oracle India', 'SAP Labs',
    ],
    projectTypes: ['Corporate Interior', 'Turnkey Solution', 'Commercial Showroom'],
    budgets: [2000000, 3000000, 5000000, 8000000, 10000000, 15000000],
    timelines: ['3-4 months', '4-6 months', '6-8 months', '8-12 months'],
    locations: ['Mumbai', 'Navi Mumbai', 'Pune', 'Thane', 'BKC', 'Andheri', 'Powai'],
  },
  'GeM Portal': {
    companies: [
      'CIDCO', 'MMRDA', 'PWD Maharashtra', 'NMMC', 'TMC', 'PMC',
      'Indian Railways', 'MSEB', 'BEST', 'MHADA', 'MIDC',
    ],
    projectTypes: ['Government Project', 'Turnkey Solution', 'Furniture Manufacturing'],
    budgets: [5000000, 8000000, 12000000, 20000000, 30000000, 50000000],
    timelines: ['6-8 months', '8-12 months', '12-18 months', '18-24 months'],
    locations: ['Navi Mumbai', 'Mumbai', 'Thane', 'Pune', 'Nashik', 'Nagpur'],
  },
  'Website': {
    companies: [
      'Individual', 'Private Client', 'Homeowner', 'Business Owner',
      'Startup', 'SME', 'Retail Chain', 'Restaurant Owner',
    ],
    projectTypes: ['Residential Interior', 'Modular Kitchen', 'Commercial Showroom', 'Corporate Interior'],
    budgets: [300000, 500000, 800000, 1000000, 1500000, 2000000],
    timelines: ['1-2 months', '2-3 months', '3-4 months'],
    locations: ['Navi Mumbai', 'Mumbai', 'Thane', 'Pune', 'Panvel'],
  },
};

const FIRST_NAMES = [
  'Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Rahul', 'Pooja',
  'Sanjay', 'Neha', 'Arun', 'Kavita', 'Suresh', 'Meera', 'Kiran', 'Deepa',
  'Manoj', 'Ritu', 'Ashok', 'Sunita', 'Ramesh', 'Geeta', 'Vijay', 'Shweta',
];

const LAST_NAMES = [
  'Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Reddy', 'Nair', 'Iyer',
  'Desai', 'Joshi', 'Mehta', 'Shah', 'Rao', 'Kulkarni', 'Verma', 'Agarwal',
];

// Calculate AI score based on lead attributes
function calculateAIScore(lead: Partial<GeneratedLead>): number {
  let score = 0;

  // Budget score (0-50 points)
  if (lead.budget) {
    if (lead.budget >= 10000000) score += 50;
    else if (lead.budget >= 5000000) score += 40;
    else if (lead.budget >= 2000000) score += 30;
    else if (lead.budget >= 1000000) score += 20;
    else score += 10;
  }

  // Source score (0-30 points)
  if (lead.source === 'GeM Portal') score += 30;
  else if (lead.source === 'LinkedIn') score += 25;
  else if (lead.source === 'Google Maps') score += 20;
  else if (lead.source === 'Website') score += 15;

  // Project type score (0-25 points)
  if (lead.projectType === 'Turnkey Solution') score += 25;
  else if (lead.projectType === 'Government Project') score += 25;
  else if (lead.projectType === 'Corporate Interior') score += 20;
  else if (lead.projectType === 'Commercial Showroom') score += 15;
  else score += 10;

  // Timeline score (0-20 points)
  if (lead.timeline?.includes('1-2')) score += 20;
  else if (lead.timeline?.includes('2-3')) score += 18;
  else if (lead.timeline?.includes('3-4')) score += 15;
  else if (lead.timeline?.includes('4-6')) score += 12;
  else score += 8;

  // Company score (0-20 points)
  if (lead.company && !['Individual', 'Private Client', 'Homeowner'].includes(lead.company)) {
    score += 20;
  } else {
    score += 10;
  }

  return Math.min(score, 145); // Max 145 points
}

// Classify lead based on AI score
function classifyLead(score: number): 'HOT' | 'WARM' | 'COLD' {
  if (score >= 100) return 'HOT';
  if (score >= 70) return 'WARM';
  return 'COLD';
}

// Generate random lead
function generateLead(source: string): GeneratedLead {
  const template = LEAD_TEMPLATES[source as keyof typeof LEAD_TEMPLATES];
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const company = template.companies[Math.floor(Math.random() * template.companies.length)];
  const projectType = template.projectTypes[Math.floor(Math.random() * template.projectTypes.length)];
  const budget = template.budgets[Math.floor(Math.random() * template.budgets.length)];
  const timeline = template.timelines[Math.floor(Math.random() * template.timelines.length)];
  const location = template.locations[Math.floor(Math.random() * template.locations.length)];

  const lead: Partial<GeneratedLead> = {
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
    phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    company,
    projectType,
    budget,
    timeline,
    location,
    source,
  };

  // Generate contextual message
  const messages = [
    `Looking for ${projectType.toLowerCase()} services for our ${location} office. Budget around ₹${(budget / 100000).toFixed(1)}L. Timeline: ${timeline}.`,
    `We need professional interior design for ${projectType.toLowerCase()}. Project location: ${location}. Estimated budget: ₹${(budget / 100000).toFixed(1)}L.`,
    `Interested in ${projectType.toLowerCase()} for our ${location} property. Timeline: ${timeline}. Budget: ₹${(budget / 100000).toFixed(1)}L.`,
    `Require complete ${projectType.toLowerCase()} solution. Location: ${location}. Budget: ₹${(budget / 100000).toFixed(1)}L. Timeline: ${timeline}.`,
  ];
  lead.message = messages[Math.floor(Math.random() * messages.length)];

  // Calculate AI score and classification
  lead.aiScore = calculateAIScore(lead);
  lead.classification = classifyLead(lead.aiScore!);

  return lead as GeneratedLead;
}

export default async function handler(req: Request, res: Response) {
  try {
    const { source, industry, location, budget, count = 10 }: LeadGenerationRequest = req.body;

    // Validation
    if (!source) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: source',
      });
    }

    if (count > 50) {
      return res.status(400).json({
        success: false,
        error: 'Maximum 50 leads can be generated at once',
      });
    }

    // Determine sources to generate from
    const sources = source === 'All' 
      ? ['Google Maps', 'LinkedIn', 'GeM Portal', 'Website']
      : [source];

    // Generate leads
    const generatedLeads: GeneratedLead[] = [];
    const leadsPerSource = Math.ceil(count / sources.length);

    for (const src of sources) {
      for (let i = 0; i < leadsPerSource && generatedLeads.length < count; i++) {
        const lead = generateLead(src);
        
        // Apply filters if provided
        if (location && !lead.location.toLowerCase().includes(location.toLowerCase())) {
          continue;
        }
        if (budget && lead.budget < parseInt(budget)) {
          continue;
        }
        if (industry && !lead.projectType.toLowerCase().includes(industry.toLowerCase())) {
          continue;
        }

        generatedLeads.push(lead);
      }
    }

    // Save leads to database
    const savedLeads: Array<GeneratedLead & { id: number }> = [];
    for (const lead of generatedLeads) {
      try {
        const [result] = await db.insert(leads).values({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          company: lead.company,
          projectType: lead.projectType,
          budget: lead.budget.toString(),
          timeline: lead.timeline,
          location: lead.location,
          message: lead.message,
          source: lead.source,
          leadId: `LEAD_${new Date().getFullYear()}_${String(Date.now()).slice(-6)}`,
          score: lead.aiScore,
          status: lead.classification.toLowerCase() as 'hot' | 'warm' | 'cold',
          conversionStatus: 'new',
        });

        savedLeads.push({
          id: Number(result.insertId),
          ...lead,
        });
      } catch (error) {
        console.error('Failed to save lead:', error);
      }
    }

    // Calculate statistics
    const stats = {
      total: savedLeads.length,
      hot: savedLeads.filter(l => l.classification === 'HOT').length,
      warm: savedLeads.filter(l => l.classification === 'WARM').length,
      cold: savedLeads.filter(l => l.classification === 'COLD').length,
      averageScore: Math.round(savedLeads.reduce((sum, l) => sum + l.aiScore, 0) / savedLeads.length),
      totalValue: savedLeads.reduce((sum, l) => sum + l.budget, 0),
      bySource: sources.reduce((acc, src) => {
        acc[src] = savedLeads.filter(l => l.source === src).length;
        return acc;
      }, {} as Record<string, number>),
    };

    return res.status(201).json({
      success: true,
      message: `Generated ${savedLeads.length} leads successfully`,
      leads: savedLeads,
      stats,
      filters: {
        source,
        industry,
        location,
        budget,
      },
    });
  } catch (error) {
    console.error('Lead generation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate leads',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
