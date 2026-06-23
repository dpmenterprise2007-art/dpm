/**
 * Seed Default Director Account
 * POST /api/auth/seed-director
 * Creates the default DPM_DIR_01 director account if it doesn't exist.
 * Safe to call multiple times — idempotent.
 */
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { users } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const DEFAULT_DIRECTOR = {
  userId: 'DPM_DIR_01',
  name: 'DPM Director',
  email: 'director@dpmenterprise.in',
  phone: '+919930998063',
  role: 'director',
  password: 'DPM@Admin2024',
};

export default async function handler(req: Request, res: Response) {
  try {
    // Check if already exists
    const [existing] = await db
      .select({ id: users.id, userId: users.userId })
      .from(users)
      .where(eq(users.userId, DEFAULT_DIRECTOR.userId))
      .limit(1);

    if (existing) {
      return res.json({
        success: true,
        alreadyExists: true,
        message: `Director account ${DEFAULT_DIRECTOR.userId} already exists.`,
        credentials: {
          userId: DEFAULT_DIRECTOR.userId,
          email: DEFAULT_DIRECTOR.email,
          note: 'Use your existing password to login.',
        },
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(DEFAULT_DIRECTOR.password, 12);

    // Insert director
    await db.insert(users).values({
      userId: DEFAULT_DIRECTOR.userId,
      name: DEFAULT_DIRECTOR.name,
      email: DEFAULT_DIRECTOR.email,
      phone: DEFAULT_DIRECTOR.phone,
      role: DEFAULT_DIRECTOR.role,
      passwordHash,
      accountStatus: 'active',
      failedLoginAttempts: 0,
    });

    console.log(`[Seed] Director account created: ${DEFAULT_DIRECTOR.userId}`);

    res.json({
      success: true,
      created: true,
      message: 'Default director account created successfully.',
      credentials: {
        userId: DEFAULT_DIRECTOR.userId,
        email: DEFAULT_DIRECTOR.email,
        password: DEFAULT_DIRECTOR.password,
        note: 'Change this password after first login.',
      },
    });
  } catch (error) {
    console.error('[Seed/Director] error:', error);
    res.status(500).json({ error: 'Failed to seed director account', message: String(error) });
  }
}
