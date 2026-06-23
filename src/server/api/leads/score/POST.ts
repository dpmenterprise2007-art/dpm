import type { Request, Response } from 'express';

/**
 * AI Sales Lead Scoring System
 * 
 * SCORING ALGORITHM:
 * - Analyzes lead data from all platforms
 * - Assigns Hot/Warm/Cold status
 * - Prioritizes based on:
 *   - Budget (higher = hotter)
 *   - Project timeline (urgent = hotter)
 *   - Company size (larger = hotter)
 *   - Location (local = hotter)
 *   - Source quality (direct inquiry = hotter)
 */

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  location?: string;
  source: string;
  message?: string;
  timestamp: string;
}

interface ScoredLead extends Lead {
  score: number;
  status: 'hot' | 'warm' | 'cold';
  priority: number;
  insights: string[];
}

// Budget scoring
function scoreBudget(budget?: string): number {
  if (!budget) return 0;
  
  const budgetLower = budget.toLowerCase();
  
  // High budget indicators
  if (budgetLower.includes('crore') || budgetLower.includes('cr')) return 30;
  if (budgetLower.includes('lakh') || budgetLower.includes('lac')) {
    const amount = parseInt(budget.match(/\d+/)?.[0] || '0');
    if (amount >= 50) return 25;
    if (amount >= 20) return 20;
    return 15;
  }
  
  // No budget limit = potential high value
  if (budgetLower.includes('no limit') || budgetLower.includes('flexible')) return 25;
  
  return 10;
}

// Timeline scoring
function scoreTimeline(timeline?: string): number {
  if (!timeline) return 0;
  
  const timelineLower = timeline.toLowerCase();
  
  if (timelineLower.includes('immediate') || timelineLower.includes('urgent') || timelineLower.includes('asap')) return 25;
  if (timelineLower.includes('1 month') || timelineLower.includes('30 days')) return 20;
  if (timelineLower.includes('2 month') || timelineLower.includes('60 days')) return 15;
  if (timelineLower.includes('3 month') || timelineLower.includes('90 days')) return 10;
  
  return 5;
}

// Project type scoring
function scoreProjectType(projectType: string): number {
  const typeLower = projectType.toLowerCase();
  
  // High-value project types
  if (typeLower.includes('corporate') || typeLower.includes('office')) return 20;
  if (typeLower.includes('commercial') || typeLower.includes('showroom')) return 20;
  if (typeLower.includes('government') || typeLower.includes('defense')) return 25;
  if (typeLower.includes('turnkey') || typeLower.includes('complete')) return 20;
  if (typeLower.includes('manufacturing') || typeLower.includes('factory')) return 18;
  if (typeLower.includes('residential') || typeLower.includes('home')) return 15;
  if (typeLower.includes('kitchen') || typeLower.includes('modular')) return 12;
  
  return 10;
}

// Source quality scoring
function scoreSource(source: string): number {
  const sourceLower = source.toLowerCase();
  
  // Direct sources = higher quality
  if (sourceLower.includes('website') || sourceLower.includes('direct')) return 15;
  if (sourceLower.includes('referral') || sourceLower.includes('reference')) return 20;
  if (sourceLower.includes('indiamart')) return 12;
  if (sourceLower.includes('justdial')) return 10;
  if (sourceLower.includes('alibaba') || sourceLower.includes('tradeindia')) return 10;
  if (sourceLower.includes('google') || sourceLower.includes('search')) return 13;
  if (sourceLower.includes('social') || sourceLower.includes('facebook') || sourceLower.includes('instagram')) return 11;
  
  return 8;
}

// Location scoring (Mumbai/Virar area = higher)
function scoreLocation(location?: string): number {
  if (!location) return 0;
  
  const locationLower = location.toLowerCase();
  
  // Local area = easier to service
  if (locationLower.includes('virar') || locationLower.includes('palghar')) return 15;
  if (locationLower.includes('mumbai') || locationLower.includes('thane') || locationLower.includes('navi mumbai')) return 12;
  if (locationLower.includes('maharashtra')) return 10;
  if (locationLower.includes('delhi') || locationLower.includes('bangalore') || locationLower.includes('pune')) return 8;
  
  return 5;
}

// Message quality scoring
function scoreMessage(message?: string): number {
  if (!message) return 0;
  
  const messageLower = message.toLowerCase();
  let score = 0;
  
  // Detailed inquiry = serious buyer
  if (message.length > 100) score += 5;
  if (message.length > 200) score += 5;
  
  // Specific requirements mentioned
  if (messageLower.includes('requirement') || messageLower.includes('need')) score += 3;
  if (messageLower.includes('quotation') || messageLower.includes('quote') || messageLower.includes('price')) score += 5;
  if (messageLower.includes('visit') || messageLower.includes('meeting')) score += 5;
  if (messageLower.includes('urgent') || messageLower.includes('immediate')) score += 5;
  
  return Math.min(score, 15);
}

// Company scoring
function scoreCompany(company?: string): number {
  if (!company) return 0;
  
  const companyLower = company.toLowerCase();
  
  // Corporate/Government = higher value
  if (companyLower.includes('pvt') || companyLower.includes('ltd') || companyLower.includes('limited')) return 10;
  if (companyLower.includes('government') || companyLower.includes('ministry')) return 15;
  if (companyLower.includes('navy') || companyLower.includes('army') || companyLower.includes('defense')) return 15;
  if (companyLower.includes('railway') || companyLower.includes('university')) return 12;
  
  return 5;
}

// Main scoring function
function scoreLead(lead: Lead): ScoredLead {
  const scores = {
    budget: scoreBudget(lead.budget),
    timeline: scoreTimeline(lead.timeline),
    projectType: scoreProjectType(lead.projectType),
    source: scoreSource(lead.source),
    location: scoreLocation(lead.location),
    message: scoreMessage(lead.message),
    company: scoreCompany(lead.company)
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  // Determine status based on score
  let status: 'hot' | 'warm' | 'cold';
  if (totalScore >= 70) status = 'hot';
  else if (totalScore >= 40) status = 'warm';
  else status = 'cold';

  // Generate insights
  const insights: string[] = [];
  if (scores.budget >= 20) insights.push('High budget potential');
  if (scores.timeline >= 20) insights.push('Urgent timeline');
  if (scores.projectType >= 20) insights.push('High-value project type');
  if (scores.company >= 10) insights.push('Corporate/Government client');
  if (scores.location >= 12) insights.push('Local area - easy to service');
  if (scores.source >= 15) insights.push('High-quality lead source');

  return {
    ...lead,
    score: totalScore,
    status,
    priority: totalScore,
    insights
  };
}

export default async function handler(req: Request, res: Response) {
  try {
    const { leads, singleLead } = req.body;

    // Score single lead
    if (singleLead) {
      const scored = scoreLead(singleLead);
      return res.status(200).json({
        success: true,
        lead: scored
      });
    }

    // Score multiple leads
    if (leads && Array.isArray(leads)) {
      const scoredLeads = leads.map(scoreLead);
      
      // Sort by priority (highest first)
      scoredLeads.sort((a, b) => b.priority - a.priority);

      // Categorize
      const hot = scoredLeads.filter(l => l.status === 'hot');
      const warm = scoredLeads.filter(l => l.status === 'warm');
      const cold = scoredLeads.filter(l => l.status === 'cold');

      return res.status(200).json({
        success: true,
        total: scoredLeads.length,
        categorized: {
          hot: hot.length,
          warm: warm.length,
          cold: cold.length
        },
        leads: scoredLeads,
        summary: {
          hotLeads: hot,
          warmLeads: warm,
          coldLeads: cold
        }
      });
    }

    return res.status(400).json({
      success: false,
      error: 'Please provide either singleLead or leads array'
    });

  } catch (error) {
    console.error('Lead scoring error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to score leads',
      message: String(error)
    });
  }
}
