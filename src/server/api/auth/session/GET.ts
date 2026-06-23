/**
 * Session Check API
 * GET /api/auth/session
 * Returns current logged-in user from cookie session
 */
import type { Request, Response } from 'express';
import { getSession, SESSION_COOKIE } from '../../../lib/auth-session.js';

export default async function handler(req: Request, res: Response) {
  const token = req.cookies?.[SESSION_COOKIE];
  const session = getSession(token);

  if (!session) {
    return res.status(401).json({ authenticated: false });
  }

  res.json({
    authenticated: true,
    user: {
      userId: session.userId,
      name: session.name,
      email: session.email,
      role: session.role,
    },
  });
}
