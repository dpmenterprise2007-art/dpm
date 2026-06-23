/**
 * BOQ Generator API
 * Auto-generate Bill of Quantities with pricing
 */

import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { boq } from '../../../../db/schema.js';

// BOQ Templates for different project types
const BOQ_TEMPLATES = {
  'Office Furniture': [
    { item: 'Executive Table', unit: 'nos', rate: 25000 },
    { item: 'Executive Chair', unit: 'nos', rate: 15000 },
    { item: 'Visitor Chair', unit: 'nos', rate: 5000 },
    { item: 'Filing Cabinet', unit: 'nos', rate: 12000 },
    { item: 'Conference Table', unit: 'nos', rate: 80000 },
    { item: 'Conference Chair', unit: 'nos', rate: 8000 },
    { item: 'Workstation (4-seater)', unit: 'nos', rate: 60000 },
    { item: 'Storage Cabinet', unit: 'nos', rate: 15000 },
  ],
  'Interior Work': [
    { item: 'False Ceiling', unit: 'sqft', rate: 180 },
    { item: 'Wall Painting', unit: 'sqft', rate: 45 },
    { item: 'Flooring (Vitrified Tiles)', unit: 'sqft', rate: 250 },
    { item: 'Electrical Work', unit: 'sqft', rate: 120 },
    { item: 'Plumbing Work', unit: 'sqft', rate: 80 },
    { item: 'Partition Work', unit: 'sqft', rate: 200 },
    { item: 'Door & Window', unit: 'nos', rate: 15000 },
  ],
  'Civil Work': [
    { item: 'Excavation', unit: 'cum', rate: 350 },
    { item: 'Concrete (M20)', unit: 'cum', rate: 5500 },
    { item: 'Brickwork', unit: 'cum', rate: 4200 },
    { item: 'Plastering', unit: 'sqm', rate: 180 },
    { item: 'Steel Reinforcement', unit: 'kg', rate: 65 },
    { item: 'Waterproofing', unit: 'sqm', rate: 250 },
  ],
  'Modular Kitchen': [
    { item: 'Base Cabinet', unit: 'rft', rate: 8000 },
    { item: 'Wall Cabinet', unit: 'rft', rate: 6500 },
    { item: 'Tall Unit', unit: 'rft', rate: 12000 },
    { item: 'Countertop (Granite)', unit: 'sqft', rate: 450 },
    { item: 'Sink & Faucet', unit: 'set', rate: 15000 },
    { item: 'Chimney', unit: 'nos', rate: 25000 },
    { item: 'Hob (4 Burner)', unit: 'nos', rate: 18000 },
    { item: 'Accessories & Fittings', unit: 'lot', rate: 25000 },
  ],
};

export default async function handler(req: Request, res: Response) {
  try {
    const {
      tenderId,
      bidId,
      title,
      projectType,
      items: customItems,
      specifications,
      deliveryTimeline,
      warrantyPeriod,
    } = req.body;

    if (!title || !projectType) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['title', 'projectType']
      });
    }

    // Get template or use custom items
    let boqItems = customItems;
    
    if (!boqItems && BOQ_TEMPLATES[projectType as keyof typeof BOQ_TEMPLATES]) {
      // Use template and ask for quantities
      const template = BOQ_TEMPLATES[projectType as keyof typeof BOQ_TEMPLATES];
      boqItems = template.map(item => ({
        ...item,
        description: `${item.item} as per specifications`,
        quantity: 0, // To be filled by user
        amount: 0,
      }));
    }

    if (!boqItems || boqItems.length === 0) {
      return res.status(400).json({ 
        error: 'No BOQ items provided and no template available for this project type'
      });
    }

    // Calculate amounts
    const calculatedItems = boqItems.map((item: any) => {
      const quantity = parseFloat(item.quantity || 0);
      const rate = parseFloat(item.rate || 0);
      const amount = quantity * rate;
      
      return {
        item: item.item,
        description: item.description || `${item.item} as per specifications`,
        unit: item.unit,
        quantity,
        rate,
        amount: Math.round(amount),
      };
    });

    // Calculate totals
    const subtotal = calculatedItems.reduce((sum: number, item: any) => sum + item.amount, 0);
    const gst = (subtotal * 18) / 100;
    const total = subtotal + gst;

    // Generate BOQ ID
    const boqId = `BOQ_${new Date().getFullYear()}_${String(Date.now()).slice(-6)}`;

    // Create BOQ
    await db.insert(boq).values({
      boqId,
      tenderId: tenderId || null,
      bidId: bidId || null,
      title,
      projectType,
      items: JSON.stringify(calculatedItems),
      subtotal: subtotal.toFixed(2),
      gst: gst.toFixed(2),
      total: total.toFixed(2),
      specifications: specifications || 'As per tender requirements',
      deliveryTimeline: deliveryTimeline || '30-45 days',
      warrantyPeriod: warrantyPeriod || '1 year',
      status: 'draft',
      createdBy: 'System',
    });

    console.log(`[GeM] BOQ generated: ${boqId} - ₹${total.toFixed(0)} (${calculatedItems.length} items)`);

    res.status(201).json({
      success: true,
      boqId,
      title,
      projectType,
      items: calculatedItems,
      subtotal,
      gst,
      total,
      message: 'BOQ generated successfully',
    });
  } catch (error) {
    console.error('[GeM] BOQ generation error:', error);
    res.status(500).json({
      error: 'Failed to generate BOQ',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
