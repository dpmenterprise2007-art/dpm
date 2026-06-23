import type { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import * as pdfParse from 'pdf-parse';

// Polyfill DOMMatrix for pdf.js in Node.js environment
if (typeof globalThis.DOMMatrix === 'undefined') {
  // @ts-ignore
  globalThis.DOMMatrix = class DOMMatrix {
    constructor() {
      return [1, 0, 0, 1, 0, 0];
    }
  };
}
import { db } from '../../../../db/client.js';
import { gemTenders } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = '/private/tenders';
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error as Error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'tender-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
}).single('tenderPdf');

export default async function handler(req: Request, res: Response) {
  // Handle file upload
  upload(req, res, async (err) => {
    if (err) {
      console.error('[API] Upload error:', err);
      return res.status(400).json({
        success: false,
        error: 'File upload failed',
        message: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded',
        message: 'Please upload a PDF file',
      });
    }

    try {
      const filePath = req.file.path;
      const fileName = req.file.filename;

      // Extract text from PDF
      console.log('[API] Extracting text from PDF:', fileName);
      const dataBuffer = await fs.readFile(filePath);
      const pdfData = await (pdfParse as any)(dataBuffer);
      const extractedText = pdfData.text;

      console.log('[API] Extracted text length:', extractedText.length, 'characters');

      // Get additional data from request body
      const { tenderNumber, category } = req.body;

      // Generate tender number if not provided
      const finalTenderNumber =
        tenderNumber || `GEM-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

      // Create tender record
      const result = await db.insert(gemTenders).values({
        tenderId: finalTenderNumber,
        title: 'Pending Analysis', // Will be updated by AI
        description: extractedText.substring(0, 1000), // First 1000 chars
        category: category || 'General',
        organization: 'Pending Analysis',
        department: 'Pending Analysis',
        location: 'Pending Analysis',
        publishDate: new Date(),
        bidSubmissionDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        gemUrl: filePath,
        status: 'active',
      });

      const tenderId = Number(result[0].insertId);

      // Fetch created tender
      const createdTender = await db
        .select()
        .from(gemTenders)
        .where(eq(gemTenders.id, tenderId))
        .limit(1);

      console.log('[API] Tender created successfully:', tenderId);

      res.status(201).json({
        success: true,
        message: 'Tender PDF uploaded and text extracted successfully',
        data: {
          tenderId: createdTender[0].id,
          tenderNumber: createdTender[0].tenderId,
          fileName: fileName,
          filePath: filePath,
          extractedTextLength: extractedText.length,
          extractedTextPreview: extractedText.substring(0, 500) + '...', // First 500 chars
          status: createdTender[0].status,
        },
      });
    } catch (error) {
      console.error('[API] Error processing tender PDF:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process tender PDF',
        message: String(error),
      });
    }
  });
}
