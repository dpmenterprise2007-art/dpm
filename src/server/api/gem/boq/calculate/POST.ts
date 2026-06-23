import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { boq } from '../../../../db/schema.js';

// Smart Pricing Formulas
interface PricingRule {
  category: string;
  baseMargin: number; // Base margin percentage
  minMargin: number; // Minimum margin percentage
  maxMargin: number; // Maximum margin percentage
  gstRate: number; // GST rate percentage
}

const PRICING_RULES: PricingRule[] = [
  {
    category: 'Workstation',
    baseMargin: 22,
    minMargin: 18,
    maxMargin: 28,
    gstRate: 18,
  },
  {
    category: 'Chair',
    baseMargin: 25,
    minMargin: 20,
    maxMargin: 30,
    gstRate: 18,
  },
  {
    category: 'Table',
    baseMargin: 20,
    minMargin: 16,
    maxMargin: 26,
    gstRate: 18,
  },
  {
    category: 'Storage',
    baseMargin: 24,
    minMargin: 20,
    maxMargin: 28,
    gstRate: 18,
  },
  {
    category: 'Modular',
    baseMargin: 26,
    minMargin: 22,
    maxMargin: 32,
    gstRate: 18,
  },
  {
    category: 'Seating',
    baseMargin: 23,
    minMargin: 18,
    maxMargin: 28,
    gstRate: 18,
  },
  {
    category: 'Partition',
    baseMargin: 20,
    minMargin: 16,
    maxMargin: 24,
    gstRate: 18,
  },
  {
    category: 'Accessories',
    baseMargin: 28,
    minMargin: 24,
    maxMargin: 35,
    gstRate: 18,
  },
  {
    category: 'Default',
    baseMargin: 22,
    minMargin: 18,
    maxMargin: 28,
    gstRate: 18,
  },
];

// Helper function to detect item category from description
function detectCategory(description: string): string {
  const desc = description.toLowerCase();

  if (desc.includes('workstation') || desc.includes('desk') || desc.includes('cubicle')) {
    return 'Workstation';
  }
  if (desc.includes('chair') || desc.includes('seating')) {
    return 'Chair';
  }
  if (desc.includes('table') || desc.includes('conference')) {
    return 'Table';
  }
  if (desc.includes('cabinet') || desc.includes('storage') || desc.includes('locker') || desc.includes('pedestal')) {
    return 'Storage';
  }
  if (desc.includes('modular') || desc.includes('kitchen')) {
    return 'Modular';
  }
  if (desc.includes('sofa') || desc.includes('couch') || desc.includes('bench')) {
    return 'Seating';
  }
  if (desc.includes('partition') || desc.includes('panel')) {
    return 'Partition';
  }
  if (desc.includes('accessory') || desc.includes('hardware') || desc.includes('fitting')) {
    return 'Accessories';
  }

  return 'Default';
}

// Helper function to get pricing rule for category
function getPricingRule(category: string): PricingRule {
  const rule = PRICING_RULES.find((r) => r.category === category);
  return rule || PRICING_RULES[PRICING_RULES.length - 1]; // Return default if not found
}

// Helper function to calculate cost price (reverse engineering from estimated rate)
function calculateCostPrice(estimatedRate: number, margin: number): number {
  // If estimated rate includes margin, calculate cost
  // Cost = Estimated Rate / (1 + Margin%)
  return estimatedRate / (1 + margin / 100);
}

// Helper function to calculate our rate with margin
function calculateOurRate(costPrice: number, margin: number): number {
  return costPrice * (1 + margin / 100);
}

export default async function handler(req: Request, res: Response) {
  try {
    const { tenderId, boqItems, pricingStrategy } = req.body;

    if (!tenderId || !boqItems || !Array.isArray(boqItems)) {
      return res.status(400).json({
        success: false,
        error: 'Tender ID and BOQ items array are required',
      });
    }

    console.log('[API] Calculating BOQ pricing for tender:', tenderId);
    console.log('[API] Number of items:', boqItems.length);
    console.log('[API] Pricing strategy:', pricingStrategy || 'balanced');

    // Pricing strategies
    const strategies = {
      aggressive: -2, // Reduce margin by 2%
      balanced: 0, // Use base margin
      conservative: 2, // Increase margin by 2%
    };

    const marginAdjustment = strategies[pricingStrategy as keyof typeof strategies] || 0;

    // Process each BOQ item
    const calculatedItems = [];
    let totalBidAmount = 0;
    let totalGst = 0;

    for (const item of boqItems) {
      // Detect category
      const category = detectCategory(item.description);
      const pricingRule = getPricingRule(category);

      // Calculate margin (base + adjustment, within min-max range)
      let margin = pricingRule.baseMargin + marginAdjustment;
      margin = Math.max(pricingRule.minMargin, Math.min(pricingRule.maxMargin, margin));

      // Calculate cost price and our rate
      const estimatedRate = parseFloat(item.estimatedRate || '0');
      const costPrice = calculateCostPrice(estimatedRate, margin);
      const ourRate = calculateOurRate(costPrice, margin);

      // Calculate amounts
      const quantity = parseFloat(item.quantity || '0');
      const ourAmount = ourRate * quantity;
      const gstAmount = (ourAmount * pricingRule.gstRate) / 100;
      const totalAmount = ourAmount + gstAmount;

      // Add to totals
      totalBidAmount += ourAmount;
      totalGst += gstAmount;

      // Prepare calculated item
      const calculatedItem = {
        itemNumber: item.itemNumber,
        description: item.description,
        category: category,
        quantity: quantity,
        unit: item.unit,
        hsnCode: item.hsnCode || '9403',
        specifications: item.specifications || [],
        estimatedRate: estimatedRate,
        costPrice: Math.round(costPrice * 100) / 100,
        ourRate: Math.round(ourRate * 100) / 100,
        marginPercent: Math.round(margin * 100) / 100,
        ourAmount: Math.round(ourAmount * 100) / 100,
        gstRate: pricingRule.gstRate,
        gstAmount: Math.round(gstAmount * 100) / 100,
        totalAmount: Math.round(totalAmount * 100) / 100,
      };

      calculatedItems.push(calculatedItem);
    }

    const grandTotal = totalBidAmount + totalGst;

    // Store BOQ in database
    const boqId = `BOQ-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
    await db.insert(boq).values({
      boqId: boqId,
      tenderId: tenderId,
      title: `BOQ for Tender ${tenderId}`,
      projectType: pricingStrategy || 'balanced',
      items: JSON.stringify(calculatedItems),
      subtotal: totalBidAmount.toString(),
      gst: totalGst.toString(),
      total: grandTotal.toString(),
    });

    console.log('[API] BOQ calculation complete');
    console.log('[API] Total items:', calculatedItems.length);
    console.log('[API] Total bid amount:', totalBidAmount);
    console.log('[API] Total GST:', totalGst);
    console.log('[API] Grand total:', grandTotal);

    res.json({
      success: true,
      message: 'BOQ pricing calculated successfully',
      data: {
        tenderId: tenderId,
        pricingStrategy: pricingStrategy || 'balanced',
        items: calculatedItems,
        summary: {
          totalItems: calculatedItems.length,
          totalBidAmount: Math.round(totalBidAmount * 100) / 100,
          totalGst: Math.round(totalGst * 100) / 100,
          grandTotal: Math.round(grandTotal * 100) / 100,
          averageMargin:
            Math.round(
              (calculatedItems.reduce((sum, item) => sum + item.marginPercent, 0) / calculatedItems.length) * 100
            ) / 100,
        },
        calculatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[API] Error calculating BOQ:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to calculate BOQ pricing',
      message: String(error),
    });
  }
}
