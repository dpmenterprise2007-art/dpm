/**
 * Dashboard Login API
 * POST /api/auth/login
 * Body: { email: string, password: string }
 */
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { users } from '../../../db/schema.js';
import { eq, or } from 'drizzle-orm';
import { createSession, SESSION_COOKIE } from '../../../lib/auth-session.js';
import bcrypt from 'bcryptjs';

export default async function handler(req: Request, res: Response) {
  try {
    const { email, password, userId } = req.body;

    if ((!email && !userId) || !password) {
      return res.status(400).json({ error: 'Email/User ID and password are required' });
    }

    // Find user by email OR userId
    const conditions = [];
    if (email) conditions.push(eq(users.email, email.trim().toLowerCase()));
    if (userId) conditions.push(eq(users.userId, userId.trim().toUpperCase()));

    const [user] = await db
      .select()
      .from(users)
      .where(conditions.length === 1 ? conditions[0] : or(...conditions))
      .limit(1);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check account status
    if (user.accountStatus === 'frozen') {
      return res.status(403).json({ error: 'Account is frozen. Contact your administrator.' });
    }
    if (user.accountStatus === 'suspended') {
      return res.status(403).json({ error: 'Account is suspended. Contact your administrator.' });
    }

    // Check failed attempts (max 5)
    if ((user.failedLoginAttempts ?? 0) >= 5) {
      return res.status(403).json({
        error: 'Account locked after too many failed attempts. Contact your administrator.',
      });
    }

    // Verify password
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      // Increment failed attempts
      await db
        .update(users)
        .set({ failedLoginAttempts: (user.failedLoginAttempts ?? 0) + 1 })
        .where(eq(users.id, user.id));
      const remaining = 5 - ((user.failedLoginAttempts ?? 0) + 1);
      return res.status(401).json({
        error: `Invalid credentials. ${remaining > 0 ? `${remaining} attempts remaining.` : 'Account locked.'}`,
      });
    }

    // Success — reset failed attempts, update last login
    await db
      .update(users)
      .set({ failedLoginAttempts: 0, lastLogin: new Date() })
      .where(eq(users.id, user.id));

    // Create session
    const token = createSession({
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: Date.now(),
    });

    // Set session cookie (httpOnly, 8h)
    res.cookie(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000,
      path: '/',
    });

    res.json({
      success: true,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('[Auth/Login] error:', error);
    res.status(500).json({ error: 'Login failed', message: String(error) });
  }
}
