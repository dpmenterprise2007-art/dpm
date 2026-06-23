/**
 * Lead Verification API
 * Verifies phone numbers and emails
 */

import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

function validatePhone(phone: string): { valid: boolean; formatted: string; error?: string } {
  if (!phone) return { valid: false, formatted: '', error: 'Phone required' };
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return {
      valid: true,
      formatted: `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`
    };
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return {
      valid: true,
      formatted: `+91 ${cleaned.substring(2, 7)} ${cleaned.substring(7)}`
    };
  }
  
  return { valid: false, formatted: phone, error: `Invalid format: ${cleaned.length} digits` };
}

function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email) return { valid: false, error: 'Email required' };
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? { valid: true } : { valid: false, error: 'Invalid email format' };
}

export default async function handler(req: Request, res: Response) {
  try {
    const { leadId, phone, email, autoFix } = req.body;
    
    if (!leadId) {
      return res.status(400).json({ error: 'leadId required' });
    }
    
    const [lead] = await db.select().from(leads).where(eq(leads.leadId, leadId)).limit(1);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    const phoneValidation = validatePhone(phone || lead.phone || '');
    const emailValidation = validateEmail(email || lead.email || '');
    
    if (autoFix && phoneValidation.valid) {
      await db
        .update(leads)
        .set({
          phone: phoneValidation.formatted,
        })
        .where(eq(leads.leadId, leadId));
      
      console.log(`[Leads] Verified: ${leadId}`);
    }
    
    res.json({
      success: true,
      leadId,
      validation: {
        phone: phoneValidation,
        email: emailValidation
      },
      verified: phoneValidation.valid && emailValidation.valid,
      updated: autoFix && phoneValidation.valid
    });
  } catch (error) {
    console.error('[Leads] Verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
}
