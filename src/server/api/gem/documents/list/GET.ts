/**
 * GeM Documents Listing API
 * Fetch all uploaded documents
 */

import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { gemDocuments } from '../../../../db/schema.js';
import { eq, desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { status = 'active', documentType } = req.query;

    // Build query
    let query = db.select().from(gemDocuments);

    if (status) {
      query = query.where(eq(gemDocuments.status, status as string)) as any;
    }

    const documents = await query.orderBy(desc(gemDocuments.createdAt));

    // Filter by document type if provided
    const filteredDocs = documentType
      ? documents.filter((doc) => doc.documentType === documentType)
      : documents;

    console.log(`[GeM] Fetched ${filteredDocs.length} documents`);

    res.json({
      success: true,
      documents: filteredDocs,
      total: filteredDocs.length,
    });
  } catch (error) {
    console.error('[GeM] Document list error:', error);
    res.status(500).json({
      error: 'Failed to fetch documents',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
