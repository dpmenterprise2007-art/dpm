/**
 * Social Posts List API
 * Returns all published social media posts
 */

import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { socialPosts } from '../../../../db/schema.js';
import { desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const posts = await db
      .select()
      .from(socialPosts)
      .orderBy(desc(socialPosts.postedAt))
      .limit(50);

    res.json({
      success: true,
      posts,
      total: posts.length
    });
  } catch (error) {
    console.error('[Social] List error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
