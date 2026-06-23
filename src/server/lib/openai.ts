/**
 * OpenAI Client Utility
 * Shared helper for all AI features in DPM Enterprise
 */
import { getSecret } from '#airo/secrets';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Call OpenAI Chat Completions API
 */
export async function chatCompletion(
  messages: ChatMessage[],
  options: OpenAIOptions = {}
): Promise<string> {
  const apiKey = getSecret('OPENAI_API_KEY');

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY secret not configured. Add it in Settings → Secrets.');
  }

  const { model = 'gpt-4o-mini', temperature = 0.7, maxTokens = 1500 } = options;

  const res = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature,
      max_tokens: maxTokens,
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.json() as { error?: { message: string } };
    throw new Error(`OpenAI API error: ${err.error?.message || res.statusText}`);
  }

  const data = await res.json() as {
    choices: { message: { content: string } }[];
  };

  return data.choices[0]?.message?.content?.trim() || '';
}

/**
 * Check if OpenAI is configured
 */
export function isOpenAIConfigured(): boolean {
  try {
    const key = getSecret('OPENAI_API_KEY');
    return !!(key && typeof key === 'string' && key.startsWith('sk-'));
  } catch {
    return false;
  }
}

// DPM Enterprise system context — injected into every AI call
export const DPM_SYSTEM_CONTEXT = `You are an AI assistant for DPM Enterprise, a premium interior design and turnkey solutions company based in Virar East, Mumbai, Maharashtra, India.

Company Profile:
- Name: DPM Enterprise Private Limited
- Specialization: Residential Interior, Corporate Office Design, Modular Kitchen, Furniture Manufacturing, Turnkey Solutions, Government & Defense Projects
- Experience: 18+ years, 500+ completed projects
- Clients: Indian Navy, Indian Army, Indian Railways, Government offices, Premium residences, Corporate offices
- Location: 35 Florence Building, Work City, Virar East, Mumbai - 401305
- Contact: +91 99309 98063 | admin@dpmenterprise.in
- GeM Portal: Registered vendor for government procurement (GeM Vendor ID available on request)
- GST: 27AAHCD8357P1ZU | MSME: UDYAM-MH-19-0084438 | Startup India: DIPP49616
- Languages: Hindi and English

Always respond professionally, concisely, and in the context of interior design / construction / government procurement.`;
