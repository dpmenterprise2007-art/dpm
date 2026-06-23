/**
 * Enhanced Quote Generator API
 * Generate detailed quotes with line items and GST
 */

import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { quotes, salesActivities } from '../../../../db/schema.js';

// Pricing templates per project type
const PRICING_TEMPLATES = {
  'Residential Interior': {
    baseRate: 1200, // per sqft
    items: [
      { item: 'Design Consultation', rate: 15000, unit: 'lumpsum' },
      { item: 'False Ceiling', rate: 180, unit: 'sqft' },
      { item: 'Wall Painting', rate: 45, unit: 'sqft' },
      { item: 'Flooring (Tiles/Marble)', rate: 250, unit: 'sqft' },
      { item: 'Electrical Work', rate: 120, unit: 'sqft' },
      { item: 'Plumbing Work', rate: 80, unit: 'sqft' },
      { item: 'Furniture & Fixtures', rate: 400, unit: 'sqft' },
    ],
  },
  'Corporate Interior': {
    baseRate: 1500,
    items: [
      { item: 'Design & Planning', rate: 50000, unit: 'lumpsum' },
      { item: 'Modular Workstations', rate: 25000, unit: 'unit' },
      { item: 'Conference Room Setup', rate: 150000, unit: 'room' },
      { item: 'Reception Area', rate: 200000, unit: 'lumpsum' },
      { item: 'Electrical & IT Cabling', rate: 150, unit: 'sqft' },
      { item: 'HVAC Integration', rate: 200, unit: 'sqft' },
      { item: 'False Ceiling & Lighting', rate: 220, unit: 'sqft' },
    ],
  },
  'Modular Kitchen': {
    baseRate: 2000,
    items: [
      { item: 'Kitchen Design', rate: 10000, unit: 'lumpsum' },
      { item: 'Base Cabinets', rate: 15000, unit: 'unit' },
      { item: 'Wall Cabinets', rate: 12000, unit: 'unit' },
      { item: 'Countertop (Granite/Quartz)', rate: 450, unit: 'sqft' },
      { item: 'Sink & Faucet', rate: 15000, unit: 'set' },
      { item: 'Chimney & Hob', rate: 35000, unit: 'set' },
      { item: 'Electrical & Plumbing', rate: 25000, unit: 'lumpsum' },
    ],
  },
  'Government Project': {
    baseRate: 1800,
    items: [
      { item: 'Project Planning & Design', rate: 100000, unit: 'lumpsum' },
      { item: 'Civil Work', rate: 300, unit: 'sqft' },
      { item: 'Electrical Installation', rate: 180, unit: 'sqft' },
      { item: 'Furniture Supply', rate: 500, unit: 'sqft' },
      { item: 'HVAC System', rate: 250, unit: 'sqft' },
      { item: 'Fire Safety Systems', rate: 150, unit: 'sqft' },
      { item: 'Project Management', rate: 80000, unit: 'lumpsum' },
    ],
  },
  'Turnkey Solution': {
    baseRate: 2200,
    items: [
      { item: 'Complete Design Package', rate: 150000, unit: 'lumpsum' },
      { item: 'Civil & Structural Work', rate: 400, unit: 'sqft' },
      { item: 'MEP Services', rate: 350, unit: 'sqft' },
      { item: 'Interior Fit-out', rate: 600, unit: 'sqft' },
      { item: 'Furniture & Equipment', rate: 500, unit: 'sqft' },
      { item: 'Project Supervision', rate: 120000, unit: 'lumpsum' },
    ],
  },
};

export default async function handler(req: Request, res: Response) {
  try {
    const {
      clientName,
      company,
      email,
      phone,
      projectType,
      projectDescription,
      area, // in sqft
      dealId,
      leadId,
    } = req.body;

    if (!clientName || !projectType || !area) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['clientName', 'projectType', 'area']
      });
    }

    // Get pricing template
    const template = PRICING_TEMPLATES[projectType as keyof typeof PRICING_TEMPLATES] || PRICING_TEMPLATES['Residential Interior'];

    // Generate line items based on area
    const lineItems = template.items.map(item => {
      let quantity = 1;
      let amount = item.rate;

      if (item.unit === 'sqft') {
        quantity = parseFloat(area);
        amount = item.rate * quantity;
      } else if (item.unit === 'unit') {
        quantity = Math.ceil(parseFloat(area) / 100); // 1 unit per 100 sqft
        amount = item.rate * quantity;
      } else if (item.unit === 'room') {
        quantity = Math.ceil(parseFloat(area) / 200); // 1 room per 200 sqft
        amount = item.rate * quantity;
      }

      return {
        item: item.item,
        description: `${item.item} for ${projectType}`,
        quantity,
        unit: item.unit,
        rate: item.rate,
        amount: Math.round(amount),
      };
    });

    // Calculate totals
    const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
    const gstRate = 18.0;
    const gstAmount = (subtotal * gstRate) / 100;
    const total = subtotal + gstAmount;

    // Generate quote ID
    const quoteId = `QT_${new Date().getFullYear()}_${String(Date.now()).slice(-6)}`;

    // Valid for 30 days
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    // Payment terms
    const paymentTerms = `Payment Terms:
1. 30% advance on order confirmation
2. 40% on 50% work completion
3. 20% on 90% work completion
4. 10% on final handover

Note: All payments subject to 18% GST as applicable.`;

    // Create quote
    await db.insert(quotes).values({
      quoteId,
      dealId: dealId || null,
      leadId: leadId || null,
      clientName,
      company: company || 'Individual',
      email: email || '',
      phone: phone || '',
      projectType,
      projectDescription: projectDescription || `${projectType} project for ${area} sqft area`,
      subtotal: subtotal.toFixed(2),
      gstRate: gstRate.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      total: total.toFixed(2),
      lineItems: JSON.stringify(lineItems),
      validUntil,
      paymentTerms,
      notes: `This quote is valid for 30 days from the date of issue. All work will be completed as per agreed timeline and specifications.`,
      status: 'draft',
      createdBy: 'System',
    });

    // If dealId provided, create activity
    if (dealId) {
      const activityId = `ACT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await db.insert(salesActivities).values({
        activityId,
        dealId,
        leadId: leadId || null,
        type: 'quote-sent',
        title: 'Quote Generated',
        description: `Quote ${quoteId} generated for ₹${total.toFixed(0)} (${area} sqft ${projectType})`,
        outcome: 'positive',
        performedBy: 'System',
      });
    }

    console.log(`[Sales] Quote generated: ${quoteId} - ₹${total.toFixed(0)} for ${clientName}`);

    res.status(201).json({
      success: true,
      quoteId,
      clientName,
      projectType,
      area,
      subtotal,
      gstAmount,
      total,
      lineItems,
      validUntil: validUntil.toISOString().split('T')[0],
      message: 'Quote generated successfully',
    });
  } catch (error) {
    console.error('[Sales] Generate quote error:', error);
    res.status(500).json({
      error: 'Failed to generate quote',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
