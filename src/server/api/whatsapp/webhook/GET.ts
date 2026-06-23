/**
 * WhatsApp Webhook Verification
 * GET /api/whatsapp/webhook
 * Meta calls this to verify the webhook endpoint
 */
import type { Request, Response } from 'express';
import { getSecret } from '#airo/secrets';

export default async function handler(req: Request, res: Response) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const verifyToken = getSecret('WHATSAPP_WEBHOOK_VERIFY_TOKEN');

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[WhatsApp] Webhook verified successfully');
    return res.status(200).send(challenge);
  }

  console.warn('[WhatsApp] Webhook verification failed — token mismatch');
  res.status(403).json({ error: 'Verification failed' });
}
