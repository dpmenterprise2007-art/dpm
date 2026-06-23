/**
 * Admin: Create a new user
 */
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { users } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'DPM_SALT_2024').digest('hex');
}

function generateUserId(role: string): string {
  const prefix = role === 'director' ? 'DPM_DIR' : role === 'staff' ? 'DPM_STAFF' : role === 'vendor' ? 'DPM_VND' : 'DPM_USR';
  const num = String(Math.floor(Math.random() * 9000) + 1000);
  return `${prefix}_${num}`;
}

export default async function handler(req: Request, res: Response) {
  try {
    const { name, email, phone, role, password, panGst } = req.body;

    if (!name || !email || !phone || !role || !password) {
      return res.status(400).json({ error: 'Missing required fields: name, email, phone, role, password' });
    }

    // Check duplicate email
    const existing = await db.select().from(users).where(eq(users.email, email));
    if (existing.length > 0) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const userId = generateUserId(role);
    const passwordHash = hashPassword(password);

    await db.insert(users).values({
      userId,
      name,
      email,
      phone,
      role,
      passwordHash,
      panGst: panGst || null,
      accountStatus: 'active',
      failedLoginAttempts: 0,
      resetRequests: 0,
    });

    res.status(201).json({
      success: true,
      message: `User ${name} created successfully`,
      userId,
      tempPassword: password,
    });
  } catch (error) {
    console.error('[Admin/Users] POST error:', error);
    res.status(500).json({ error: 'Failed to create user', message: String(error) });
  }
}
