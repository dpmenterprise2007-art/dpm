/**
 * Admin: Update user (status, role, reset password, freeze/unfreeze)
 */
import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { users } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'DPM_SALT_2024').digest('hex');
}

export default async function handler(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { action, name, phone, role, newPassword, accountStatus } = req.body;

    const existing = await db.select().from(users).where(eq(users.userId, userId));
    if (existing.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updates: Record<string, unknown> = { updatedAt: new Date() };

    if (action === 'freeze') {
      updates.accountStatus = 'frozen';
    } else if (action === 'activate') {
      updates.accountStatus = 'active';
      updates.failedLoginAttempts = 0;
    } else if (action === 'suspend') {
      updates.accountStatus = 'suspended';
    } else if (action === 'reset_password') {
      if (!newPassword) return res.status(400).json({ error: 'newPassword required' });
      updates.passwordHash = hashPassword(newPassword);
      updates.failedLoginAttempts = 0;
      updates.accountStatus = 'active';
      updates.resetRequests = (existing[0].resetRequests || 0) + 1;
    } else if (action === 'reset_attempts') {
      updates.failedLoginAttempts = 0;
    } else {
      // General update
      if (name) updates.name = name;
      if (phone) updates.phone = phone;
      if (role) updates.role = role;
      if (accountStatus) updates.accountStatus = accountStatus;
    }

    await db.update(users).set(updates as any).where(eq(users.userId, userId));

    res.json({ success: true, message: `User ${userId} updated successfully`, action });
  } catch (error) {
    console.error('[Admin/Users] PUT error:', error);
    res.status(500).json({ error: 'Failed to update user', message: String(error) });
  }
}
