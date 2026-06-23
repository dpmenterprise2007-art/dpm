/**
 * Save Automation Configuration
 */
import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  try {
    const config = req.body;

    // Validate config
    if (!config) {
      return res.status(400).json({ error: 'Configuration is required' });
    }

    // In production, save to database
    // For now, just acknowledge
    console.log('[Automation Config] Saved:', JSON.stringify(config, null, 2));

    res.json({ success: true, message: 'Configuration saved successfully' });
  } catch (error) {
    console.error('[Automation Config] Save error:', error);
    res.status(500).json({
      error: 'Failed to save configuration',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
