/**
 * Admin: List all users
 */
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { users } from '../../../db/schema.js';
import { desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const allUsers = await db
      .select({
        id: users.id,
        userId: users.userId,
        name: users.name,
        email: users.email,
        phone: users.phone,
        role: users.role,
        accountStatus: users.accountStatus,
        failedLoginAttempts: users.failedLoginAttempts,
        lastLogin: users.lastLogin,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    res.json({ success: true, users: allUsers, total: allUsers.length });
  } catch (error) {
    console.error('[Admin/Users] GET error:', error);
    res.status(500).json({ error: 'Failed to fetch users', message: String(error) });
  }
}
