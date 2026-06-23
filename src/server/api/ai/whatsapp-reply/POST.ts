/**
 * GPT-Powered WhatsApp Reply Generator
 * POST /api/ai/whatsapp-reply
 * Generates context-aware, personalised WhatsApp replies
 */
import type { Request, Response } from 'express';
import { chatCompletion, DPM_SYSTEM_CONTEXT, isOpenAIConfigured } from '../../../lib/openai.js';

interface WhatsAppReplyRequest {
  customerMessage: string;
  customerName?: string;
  conversationHistory?: { role: 'customer' | 'agent'; message: string }[];
  language?: 'hindi' | 'english' | 'hinglish' | 'auto';
}

export default async function handler(req: Request, res: Response) {
  try {
    if (!isOpenAIConfigured()) {
      return res.status(503).json({
        error: 'OpenAI not configured',
        message: 'Add OPENAI_API_KEY in Settings → Secrets',
      });
    }

    const {
      customerMessage,
      customerName,
      conversationHistory = [],
      language = 'auto',
    }: WhatsAppReplyRequest = req.body;

    if (!customerMessage) {
      return res.status(400).json({ error: 'customerMessage is required' });
    }

    const langInstruction =
      language === 'hindi'
        ? 'Reply in Hindi (Devanagari script).'
        : language === 'english'
        ? 'Reply in English.'
        : language === 'hinglish'
        ? 'Reply in Hinglish (natural mix of Hindi and English, written in Roman script).'
        : 'Detect the language from the customer message and reply in the same language. If Hindi/Hinglish, reply in Hinglish. If English, reply in English.';

    // Build conversation context
    const historyText =
      conversationHistory.length > 0
        ? '\n\nConversation history:\n' +
          conversationHistory
            .map(h => `${h.role === 'customer' ? 'Customer' : 'DPM Agent'}: ${h.message}`)
            .join('\n')
        : '';

    const systemPrompt = `${DPM_SYSTEM_CONTEXT}

You are responding to a WhatsApp message on behalf of DPM Enterprise. 
${langInstruction}
Keep replies concise (under 200 words), warm, and professional.
Always end with a call-to-action (ask for project details, suggest a site visit, or provide contact info).
Use appropriate emojis sparingly.`;

    const userPrompt = `Customer Name: ${customerName || 'Customer'}
${historyText}

Customer's latest message: "${customerMessage}"

Write a helpful, personalised WhatsApp reply from DPM Enterprise.`;

    const reply = await chatCompletion(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      { model: 'gpt-4o-mini', temperature: 0.7, maxTokens: 400 }
    );

    res.json({
      success: true,
      reply,
      customerName: customerName || 'Customer',
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[AI] WhatsApp reply error:', error);
    res.status(500).json({
      error: 'AI reply generation failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
