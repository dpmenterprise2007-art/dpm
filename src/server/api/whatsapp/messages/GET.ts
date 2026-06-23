/**
 * WhatsApp Messages History
 * GET /api/whatsapp/messages?limit=50&type=incoming
 */
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { whatsappMessages } from '../../../db/schema.js';
import { desc, eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
    const type = req.query.type as string | undefined;

    let rows;
    if (type) {
      rows = await db
        .select()
        .from(whatsappMessages)
        .where(eq(whatsappMessages.type, type))
        .orderBy(desc(whatsappMessages.sentAt))
        .limit(limit);
    } else {
      rows = await db
        .select()
        .from(whatsappMessages)
        .orderBy(desc(whatsappMessages.sentAt))
        .limit(limit);
    }

    res.json({ success: true, messages: rows, total: rows.length });
  } catch (error) {
    console.error('[WhatsApp] Messages fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch messages', message: String(error) });
  }
}
