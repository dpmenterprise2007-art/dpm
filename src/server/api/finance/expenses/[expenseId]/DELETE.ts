/**
 * Delete Expense API
 */
import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { expenses } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { expenseId } = req.params;
    if (!expenseId) return res.status(400).json({ error: 'expenseId required' });

    await db.delete(expenses).where(eq(expenses.expenseId, expenseId));
    console.log(`[Finance] Deleted expense: ${expenseId}`);
    res.json({ success: true, message: `Expense ${expenseId} deleted` });
  } catch (error) {
    console.error('[Finance] Delete error:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
}
