/**
 * GeM Tender Seeder API
 * Populate database with sample government tenders
 */

import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { gemTenders } from '../../../../db/schema.js';

const ORGANIZATIONS = [
  'Indian Railways', 'CIDCO', 'MMRDA', 'PWD Maharashtra', 'NMMC', 'TMC',
  'Ministry of Defence', 'CPWD', 'BRO', 'NHAI', 'Airport Authority of India',
];

const CATEGORIES = [
  'Office Furniture', 'Interior Work', 'Civil Work', 'Modular Kitchen',
  'Electrical Work', 'HVAC Installation', 'Flooring Work', 'Painting Work',
];

const LOCATIONS = [
  'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
];

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomAmount(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default async function handler(req: Request, res: Response) {
  try {
    const { count = 20 } = req.body;

    const tenderData = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
      const tenderId = `GEM_${new Date().getFullYear()}_${String(100000 + i).padStart(6, '0')}`;
      const organization = ORGANIZATIONS[Math.floor(Math.random() * ORGANIZATIONS.length)];
      const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
      const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      const estimatedValue = randomAmount(500000, 50000000);
      const emdAmount = (estimatedValue * 2) / 100; // 2% EMD

      const publishDate = randomDate(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), now);
      const bidDeadline = new Date(publishDate.getTime() + (15 + Math.floor(Math.random() * 30)) * 24 * 60 * 60 * 1000);
      const techOpeningDate = new Date(bidDeadline.getTime() + 2 * 24 * 60 * 60 * 1000);
      const finOpeningDate = new Date(techOpeningDate.getTime() + 3 * 24 * 60 * 60 * 1000);

      const status = bidDeadline > now ? 'active' : Math.random() > 0.5 ? 'closed' : 'awarded';

      tenderData.push({
        tenderId,
        title: `${category} for ${organization} - ${location}`,
        description: `Supply and installation of ${category.toLowerCase()} as per specifications. Project location: ${location}. Estimated completion: 60-90 days.`,
        category,
        organization,
        department: ['Admin', 'Engineering', 'Infrastructure', 'Procurement'][Math.floor(Math.random() * 4)],
        location,
        estimatedValue: estimatedValue.toFixed(2),
        emdAmount: emdAmount.toFixed(2),
        publishDate,
        bidSubmissionDeadline: bidDeadline,
        technicalBidOpeningDate: techOpeningDate,
        financialBidOpeningDate: finOpeningDate,
        eligibilityCriteria: 'MSME/Startup India registered, ISO 9001:2015 certified, GST registered, Minimum 3 years experience',
        technicalRequirements: 'As per tender document specifications. Quality certificates required. Sample submission mandatory.',
        documentsRequired: JSON.stringify([
          'GST Certificate',
          'PAN Card',
          'MSME/Startup India Certificate',
          'ISO 9001:2015 Certificate',
          'Experience Certificates',
          'Financial Statements (Last 3 years)',
          'EMD Payment Proof',
        ]),
        status,
        gemUrl: `https://gem.gov.in/tender/${tenderId}`,
        bidNumber: `BID_${tenderId}`,
      });
    }

    // Insert tenders in batches
    for (let i = 0; i < tenderData.length; i += 10) {
      const batch = tenderData.slice(i, i + 10);
      await db.insert(gemTenders).values(batch);
    }

    const activeTenders = tenderData.filter(t => t.status === 'active').length;
    const totalValue = tenderData.reduce((sum, t) => sum + parseFloat(t.estimatedValue), 0);

    console.log(`[GeM] Seeded ${count} tenders (Active: ${activeTenders}, Total Value: ₹${totalValue.toFixed(0)})`);

    res.status(201).json({
      success: true,
      data: {
        totalTenders: count,
        activeTenders,
        closedTenders: tenderData.filter(t => t.status === 'closed').length,
        awardedTenders: tenderData.filter(t => t.status === 'awarded').length,
      },
      summary: {
        totalValue: totalValue.toFixed(2),
        avgValue: (totalValue / count).toFixed(2),
      },
      message: 'GeM tenders seeded successfully',
    });
  } catch (error) {
    console.error('[GeM] Seed tenders error:', error);
    res.status(500).json({
      error: 'Failed to seed tenders',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
