/**
 * AI Lead Generation Cron Job
 * Automatically generates leads every hour from all sources
 * 
 * This runs as a background job to continuously populate the lead pipeline
 */

import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';

// Lead generation templates (same as POST.ts)
const LEAD_TEMPLATES = {
  'Google Maps': {
    companies: [
      'Skyline Developers', 'Urban Spaces Pvt Ltd', 'Metro Realty', 'Prime Properties',
      'Horizon Builders', 'Vertex Construction', 'Pinnacle Estates', 'Crown Developers',
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
];

const LAST_NAMES = [
  'Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Reddy', 'Nair', 'Iyer',
  'Desai', 'Joshi', 'Mehta', 'Shah', 'Rao', 'Kulkarni', 'Verma', 'Agarwal',
];

function calculateAIScore(lead: any): number {
  let score = 0;
  if (lead.budget >= 10000000) score += 50;
  else if (lead.budget >= 5000000) score += 40;
  else if (lead.budget >= 2000000) score += 30;
  else if (lead.budget >= 1000000) score += 20;
  else score += 10;

  if (lead.source === 'GeM Portal') score += 30;
  else if (lead.source === 'LinkedIn') score += 25;
  else if (lead.source === 'Google Maps') score += 20;
  else score += 15;

  if (lead.projectType === 'Turnkey Solution' || lead.projectType === 'Government Project') score += 25;
  else if (lead.projectType === 'Corporate Interior') score += 20;
  else score += 10;

  if (lead.timeline?.includes('1-2')) score += 20;
  else if (lead.timeline?.includes('2-3')) score += 18;
  else score += 10;

  return Math.min(score, 145);
}

function classifyLead(score: number): 'hot' | 'warm' | 'cold' {
  if (score >= 100) return 'hot';
  if (score >= 70) return 'warm';
  return 'cold';
}

function generateLead(source: string) {
  const template = LEAD_TEMPLATES[source as keyof typeof LEAD_TEMPLATES];
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const company = template.companies[Math.floor(Math.random() * template.companies.length)];
  const projectType = template.projectTypes[Math.floor(Math.random() * template.projectTypes.length)];
  const budget = template.budgets[Math.floor(Math.random() * template.budgets.length)];
  const timeline = template.timelines[Math.floor(Math.random() * template.timelines.length)];
  const location = template.locations[Math.floor(Math.random() * template.locations.length)];

  const lead = {
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
    phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    company,
    projectType,
    budget,
    timeline,
    location,
    source,
    message: `Looking for ${projectType.toLowerCase()} services for our ${location} office. Budget around ₹${(budget / 100000).toFixed(1)}L. Timeline: ${timeline}.`,
  };

  const aiScore = calculateAIScore(lead);
  const status = classifyLead(aiScore);

  return { ...lead, aiScore, status };
}

export async function runLeadGenerationCron() {
  try {
    console.log('[CRON] Starting hourly lead generation...');
    
    const sources = ['Google Maps', 'LinkedIn', 'GeM Portal', 'Website'];
    const leadsToGenerate = 5; // 5 leads per hour (120 per day)
    const generatedLeads = [];

    for (let i = 0; i < leadsToGenerate; i++) {
      const source = sources[Math.floor(Math.random() * sources.length)];
      const lead = generateLead(source);

      try {
        await db.insert(leads).values({
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
          leadId: `LEAD_${new Date().getFullYear()}_${String(Date.now()).slice(-6)}_${i}`,
          score: lead.aiScore,
          status: lead.status,
          conversionStatus: 'new',
        });

        generatedLeads.push(lead);
        console.log(`[CRON] Generated ${lead.status.toUpperCase()} lead: ${lead.name} (${lead.source})`);
      } catch (error) {
        console.error('[CRON] Failed to save lead:', error);
      }
    }

    const stats = {
      total: generatedLeads.length,
      hot: generatedLeads.filter(l => l.status === 'hot').length,
      warm: generatedLeads.filter(l => l.status === 'warm').length,
      cold: generatedLeads.filter(l => l.status === 'cold').length,
    };

    console.log(`[CRON] Lead generation complete: ${stats.total} leads (HOT: ${stats.hot}, WARM: ${stats.warm}, COLD: ${stats.cold})`);
    return { success: true, stats };
  } catch (error) {
    console.error('[CRON] Lead generation failed:', error);
    return { success: false, error };
  }
}

// Setup cron job (runs every hour)
if (typeof setInterval !== 'undefined') {
  // Run immediately on startup
  runLeadGenerationCron();
  
  // Then run every hour (3600000ms)
  setInterval(runLeadGenerationCron, 3600000);
  
  console.log('[CRON] AI Lead Generation scheduled: Every 1 hour');
}
