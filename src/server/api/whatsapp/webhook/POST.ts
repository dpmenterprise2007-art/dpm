/**
 * WhatsApp Webhook — Incoming Messages
 * POST /api/whatsapp/webhook
 * Meta sends all incoming messages here
 */
import type { Request, Response } from 'express';
import { getSecret } from '#airo/secrets';
import { db } from '../../../db/client.js';
import { whatsappMessages, leads } from '../../../db/schema.js';

// ── Auto-reply templates ──────────────────────────────────────────────────────

const REPLY_TEMPLATES: Record<string, [string, string]> = {
  greeting: [
    'Namaste! 🙏 DPM Enterprise mein aapka swagat hai. Main aapki kaise madad kar sakta hoon?\n\nHum provide karte hain:\n✓ Residential Interior\n✓ Corporate Office Design\n✓ Modular Kitchen\n✓ Turnkey Solutions',
    'Hello! Welcome to DPM Enterprise 🏠\n\nWe specialize in:\n✓ Residential Interior\n✓ Corporate Office Design\n✓ Modular Kitchen\n✓ Turnkey Solutions\n\nHow can I help you today?',
  ],
  pricing: [
    'Hamare rates project type aur size par depend karte hain.\n\nKya aap share kar sakte hain:\n• Project type (Office/Home/Kitchen)\n• Area (sq ft)\n• Location\n• Budget range\n\nHum aapko accurate quote denge! 📋',
    'Our pricing depends on project type and size.\n\nPlease share:\n• Project type (Office/Home/Kitchen)\n• Area (sq ft)\n• Location\n• Budget range\n\nWe will provide an accurate quote! 📋',
  ],
  services: [
    'DPM Enterprise ki services:\n\n🏠 Residential Interior\n🏢 Corporate Office Design\n🍳 Modular Kitchen\n🪑 Furniture Manufacturing\n🏗️ Turnkey Solutions\n🏛️ Government Projects\n\nKaunsi service chahiye?',
    'DPM Enterprise Services:\n\n🏠 Residential Interior\n🏢 Corporate Office Design\n🍳 Modular Kitchen\n🪑 Furniture Manufacturing\n🏗️ Turnkey Solutions\n🏛️ Government Projects\n\nWhich service interests you?',
  ],
  portfolio: [
    'Hamare projects dekhne ke liye:\n🔗 https://dpmenterprise.in/projects\n\nHumne 500+ projects complete kiye hain including:\n✓ Defense & Navy projects\n✓ Government offices\n✓ Premium residences',
    'View our portfolio:\n🔗 https://dpmenterprise.in/projects\n\nWe have completed 500+ projects including:\n✓ Defense & Navy projects\n✓ Government offices\n✓ Premium residences',
  ],
  contact: [
    'DPM Enterprise contact details:\n📞 +91 99309 98063\n📧 info@dpmenterprise.in\n🏢 Navi Mumbai, Maharashtra\n\nFree consultation ke liye call karein! ✅',
    'DPM Enterprise contact:\n📞 +91 99309 98063\n📧 info@dpmenterprise.in\n🏢 Navi Mumbai, Maharashtra\n\nCall us for a FREE consultation! ✅',
  ],
  timeline: [
    'Project timeline:\n• Small projects: 1-2 months\n• Medium projects: 2-4 months\n• Large/Turnkey: 4-8 months\n\nHum on-time delivery guarantee karte hain! ⏰',
    'Project timelines:\n• Small projects: 1-2 months\n• Medium projects: 2-4 months\n• Large/Turnkey: 4-8 months\n\nWe guarantee on-time delivery! ⏰',
  ],
  default: [
    'Dhanyavaad aapke message ke liye! 🙏\n\nHamari team aapko jaldi contact karegi.\n\nUrgent ke liye call karein:\n📞 +91 99309 98063',
    'Thank you for reaching out to DPM Enterprise! 🙏\n\nOur team will contact you shortly.\n\nFor urgent queries:\n📞 +91 99309 98063',
  ],
};

function detectIntent(msg: string): string {
  const m = msg.toLowerCase();
  if (m.match(/hello|hi|hey|namaste|good morning|good evening|start/)) return 'greeting';
  if (m.match(/price|cost|rate|budget|charge|kitna|paisa|quote|quotation/)) return 'pricing';
  if (m.match(/service|offer|provide|kya karte|what do you|work/)) return 'services';
  if (m.match(/portfolio|project|example|dekh|show|past work/)) return 'portfolio';
  if (m.match(/contact|phone|email|address|location|kahan|office/)) return 'contact';
  if (m.match(/time|duration|kitna time|how long|jaldi|deadline/)) return 'timeline';
  return 'default';
}

function buildReply(msg: string): string {
  const intent = detectIntent(msg);
  const [hindi, english] = REPLY_TEMPLATES[intent];
  const isHindi = /[\u0900-\u097F]/.test(msg) || /kya|hai|hain|kaise|kitna|chahiye|namaste|aap/.test(msg);
  return isHindi ? hindi : english;
}

// ── Handler ───────────────────────────────────────────────────────────────────

export default async function handler(req: Request, res: Response) {
  // Always respond 200 immediately so Meta doesn't retry
  res.status(200).json({ status: 'ok' });

  try {
    const body = req.body as {
      object?: string;
      entry?: {
        id: string;
        changes: {
          value: {
            messaging_product: string;
            metadata: { phone_number_id: string };
            contacts?: { profile: { name: string }; wa_id: string }[];
            messages?: {
              id: string;
              from: string;
              timestamp: string;
              type: string;
              text?: { body: string };
            }[];
          };
          field: string;
        }[];
      }[];
    };

    if (body.object !== 'whatsapp_business_account') return;

    for (const entry of body.entry || []) {
      for (const change of entry.changes) {
        const value = change.value;
        if (!value.messages?.length) continue;

        for (const msg of value.messages) {
          if (msg.type !== 'text' || !msg.text?.body) continue;

          const phone = msg.from;
          const text = msg.text.body;
          const contactName = value.contacts?.[0]?.profile?.name || 'Unknown';

          console.log(`[WhatsApp] Incoming from ${phone} (${contactName}): ${text.substring(0, 80)}`);

          // Generate auto-reply
          const reply = buildReply(text);

          // Save incoming message to DB
          const incomingId = `WA_IN_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
          await db.insert(whatsappMessages).values({
            messageId: incomingId,
            phone,
            name: contactName,
            message: text,
            reply,
            type: 'incoming',
            status: 'received',
            aiGenerated: false,
            sentAt: new Date(),
          });

          // Auto-create lead if project keywords detected
          const isProjectLead = /interior|design|furniture|kitchen|office|project|renovation|construction|modular|turnkey/.test(text.toLowerCase());
          if (isProjectLead) {
            const leadId = `LEAD_WA_${Date.now()}`;
            try {
              await db.insert(leads).values({
                leadId,
                name: contactName,
                phone,
                email: `${phone}@whatsapp.lead`,
                company: 'WhatsApp Inquiry',
                projectType: 'General Inquiry',
                budget: '500000',
                timeline: 'To be discussed',
                location: 'To be confirmed',
                message: text,
                source: 'WhatsApp',
                score: 55,
                status: 'warm',
                conversionStatus: 'new',
              });
              console.log(`[WhatsApp] Lead created: ${leadId} for ${contactName}`);
            } catch (e) {
              console.warn('[WhatsApp] Lead insert skipped (may already exist):', e);
            }
          }

          // Send auto-reply via Meta API
          const token = getSecret('WHATSAPP_TOKEN');
          const phoneNumberId = getSecret('WHATSAPP_PHONE_NUMBER_ID');

          if (token && phoneNumberId) {
            const metaUrl = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;
            await fetch(metaUrl, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: phone,
                type: 'text',
                text: { preview_url: false, body: reply },
              }),
            });

            // Log outgoing auto-reply
            const replyId = `WA_OUT_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
            await db.insert(whatsappMessages).values({
              messageId: replyId,
              phone,
              name: contactName,
              message: reply,
              reply: null,
              type: 'auto-reply',
              status: 'sent',
              aiGenerated: true,
              sentAt: new Date(),
            });

            console.log(`[WhatsApp] Auto-reply sent to ${phone}`);
          }
        }
      }
    }
  } catch (error) {
    console.error('[WhatsApp] Webhook processing error:', error);
  }
}
