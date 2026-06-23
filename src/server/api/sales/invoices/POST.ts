import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { salesInvoices, salesInvoiceItems } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { invoice, items } = req.body;

    if (!invoice || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invoice and items are required',
      });
    }

    // Generate invoice number
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

    // Create invoice
    const result = await db.insert(salesInvoices).values({
      invoiceNumber,
      ...invoice,
    });

    const invoiceId = Number(result[0].insertId);

    // Create invoice items
    const itemsWithInvoiceId = items.map((item: any) => ({
      ...item,
      invoiceId,
    }));

    await db.insert(salesInvoiceItems).values(itemsWithInvoiceId);

    // Fetch created invoice
    const createdInvoice = await db
      .select()
      .from(salesInvoices)
      .where(eq(salesInvoices.id, invoiceId))
      .limit(1);

    res.status(201).json({
      success: true,
      message: 'Sales invoice created successfully',
      data: createdInvoice[0],
    });
  } catch (error) {
    console.error('[API] Error creating sales invoice:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create sales invoice',
      message: String(error),
    });
  }
}
