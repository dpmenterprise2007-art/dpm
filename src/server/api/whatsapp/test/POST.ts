/**
 * WhatsApp Connection Test
 * POST /api/whatsapp/test
 */
import type { Request, Response } from 'express';
import { getSecret } from '#airo/secrets';

export default async function handler(req: Request, res: Response) {
  try {
    const token = getSecret('WHATSAPP_TOKEN');
    const phoneNumberId = getSecret('WHATSAPP_PHONE_NUMBER_ID');

    if (!token || !phoneNumberId) {
      return res.status(503).json({
        success: false,
        error: 'Secrets not configured',
        message: 'Add WHATSAPP_TOKEN and WHATSAPP_PHONE_NUMBER_ID in Settings → Secrets',
      });
    }

    // Verify token by fetching phone number details from Meta
    const metaRes = await fetch(
      `https://graph.facebook.com/v19.0/${phoneNumberId}?fields=display_phone_number,verified_name,quality_rating`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await metaRes.json() as {
      display_phone_number?: string;
      verified_name?: string;
      quality_rating?: string;
      error?: { message: string; code: number };
    };

    if (!metaRes.ok || data.error) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
        details: data.error,
      });
    }

    res.json({
      success: true,
      phoneNumber: data.display_phone_number,
      businessName: data.verified_name,
      qualityRating: data.quality_rating,
      message: `✅ Connected to ${data.verified_name} (${data.display_phone_number})`,
    });
  } catch (error) {
    console.error('[WhatsApp] Test error:', error);
    res.status(500).json({ success: false, error: 'Connection test failed', message: String(error) });
  }
}
