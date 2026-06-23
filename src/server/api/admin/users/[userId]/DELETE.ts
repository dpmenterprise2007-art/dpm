/**
 * Admin: Delete a user
 */
import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { users } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const existing = await db.select().from(users).where(eq(users.userId, userId));
    if (existing.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent deleting director accounts
    if (existing[0].role === 'director') {
      return res.status(403).json({ error: 'Cannot delete director accounts. Freeze instead.' });
    }

    await db.delete(users).where(eq(users.userId, userId));

    res.json({ success: true, message: `User ${userId} deleted successfully` });
  } catch (error) {
    console.error('[Admin/Users] DELETE error:', error);
    res.status(500).json({ error: 'Failed to delete user', message: String(error) });
  }
}
