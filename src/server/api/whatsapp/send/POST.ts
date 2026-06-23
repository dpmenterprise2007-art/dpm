/**
 * WhatsApp Send Message API
 * POST /api/whatsapp/send
 * Sends a real WhatsApp message via Meta Cloud API
 */
import type { Request, Response } from 'express';
import { getSecret } from '#airo/secrets';
import { db } from '../../../db/client.js';
import { whatsappMessages } from '../../../db/schema.js';

interface SendMessageBody {
  to: string;       // Phone number with country code, no +  e.g. "919930998063"
  message: string;  // Plain text message
  name?: string;    // Recipient name for logging
  leadId?: string;
  type?: 'manual' | 'auto-reply' | 'broadcast' | 'follow-up';
}

export default async function handler(req: Request, res: Response) {
  try {
    const { to, message, name, type = 'manual' }: SendMessageBody = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: 'to and message are required' });
    }

    const token = getSecret('WHATSAPP_TOKEN');
    const phoneNumberId = getSecret('WHATSAPP_PHONE_NUMBER_ID');

    if (!token || !phoneNumberId) {
      return res.status(503).json({
        error: 'WhatsApp API not configured',
        message: 'WHATSAPP_TOKEN and WHATSAPP_PHONE_NUMBER_ID secrets are required',
      });
    }

    // Sanitise phone number — strip all non-digits
    const cleanPhone = to.replace(/[^0-9]/g, '');

    // Call Meta WhatsApp Cloud API
    const metaUrl = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: cleanPhone,
      type: 'text',
      text: { preview_url: false, body: message },
    };

    const metaRes = await fetch(metaUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const metaData = await metaRes.json() as {
      messages?: { id: string }[];
      error?: { message: string; code: number };
    };

    if (!metaRes.ok || metaData.error) {
      console.error('[WhatsApp] Meta API error:', metaData.error);
      return res.status(metaRes.status).json({
        error: 'Meta API error',
        details: metaData.error,
      });
    }

    const waMessageId = metaData.messages?.[0]?.id || `WA_${Date.now()}`;

    // Log to DB
    const messageId = `WA_OUT_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    await db.insert(whatsappMessages).values({
      messageId,
      phone: cleanPhone,
      name: name || 'Unknown',
      message,
      reply: null,
      type,
      status: 'sent',
      aiGenerated: false,
      sentAt: new Date(),
    });

    console.log(`[WhatsApp] Sent to ${cleanPhone} | WA ID: ${waMessageId}`);

    res.json({
      success: true,
      messageId,
      waMessageId,
      to: cleanPhone,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[WhatsApp] Send error:', error);
    res.status(500).json({ error: 'Failed to send WhatsApp message', message: String(error) });
  }
}
