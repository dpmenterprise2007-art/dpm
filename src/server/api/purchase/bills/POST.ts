import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { purchaseBills, purchaseBillItems } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { bill, items } = req.body;

    if (!bill || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Bill and items are required',
      });
    }

    // Generate bill number
    const billNumber = `BILL-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

    // Create bill
    const result = await db.insert(purchaseBills).values({
      billNumber,
      ...bill,
    });

    const billId = Number(result[0].insertId);

    // Create bill items
    const itemsWithBillId = items.map((item: any) => ({
      ...item,
      billId,
    }));

    await db.insert(purchaseBillItems).values(itemsWithBillId);

    // Fetch created bill
    const createdBill = await db
      .select()
      .from(purchaseBills)
      .where(eq(purchaseBills.id, billId))
      .limit(1);

    res.status(201).json({
      success: true,
      message: 'Purchase bill created successfully',
      data: createdBill[0],
    });
  } catch (error) {
    console.error('[API] Error creating purchase bill:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create purchase bill',
      message: String(error),
    });
  }
}
