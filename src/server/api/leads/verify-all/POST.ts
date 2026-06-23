/**
 * Verify All Leads API
 * Bulk verification and auto-fix
 */

import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

function validateAndFormatPhone(phone: string): { valid: boolean; formatted: string } {
  if (!phone) return { valid: false, formatted: '' };
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return { valid: true, formatted: `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}` };
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return { valid: true, formatted: `+91 ${cleaned.substring(2, 7)} ${cleaned.substring(7)}` };
  }
  
  return { valid: false, formatted: phone };
}

function validateEmail(email: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: Request, res: Response) {
  try {
    const { autoFix } = req.body;
    
    console.log('[Leads] Starting bulk verification...');
    
    const allLeads = await db.select().from(leads);
    
    let validCount = 0;
    let invalidPhoneCount = 0;
    let invalidEmailCount = 0;
    let fixedCount = 0;
    
    for (const lead of allLeads) {
      const phoneValidation = validateAndFormatPhone(lead.phone || '');
      const emailValid = validateEmail(lead.email || '');
      
      const isValid = phoneValidation.valid && emailValid;
      
      if (isValid) {
        validCount++;
      } else {
        if (!phoneValidation.valid) invalidPhoneCount++;
        if (!emailValid) invalidEmailCount++;
      }
      
      if (autoFix && phoneValidation.valid) {
        await db
          .update(leads)
          .set({
            phone: phoneValidation.formatted,
          })
          .where(eq(leads.leadId, lead.leadId));
        
        fixedCount++;
      }
    }
    
    console.log(`[Leads] Verification complete: ${validCount} valid`);
    
    res.json({
      success: true,
      total: allLeads.length,
      valid: validCount,
      invalidPhone: invalidPhoneCount,
      invalidEmail: invalidEmailCount,
      fixed: autoFix ? fixedCount : 0,
      message: autoFix 
        ? `Verified ${allLeads.length} leads, fixed ${fixedCount}`
        : `Verified ${allLeads.length} leads, ${validCount} valid`
    });
  } catch (error) {
    console.error('[Leads] Bulk verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
}
