/**
 * Admin: Global real-time stats for admin portal
 */
import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads, users } from '../../../db/schema.js';
import { desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const [allLeads, allUsers] = await Promise.all([
      db.select().from(leads).orderBy(desc(leads.createdAt)),
      db.select({
        id: users.id,
        userId: users.userId,
        name: users.name,
        role: users.role,
        accountStatus: users.accountStatus,
        lastLogin: users.lastLogin,
      }).from(users),
    ]);

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const leadsToday = allLeads.filter(l => l.createdAt && new Date(l.createdAt) >= todayStart).length;
    const leadsWeek = allLeads.filter(l => l.createdAt && new Date(l.createdAt) >= weekStart).length;
    const leadsMonth = allLeads.filter(l => l.createdAt && new Date(l.createdAt) >= monthStart).length;

    // Recent leads (last 10)
    const recentLeads = allLeads.slice(0, 10).map(l => ({
      leadId: l.leadId,
      name: l.name,
      phone: l.phone,
      email: l.email,
      source: l.source,
      status: l.status,
      projectType: l.projectType,
      location: l.location,
      createdAt: l.createdAt,
    }));

    res.json({
      success: true,
      leads: {
        total: allLeads.length,
        hot: allLeads.filter(l => l.status === 'hot').length,
        warm: allLeads.filter(l => l.status === 'warm').length,
        cold: allLeads.filter(l => l.status === 'cold').length,
        today: leadsToday,
        thisWeek: leadsWeek,
        thisMonth: leadsMonth,
        recent: recentLeads,
      },
      users: {
        total: allUsers.length,
        active: allUsers.filter(u => u.accountStatus === 'active').length,
        frozen: allUsers.filter(u => u.accountStatus === 'frozen').length,
        directors: allUsers.filter(u => u.role === 'director').length,
        staff: allUsers.filter(u => u.role === 'staff').length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Admin/Stats] GET error:', error);
    res.status(500).json({ error: 'Failed to fetch stats', message: String(error) });
  }
}
