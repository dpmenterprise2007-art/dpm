/**
 * GeM Document Upload API
 * Upload certificates and documents
 */

import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { gemDocuments } from '../../../../db/schema.js';

export default async function handler(req: Request, res: Response) {
  try {
    const {
      documentType,
      documentName,
      documentNumber,
      fileName,
      filePath,
      fileSize,
      fileType,
      issueDate,
      expiryDate,
      uploadedBy,
    } = req.body;

    if (!documentType || !documentName || !fileName || !filePath) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['documentType', 'documentName', 'fileName', 'filePath'],
      });
    }

    // Generate document ID
    const documentId = `DOC_${new Date().getFullYear()}_${String(Date.now()).slice(-6)}`;

    // Check if expired
    const isExpired = expiryDate && new Date(expiryDate) < new Date() ? 'yes' : 'no';

    // Create document record
    await db.insert(gemDocuments).values({
      documentId,
      documentType,
      documentName,
      documentNumber: documentNumber || null,
      fileName,
      filePath,
      fileSize: fileSize || null,
      fileType: fileType || 'pdf',
      issueDate: issueDate || null,
      expiryDate: expiryDate || null,
      isExpired,
      status: isExpired === 'yes' ? 'expired' : 'active',
      uploadedBy: uploadedBy || 'System',
    });

    console.log(`[GeM] Document uploaded: ${documentId} - ${documentName}`);

    res.status(201).json({
      success: true,
      documentId,
      documentType,
      documentName,
      status: isExpired === 'yes' ? 'expired' : 'active',
      message: 'Document uploaded successfully',
    });
  } catch (error) {
    console.error('[GeM] Document upload error:', error);
    res.status(500).json({
      error: 'Failed to upload document',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
