/**
 * Delete Social Post API
 */
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { socialPosts } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { postId } = req.body;
    if (!postId) return res.status(400).json({ error: 'postId required' });

    await db.delete(socialPosts).where(eq(socialPosts.postId, postId));
    console.log(`[Social] Deleted post: ${postId}`);
    res.json({ success: true, message: `Post ${postId} deleted` });
  } catch (error) {
    console.error('[Social] Delete error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
}
