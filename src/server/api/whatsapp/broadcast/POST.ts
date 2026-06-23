/**
 * WhatsApp Broadcast API
 * POST /api/whatsapp/broadcast
 * Send a message to multiple leads at once
 */
import type { Request, Response } from 'express';
import { getSecret } from '#airo/secrets';
import { db } from '../../../db/client.js';
import { whatsappMessages, leads } from '../../../db/schema.js';
import { desc as _desc } from 'drizzle-orm';

interface BroadcastBody {
  message: string;
  phones?: string[];          // Explicit list of phone numbers
  filter?: {
    status?: string;          // 'hot' | 'warm' | 'cold'
    source?: string;
    limit?: number;
  };
}

export default async function handler(req: Request, res: Response) {
  try {
    const { message, phones, filter }: BroadcastBody = req.body;

    if (!message) return res.status(400).json({ error: 'message is required' });

    const token = getSecret('WHATSAPP_TOKEN');
    const phoneNumberId = getSecret('WHATSAPP_PHONE_NUMBER_ID');

    if (!token || !phoneNumberId) {
      return res.status(503).json({
        error: 'WhatsApp API not configured',
        message: 'Add WHATSAPP_TOKEN and WHATSAPP_PHONE_NUMBER_ID secrets',
      });
    }

    // Resolve recipients
    let recipients: { phone: string; name: string }[] = [];

    if (phones && phones.length > 0) {
      recipients = phones.map(p => ({ phone: p.replace(/[^0-9]/g, ''), name: 'Lead' }));
    } else {
      // Fetch from leads DB
      let query = db.select({ phone: leads.phone, name: leads.name }).from(leads);
      const rows = await query;
      recipients = rows
        .filter(r => r.phone && r.phone.length >= 10)
        .map(r => ({ phone: r.phone!.replace(/[^0-9]/g, ''), name: r.name }))
        .slice(0, filter?.limit || 50);
    }

    if (recipients.length === 0) {
      return res.status(400).json({ error: 'No valid recipients found' });
    }

    const metaUrl = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;
    const results: { phone: string; name: string; success: boolean; error?: string }[] = [];

    // Send with 200ms delay between messages to avoid rate limits
    for (const recipient of recipients) {
      try {
        const metaRes = await fetch(metaUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: recipient.phone,
            type: 'text',
            text: { preview_url: false, body: message },
          }),
        });

        const metaData = await metaRes.json() as { messages?: { id: string }[]; error?: { message: string } };

        if (metaRes.ok && !metaData.error) {
          results.push({ phone: recipient.phone, name: recipient.name, success: true });

          // Log to DB
          const msgId = `WA_BC_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
          await db.insert(whatsappMessages).values({
            messageId: msgId,
            phone: recipient.phone,
            name: recipient.name,
            message,
            reply: null,
            type: 'broadcast',
            status: 'sent',
            aiGenerated: false,
            sentAt: new Date(),
          });
        } else {
          results.push({ phone: recipient.phone, name: recipient.name, success: false, error: metaData.error?.message });
        }
      } catch (err) {
        results.push({ phone: recipient.phone, name: recipient.name, success: false, error: String(err) });
      }

      // Rate limit delay
      await new Promise(r => setTimeout(r, 200));
    }

    const sent = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`[WhatsApp] Broadcast complete: ${sent} sent, ${failed} failed`);

    res.json({
      success: true,
      total: recipients.length,
      sent,
      failed,
      results,
    });
  } catch (error) {
    console.error('[WhatsApp] Broadcast error:', error);
    res.status(500).json({ error: 'Broadcast failed', message: String(error) });
  }
}
