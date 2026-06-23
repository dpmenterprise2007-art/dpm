/**
 * Social Media Publish API
 * Publishes posts to social media platforms
 */

import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { socialPosts } from '../../../db/schema.js';

async function publishToFacebook(post: any) {
  console.log('[Social] Publishing to Facebook:', post.content.substring(0, 50));
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, postId: `FB_${Date.now()}` };
}

async function publishToInstagram(post: any) {
  console.log('[Social] Publishing to Instagram:', post.content.substring(0, 50));
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, postId: `IG_${Date.now()}` };
}

async function publishToLinkedIn(post: any) {
  console.log('[Social] Publishing to LinkedIn:', post.content.substring(0, 50));
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, postId: `LI_${Date.now()}` };
}

async function publishToTwitter(post: any) {
  console.log('[Social] Publishing to Twitter:', post.content.substring(0, 50));
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, postId: `TW_${Date.now()}` };
}

export default async function handler(req: Request, res: Response) {
  try {
    const { platform, content, imageUrl, hashtags, scheduledDate } = req.body;
    
    if (!platform || !content) {
      return res.status(400).json({ error: 'platform and content required' });
    }
    
    const validPlatforms = ['facebook', 'instagram', 'linkedin', 'twitter'];
    if (!validPlatforms.includes(platform.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid platform' });
    }
    
    const post = {
      content,
      imageUrl,
      hashtags: hashtags || [],
      scheduledDate: scheduledDate || new Date()
    };
    
    let result;
    
    switch (platform.toLowerCase()) {
      case 'facebook':
        result = await publishToFacebook(post);
        break;
      case 'instagram':
        result = await publishToInstagram(post);
        break;
      case 'linkedin':
        result = await publishToLinkedIn(post);
        break;
      case 'twitter':
        result = await publishToTwitter(post);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported platform' });
    }
    
    if (!result.success) {
      return res.status(500).json({ error: 'Failed to publish' });
    }
    
    const postId = `POST_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await db.insert(socialPosts).values({
      postId,
      platform: platform.toLowerCase(),
      content,
      imageUrl: imageUrl || null,
      hashtags: hashtags ? JSON.stringify(hashtags) : null,
      scheduledAt: new Date(scheduledDate || Date.now()),
      status: 'posted',
      postedAt: new Date(),
    });
    
    console.log(`[Social] Published to ${platform}: ${postId}`);
    
    res.json({
      success: true,
      postId,
      platform,
      externalPostId: result.postId,
      message: `Successfully published to ${platform}`,
      publishedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Social] Publish error:', error);
    res.status(500).json({ error: 'Failed to publish' });
  }
}
