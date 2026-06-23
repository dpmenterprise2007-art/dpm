/**
 * Lead Backup API
 * Creates JSON backup of all leads
 */

import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';
import fs from 'fs';
import path from 'path';

export default async function handler(req: Request, res: Response) {
  try {
    // Fetch all leads
    const allLeads = await db.select().from(leads);
    
    // Create backups directory
    const backupDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Create backup file with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `leads-backup-${timestamp}.json`);
    
    // Write backup
    fs.writeFileSync(backupFile, JSON.stringify({
      timestamp: new Date().toISOString(),
      totalLeads: allLeads.length,
      leads: allLeads
    }, null, 2));
    
    console.log(`[Backup] Created: ${backupFile} (${allLeads.length} leads)`);
    
    res.json({
      success: true,
      backupFile: path.basename(backupFile),
      totalLeads: allLeads.length,
      timestamp: new Date().toISOString(),
      message: `Backup created successfully with ${allLeads.length} leads`
    });
  } catch (error) {
    console.error('[Backup] Error:', error);
    res.status(500).json({ error: 'Backup failed', details: String(error) });
  }
}
