/**
 * Get All Expenses API
 * Fetch expenses with filtering and pagination
 */

import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { expenses } from '../../../db/schema.js';
import { desc, eq, gte, lte, and } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { category, startDate, endDate, projectId, limit = 50 } = req.query;

    // Build query conditions
    const conditions = [];
    
    if (category) {
      conditions.push(eq(expenses.category, category as string));
    }
    
    if (startDate) {
      conditions.push(gte(expenses.paymentDate, new Date(startDate as string)));
    }
    
    if (endDate) {
      conditions.push(lte(expenses.paymentDate, new Date(endDate as string)));
    }
    
    if (projectId) {
      conditions.push(eq(expenses.projectId, projectId as string));
    }

    // Fetch expenses
    const query = conditions.length > 0
      ? db.select().from(expenses).where(and(...conditions)).orderBy(desc(expenses.createdAt)).limit(Number(limit))
      : db.select().from(expenses).orderBy(desc(expenses.createdAt)).limit(Number(limit));

    const allExpenses = await query;

    // Calculate totals
    const totalAmount = allExpenses.reduce((sum, exp) => sum + parseFloat(exp.totalAmount || '0'), 0);
    const totalGst = allExpenses.reduce((sum, exp) => sum + parseFloat(exp.gstAmount || '0'), 0);

    res.json({
      success: true,
      count: allExpenses.length,
      totalAmount,
      totalGst,
      expenses: allExpenses,
    });
  } catch (error) {
    console.error('[Finance] Get expenses error:', error);
    res.status(500).json({
      error: 'Failed to fetch expenses',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
