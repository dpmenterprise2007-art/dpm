/**
 * Update Expense API
 */
import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { expenses } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { expenseId } = req.params;
    if (!expenseId) return res.status(400).json({ error: 'expenseId required' });

    const { category, description, amount, gstRate = 18, paymentMode, paymentDate, vendor, invoiceNumber } = req.body;

    const baseAmount = parseFloat(amount);
    const gstAmount = (baseAmount * Number(gstRate)) / 100;
    const totalAmount = baseAmount + gstAmount;

    await db.update(expenses).set({
      category,
      description,
      amount: baseAmount.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      paymentMode,
      paymentDate: paymentDate ? new Date(paymentDate) : undefined,
      vendor: vendor || null,
      invoiceNumber: invoiceNumber || null,
    }).where(eq(expenses.expenseId, expenseId));

    console.log(`[Finance] Updated expense: ${expenseId}`);
    res.json({ success: true, expenseId, totalAmount, message: 'Expense updated' });
  } catch (error) {
    console.error('[Finance] Update error:', error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
}
