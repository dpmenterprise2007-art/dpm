/**
 * Bid Submission API
 * Submit bid to GeM tender with documents
 */

import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { gemBids, gemTenders, boq, gemNotifications } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const {
      tenderId,
      boqId,
      bidAmount,
      technicalBid,
      financialBid,
      documents,
      preparedBy,
      approvedBy,
      notes,
    } = req.body;

    if (!tenderId || !bidAmount) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['tenderId', 'bidAmount']
      });
    }

    // Verify tender exists and is active
    const [tender] = await db
      .select()
      .from(gemTenders)
      .where(eq(gemTenders.tenderId, tenderId))
      .limit(1);

    if (!tender) {
      return res.status(404).json({ error: 'Tender not found' });
    }

    if (tender.status !== 'active') {
      return res.status(400).json({ error: 'Tender is not active' });
    }

    // Check deadline
    const deadline = new Date(tender.bidSubmissionDeadline);
    if (deadline < new Date()) {
      return res.status(400).json({ error: 'Bid submission deadline has passed' });
    }

    // Verify BOQ if provided
    if (boqId) {
      const [boqRecord] = await db
        .select()
        .from(boq)
        .where(eq(boq.boqId, boqId))
        .limit(1);

      if (!boqRecord) {
        return res.status(404).json({ error: 'BOQ not found' });
      }
    }

    // Generate bid ID
    const bidId = `BID_${new Date().getFullYear()}_${String(Date.now()).slice(-6)}`;

    // Create bid
    await db.insert(gemBids).values({
      bidId,
      tenderId,
      boqId: boqId || null,
      bidAmount: parseFloat(bidAmount).toFixed(2),
      technicalBid: technicalBid ? JSON.stringify(technicalBid) : null,
      financialBid: financialBid ? JSON.stringify(financialBid) : null,
      documents: documents ? JSON.stringify(documents) : null,
      status: 'submitted',
      submittedDate: new Date(),
      preparedBy: preparedBy || 'Dharmendra Prajapati',
      approvedBy: approvedBy || 'Dharmendra Prajapati',
      notes: notes || '',
    });

    // Create notification
    const notificationId = `NOTIF_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await db.insert(gemNotifications).values({
      notificationId,
      type: 'bid-status',
      title: 'Bid Submitted Successfully',
      message: `Bid ${bidId} submitted for tender ${tender.title}. Amount: ₹${parseFloat(bidAmount).toFixed(0)}`,
      tenderId,
      bidId,
      channel: 'email',
      recipient: 'admin@dpmenterprise.in',
      status: 'pending',
      priority: 'high',
    });

    console.log(`[GeM] Bid submitted: ${bidId} - ₹${parseFloat(bidAmount).toFixed(0)} for ${tender.title}`);

    res.status(201).json({
      success: true,
      bidId,
      tenderId,
      tenderTitle: tender.title,
      bidAmount: parseFloat(bidAmount),
      status: 'submitted',
      submittedDate: new Date().toISOString(),
      message: 'Bid submitted successfully',
    });
  } catch (error) {
    console.error('[GeM] Bid submission error:', error);
    res.status(500).json({
      error: 'Failed to submit bid',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
