/**
 * Create Expense API
 * Add new expense entry with GST calculation
 */

import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { expenses } from '../../../db/schema.js';

export default async function handler(req: Request, res: Response) {
  try {
    const {
      category,
      description,
      amount,
      gstRate = 18,
      paymentMode,
      paymentDate,
      vendor,
      invoiceNumber,
      projectId,
    } = req.body;

    // Validation
    if (!category || !description || !amount || !paymentMode || !paymentDate) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['category', 'description', 'amount', 'paymentMode', 'paymentDate']
      });
    }

    // Calculate GST
    const baseAmount = parseFloat(amount);
    const gstAmount = (baseAmount * gstRate) / 100;
    const totalAmount = baseAmount + gstAmount;

    // Generate expense ID
    const expenseId = `EXP_${new Date().getFullYear()}_${String(Date.now()).slice(-6)}`;

    // Insert expense
    await db.insert(expenses).values({
      expenseId,
      category,
      description,
      amount: baseAmount.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      paymentMode,
      paymentDate: new Date(paymentDate),
      vendor: vendor || null,
      invoiceNumber: invoiceNumber || null,
      projectId: projectId || null,
      status: 'paid',
    });

    console.log(`[Finance] Expense created: ${expenseId} - ₹${totalAmount.toFixed(2)}`);

    res.status(201).json({
      success: true,
      expenseId,
      amount: baseAmount,
      gstAmount,
      totalAmount,
      message: 'Expense created successfully',
    });
  } catch (error) {
    console.error('[Finance] Create expense error:', error);
    res.status(500).json({
      error: 'Failed to create expense',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
