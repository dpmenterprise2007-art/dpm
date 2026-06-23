/**
 * Logout API
 * POST /api/auth/logout
 * Clears session cookie and removes session from store
 */
import type { Request, Response } from 'express';
import { deleteSession, SESSION_COOKIE } from '../../../lib/auth-session.js';

export default async function handler(req: Request, res: Response) {
  const token = req.cookies?.[SESSION_COOKIE];
  if (token) deleteSession(token);

  res.clearCookie(SESSION_COOKIE, { path: '/' });
  res.json({ success: true, message: 'Logged out successfully' });
}
