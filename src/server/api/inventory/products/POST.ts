import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { products } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const productData = req.body;

    if (!productData.productName || !productData.category) {
      return res.status(400).json({
        success: false,
        error: 'Product name and category are required',
      });
    }

    // Generate product code
    const productCode = `PROD-${String(Date.now()).slice(-6)}`;

    // Create product
    const result = await db.insert(products).values({
      productCode,
      ...productData,
    });

    const productId = Number(result[0].insertId);

    // Fetch created product
    const createdProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: createdProduct[0],
    });
  } catch (error) {
    console.error('[API] Error creating product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create product',
      message: String(error),
    });
  }
}
