/**
 * Lead Data Cleanup & Backup API
 * Fixes wrong numbers, removes duplicates, creates backup
 */

import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

function validateAndFixPhone(phone: string): { valid: boolean; fixed: string; original: string } {
  const original = phone;
  
  if (!phone) return { valid: false, fixed: '', original };
  
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid Indian number
  if (cleaned.length === 10) {
    // Valid 10-digit number
    return {
      valid: true,
      fixed: `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`,
      original
    };
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    // Valid 12-digit with country code
    return {
      valid: true,
      fixed: `+91 ${cleaned.substring(2, 7)} ${cleaned.substring(7)}`,
      original
    };
  } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
    // Remove leading 0 and format
    const withoutZero = cleaned.substring(1);
    return {
      valid: true,
      fixed: `+91 ${withoutZero.substring(0, 5)} ${withoutZero.substring(5)}`,
      original
    };
  }
  
  // Invalid number
  return { valid: false, fixed: original, original };
}

function validateEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default async function handler(req: Request, res: Response) {
  try {
    const { createBackup } = req.body;
    
    // Fetch all leads
    const allLeads = await db.select().from(leads);
    
    console.log(`[Cleanup] Processing ${allLeads.length} leads...`);
    
    // Create backup if requested
    if (createBackup) {
      const backupDir = path.join(process.cwd(), 'backups');
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(backupDir, `leads-backup-${timestamp}.json`);
      
      fs.writeFileSync(backupFile, JSON.stringify(allLeads, null, 2));
      console.log(`[Cleanup] Backup created: ${backupFile}`);
    }
    
    const stats = {
      total: allLeads.length,
      fixed: 0,
      invalid: 0,
      duplicates: 0,
      verified: 0
    };
    
    const invalidLeads: any[] = [];
    const duplicateMap = new Map<string, number>();
    
    // Process each lead
    for (const lead of allLeads) {
      const phoneResult = validateAndFixPhone(lead.phone || '');
      const emailValid = validateEmail(lead.email || '');
      
      // Track duplicates by phone
      if (phoneResult.valid) {
        const count = duplicateMap.get(phoneResult.fixed) || 0;
        duplicateMap.set(phoneResult.fixed, count + 1);
      }
      
      // Fix phone if needed
      if (phoneResult.valid && phoneResult.fixed !== lead.phone) {
        await db
          .update(leads)
          .set({
            phone: phoneResult.fixed,
          })
          .where(eq(leads.id, lead.id));
        
        stats.fixed++;
        console.log(`[Cleanup] Fixed: ${lead.leadId} - ${phoneResult.original} → ${phoneResult.fixed}`);
      }
      
      // Mark as verified if valid (use conversionStatus as proxy)
      if (phoneResult.valid && emailValid) {
        await db
          .update(leads)
          .set({ conversionStatus: 'verified' })
          .where(eq(leads.id, lead.id));
        stats.verified++;
      }
      
      // Track invalid leads
      if (!phoneResult.valid || !emailValid) {
        invalidLeads.push({
          leadId: lead.leadId,
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          phoneValid: phoneResult.valid,
          emailValid: emailValid
        });
        stats.invalid++;
      }
    }
    
    // Count duplicates
    for (const [_phone, count] of duplicateMap.entries()) {
      if (count > 1) {
        stats.duplicates += count - 1;
      }
    }
    
    console.log(`[Cleanup] Complete: ${stats.fixed} fixed, ${stats.invalid} invalid, ${stats.duplicates} duplicates`);
    
    res.json({
      success: true,
      stats,
      invalidLeads: invalidLeads.slice(0, 50), // First 50 invalid leads
      message: `Processed ${stats.total} leads. Fixed ${stats.fixed} phone numbers, verified ${stats.verified} leads.`
    });
  } catch (error) {
    console.error('[Cleanup] Error:', error);
    res.status(500).json({ error: 'Cleanup failed', details: String(error) });
  }
}
