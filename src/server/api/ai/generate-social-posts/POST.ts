/**
 * AI Social Posts Generator
 * POST /api/ai/generate-social-posts
 * Uses real GPT to generate DPM-branded social media content
 */
import type { Request, Response } from 'express';
import { chatCompletion, DPM_SYSTEM_CONTEXT, isOpenAIConfigured } from '../../../lib/openai.js';

interface SocialPostRequest {
  topic?: string;
  platform?: 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'all';
  tone?: 'professional' | 'casual' | 'promotional' | 'educational';
  language?: 'hindi' | 'english' | 'hinglish';
  count?: number;
}

export default async function handler(req: Request, res: Response) {
  try {
    if (!isOpenAIConfigured()) {
      return res.status(503).json({
        error: 'OpenAI not configured',
        message: 'Add OPENAI_API_KEY in Settings → Secrets',
        mockMode: true,
      });
    }

    const {
      topic = 'interior design services',
      platform = 'all',
      tone = 'professional',
      language = 'hinglish',
      count = 3,
    }: SocialPostRequest = req.body;

    const platformGuide =
      platform === 'instagram'
        ? 'Instagram (use emojis, hashtags, visual language, max 2200 chars)'
        : platform === 'facebook'
        ? 'Facebook (conversational, can be longer, include call-to-action)'
        : platform === 'linkedin'
        ? 'LinkedIn (professional, business-focused, thought leadership)'
        : platform === 'twitter'
        ? 'Twitter/X (concise, punchy, max 280 chars, 1-2 hashtags)'
        : 'Instagram, Facebook, and LinkedIn (create one post for each platform)';

    const langGuide =
      language === 'hindi'
        ? 'Write entirely in Hindi (Devanagari script)'
        : language === 'english'
        ? 'Write in English'
        : 'Write in Hinglish (mix of Hindi words written in English + English, natural Indian style)';

    const prompt = `Generate ${count} social media post(s) for DPM Enterprise about: "${topic}"

Platform: ${platformGuide}
Tone: ${tone}
Language: ${langGuide}

Requirements:
- Include relevant emojis
- Add 5-8 relevant hashtags (mix of Hindi and English for Hinglish posts)
- Include a clear call-to-action (contact number or website)
- Highlight DPM's strengths: 15+ years experience, 500+ projects, government/defense expertise
- Make it engaging and shareable

Return ONLY a JSON array like:
[
  {
    "platform": "Instagram",
    "content": "post text here",
    "hashtags": ["#tag1", "#tag2"],
    "characterCount": 150
  }
]`;

    const result = await chatCompletion(
      [
        { role: 'system', content: DPM_SYSTEM_CONTEXT },
        { role: 'user', content: prompt },
      ],
      { model: 'gpt-4o-mini', temperature: 0.8, maxTokens: 2000 }
    );

    // Parse JSON from response
    let posts: unknown[] = [];
    try {
      const jsonMatch = result.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        posts = JSON.parse(jsonMatch[0]);
      } else {
        posts = [{ platform: platform === 'all' ? 'General' : platform, content: result, hashtags: [] }];
      }
    } catch {
      posts = [{ platform: platform === 'all' ? 'General' : platform, content: result, hashtags: [] }];
    }

    res.json({
      success: true,
      posts,
      topic,
      platform,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[AI] Social posts error:', error);
    res.status(500).json({
      error: 'AI generation failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
