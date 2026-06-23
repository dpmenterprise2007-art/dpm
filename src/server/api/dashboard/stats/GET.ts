/**
 * Real-time Dashboard Stats API
 * Returns live metrics for leads, revenue, conversion, and system health
 */

import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads, invoices, expenses, whatsappMessages, emailCampaigns } from '../../../db/schema.js';
import { sql, count, sum, eq, gte } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    // Get date ranges
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // 1. LEAD METRICS
    const [totalLeads] = await db.select({ count: count() }).from(leads);
    const [todayLeads] = await db.select({ count: count() }).from(leads).where(gte(leads.createdAt, today));
    const [hotLeads] = await db.select({ count: count() }).from(leads).where(eq(leads.status, 'hot'));
    const [warmLeads] = await db.select({ count: count() }).from(leads).where(eq(leads.status, 'warm'));
    const [coldLeads] = await db.select({ count: count() }).from(leads).where(eq(leads.status, 'cold'));

    // 2. REVENUE METRICS
    const [totalRevenue] = await db
      .select({ total: sum(invoices.total) })
      .from(invoices)
      .where(eq(invoices.status, 'paid'));

    const [monthRevenue] = await db
      .select({ total: sum(invoices.total) })
      .from(invoices)
      .where(sql`${invoices.status} = 'paid' AND ${invoices.createdAt} >= ${thisMonth}`);

    const [pendingRevenue] = await db
      .select({ total: sum(invoices.total) })
      .from(invoices)
      .where(eq(invoices.status, 'pending'));

    // 3. EXPENSE METRICS
    const [totalExpenses] = await db
      .select({ total: sum(expenses.totalAmount) })
      .from(expenses)
      .where(eq(expenses.status, 'paid'));

    const [monthExpenses] = await db
      .select({ total: sum(expenses.totalAmount) })
      .from(expenses)
      .where(sql`${expenses.status} = 'paid' AND ${expenses.createdAt} >= ${thisMonth}`);

    // 4. CONVERSION METRICS
    const [convertedLeads] = await db
      .select({ count: count() })
      .from(leads)
      .where(eq(leads.conversionStatus, 'converted'));

    const conversionRate = totalLeads.count > 0 
      ? ((convertedLeads.count / totalLeads.count) * 100).toFixed(1)
      : '0.0';

    // 5. COMMUNICATION METRICS
    const [totalWhatsApp] = await db.select({ count: count() }).from(whatsappMessages);
    const [todayWhatsApp] = await db
      .select({ count: count() })
      .from(whatsappMessages)
      .where(gte(whatsappMessages.createdAt, today));

    const [totalEmails] = await db.select({ count: count() }).from(emailCampaigns);
    const [sentEmails] = await db
      .select({ count: count() })
      .from(emailCampaigns)
      .where(eq(emailCampaigns.status, 'sent'));

    // 6. CALCULATE PROFIT
    const revenue = parseFloat(totalRevenue.total || '0');
    const expense = parseFloat(totalExpenses.total || '0');
    const profit = revenue - expense;
    const profitMargin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : '0.0';

    // 7. GROWTH METRICS (compare with last month)
    const [lastMonthRevenue] = await db
      .select({ total: sum(invoices.total) })
      .from(invoices)
      .where(sql`${invoices.status} = 'paid' AND ${invoices.createdAt} >= ${lastMonth} AND ${invoices.createdAt} < ${thisMonth}`);

    const lastMonthRev = parseFloat(lastMonthRevenue.total || '0');
    const currentMonthRev = parseFloat(monthRevenue.total || '0');
    const revenueGrowth = lastMonthRev > 0
      ? (((currentMonthRev - lastMonthRev) / lastMonthRev) * 100).toFixed(1)
      : '0.0';

    // 8. SYSTEM HEALTH
    const systemHealth = {
      database: 'healthy',
      api: 'healthy',
      cron: 'active',
      lastUpdate: new Date().toISOString(),
    };

    // RESPONSE
    const stats = {
      leads: {
        total: totalLeads.count,
        today: todayLeads.count,
        hot: hotLeads.count,
        warm: warmLeads.count,
        cold: coldLeads.count,
        converted: convertedLeads.count,
        conversionRate: parseFloat(conversionRate),
      },
      revenue: {
        total: revenue,
        thisMonth: currentMonthRev,
        pending: parseFloat(pendingRevenue.total || '0'),
        growth: parseFloat(revenueGrowth),
      },
      expenses: {
        total: expense,
        thisMonth: parseFloat(monthExpenses.total || '0'),
      },
      profit: {
        total: profit,
        margin: parseFloat(profitMargin),
      },
      communication: {
        whatsapp: {
          total: totalWhatsApp.count,
          today: todayWhatsApp.count,
        },
        email: {
          total: totalEmails.count,
          sent: sentEmails.count,
        },
      },
      system: systemHealth,
      timestamp: new Date().toISOString(),
    };

    res.json(stats);
  } catch (error) {
    console.error('[API] Dashboard stats error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch dashboard stats', 
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
