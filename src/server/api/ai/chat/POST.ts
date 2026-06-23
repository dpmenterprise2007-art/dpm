/**
 * AI Chat Endpoint
 * POST /api/ai/chat
 * General-purpose AI assistant for DPM Enterprise dashboard
 */
import type { Request, Response } from 'express';
import { chatCompletion, DPM_SYSTEM_CONTEXT, isOpenAIConfigured } from '../../../lib/openai.js';
import type { ChatMessage } from '../../../lib/openai.js';

interface ChatRequest {
  message: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
  context?: string; // e.g. 'gem-portal', 'sales', 'marketing', 'finance'
}

const CONTEXT_PROMPTS: Record<string, string> = {
  'gem-portal': 'You are helping with GeM Portal tenders, BOQ, compliance, and government procurement.',
  sales: 'You are helping with sales pipeline, lead management, deal closing strategies, and CRM.',
  marketing: 'You are helping with marketing campaigns, social media content, and lead generation.',
  finance: 'You are helping with invoices, expenses, GST calculations, and financial reporting.',
  default: 'You are a general business assistant for DPM Enterprise.',
};

export default async function handler(req: Request, res: Response) {
  try {
    if (!isOpenAIConfigured()) {
      return res.status(503).json({
        error: 'OpenAI not configured',
        message: 'Add OPENAI_API_KEY in Settings → Secrets',
      });
    }

    const { message, history = [], context = 'default' }: ChatRequest = req.body;

    if (!message) return res.status(400).json({ error: 'message is required' });

    const contextPrompt = CONTEXT_PROMPTS[context] || CONTEXT_PROMPTS.default;

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `${DPM_SYSTEM_CONTEXT}\n\n${contextPrompt}\n\nBe concise, practical, and actionable. Use bullet points when listing items.`,
      },
      ...history.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message },
    ];

    const reply = await chatCompletion(messages, {
      model: 'gpt-4o-mini',
      temperature: 0.6,
      maxTokens: 1000,
    });

    res.json({
      success: true,
      reply,
      context,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[AI] Chat error:', error);
    res.status(500).json({
      error: 'AI chat failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
