import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { products } from '../../../db/schema.js';
import { desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const productsList = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt))
      .limit(100);

    res.json({
      success: true,
      data: productsList,
      count: productsList.length,
    });
  } catch (error) {
    console.error('[API] Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
      message: String(error),
    });
  }
}
