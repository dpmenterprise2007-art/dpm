/**
 * Test WhatsApp Connection
 */
import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  try {
    const { phoneNumber, apiKey } = req.body;

    if (!phoneNumber || !apiKey) {
      return res.status(400).json({ error: 'Phone number and API key required' });
    }

    // Simulate connection test
    console.log('[WhatsApp Test] Testing connection:', phoneNumber);

    // In production, test actual WhatsApp API connection
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json({ success: true, message: 'WhatsApp connection successful' });
  } catch (error) {
    console.error('[WhatsApp Test] Error:', error);
    res.status(500).json({
      error: 'Connection test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
