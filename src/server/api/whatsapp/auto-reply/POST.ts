/**
 * WhatsApp Auto-Reply API
 * Automatically generates AI-powered replies to WhatsApp messages
 */

import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { whatsappMessages, leads } from '../../../db/schema.js';

// AI Reply Templates based on message type
const REPLY_TEMPLATES = {
  greeting: [
    'Namaste! 🙏 DPM Enterprise mein aapka swagat hai. Main aapki kaise madad kar sakta hoon?',
    'Hello! Welcome to DPM Enterprise. How can I assist you with your interior design needs?',
  ],
  pricing: [
    'Hamare rates project type aur size par depend karte hain. Kya aap mujhe apne project ki details share kar sakte hain? (Location, Area, Budget)',
    'Our pricing varies based on project requirements. Could you share your project details for an accurate quote?',
  ],
  services: [
    'Hum yeh services provide karte hain:\n✓ Residential Interior\n✓ Corporate Office Design\n✓ Modular Kitchen\n✓ Furniture Manufacturing\n✓ Turnkey Solutions\n\nKaunsi service mein interested hain?',
    'We offer: Residential Interior, Corporate Design, Modular Kitchen, Furniture Manufacturing & Turnkey Solutions. Which service interests you?',
  ],
  portfolio: [
    'Aap hamare projects yahan dekh sakte hain: https://9j515avjk1.preview.c24.airoapp.ai/projects\n\nHumne 500+ projects complete kiye hain including Defense, Navy aur Government projects.',
    'View our portfolio at: https://9j515avjk1.preview.c24.airoapp.ai/projects. We have completed 500+ projects including Defense & Government contracts.',
  ],
  contact: [
    'Aap humse yahan contact kar sakte hain:\n📞 +91 99309 98063\n📧 info@dpmenterprise.in\n🏢 Navi Mumbai, Maharashtra\n\nKya aap free consultation book karna chahenge?',
    'Contact us at: +91 99309 98063 | info@dpmenterprise.in. Would you like to schedule a free consultation?',
  ],
  timeline: [
    'Project timeline size aur complexity par depend karta hai:\n• Small projects: 1-2 months\n• Medium projects: 2-4 months\n• Large projects: 4-8 months\n\nAapka project kitna bada hai?',
    'Timeline depends on project size: Small (1-2 months), Medium (2-4 months), Large (4-8 months). What is your project size?',
  ],
  default: [
    'Dhanyavaad! Ek team member aapko jaldi contact karenge. Emergency ke liye call karein: +91 99309 98063',
    'Thank you! Our team will contact you shortly. For urgent queries, call: +91 99309 98063',
  ],
};

function detectMessageType(message: string): keyof typeof REPLY_TEMPLATES {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.match(/hello|hi|hey|namaste|good morning|good evening/)) return 'greeting';
  if (lowerMsg.match(/price|cost|rate|budget|charge|kitna|paisa/)) return 'pricing';
  if (lowerMsg.match(/service|offer|provide|kya karte|what do you/)) return 'services';
  if (lowerMsg.match(/portfolio|project|work|example|dekh|show/)) return 'portfolio';
  if (lowerMsg.match(/contact|phone|email|address|location|kahan/)) return 'contact';
  if (lowerMsg.match(/time|duration|kitna time|how long|jaldi/)) return 'timeline';
  
  return 'default';
}

function generateReply(message: string): string {
  const type = detectMessageType(message);
  const templates = REPLY_TEMPLATES[type];
  
  // Use Hindi if message contains Hindi words, else English
  const useHindi = /[\u0900-\u097F]/.test(message) || 
                   message.match(/kya|hai|hain|kaise|kitna|chahiye|namaste/);
  
  return templates[useHindi ? 0 : 1];
}

export default async function handler(req: Request, res: Response) {
  try {
    const { phone, name, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ error: 'Phone and message are required' });
    }

    // Generate AI reply
    const reply = generateReply(message);

    // Save incoming message
    const messageId = `WA_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await db.insert(whatsappMessages).values({
      messageId,
      phone,
      name: name || 'Unknown',
      message,
      reply,
      type: 'auto-reply',
      status: 'sent',
      aiGenerated: true,
      sentAt: new Date(),
    });

    // Check if this is a potential lead (contains project keywords)
    const isLead = message.toLowerCase().match(
      /interior|design|furniture|kitchen|office|project|renovation|construction/
    );

    if (isLead) {
      // Create lead entry
      const leadId = `LEAD_WA_${Date.now()}`;
      
      await db.insert(leads).values({
        leadId,
        name: name || 'WhatsApp Lead',
        phone,
        email: `${phone}@whatsapp.lead`,
        company: 'WhatsApp Inquiry',
        projectType: 'General Inquiry',
        budget: '500000',
        timeline: 'To be discussed',
        location: 'To be confirmed',
        message,
        source: 'WhatsApp',
        score: 50, // Medium priority for WhatsApp leads
        status: 'warm',
        conversionStatus: 'new',
      });

      console.log(`[WhatsApp] New lead created: ${leadId}`);
    }

    res.json({
      success: true,
      messageId,
      reply,
      leadCreated: isLead,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[WhatsApp] Auto-reply error:', error);
    res.status(500).json({
      error: 'Failed to process WhatsApp message',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
