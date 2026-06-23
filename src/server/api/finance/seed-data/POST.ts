/**
 * Finance Master Data Seeder
 * Populate database with 50+ sample invoices, expenses, GST filings
 */

import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { invoices, expenses, gstFilings } from '../../../db/schema.js';

const COMPANIES = [
  'Skyline Developers', 'Urban Spaces Pvt Ltd', 'Metro Realty', 'Prime Properties',
  'TCS', 'Infosys', 'Wipro', 'Tech Mahindra', 'CIDCO', 'MMRDA',
  'Indian Railways', 'PWD Maharashtra', 'NMMC', 'TMC', 'Individual Client',
];

const PROJECT_TYPES = [
  'Residential Interior', 'Corporate Interior', 'Modular Kitchen',
  'Government Project', 'Turnkey Solution', 'Commercial Showroom',
];

const EXPENSE_CATEGORIES = [
  'Materials', 'Labor', 'Transport', 'Office Rent', 'Marketing', 'Utilities',
];

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomAmount(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default async function handler(req: Request, res: Response) {
  try {
    const { count = 50 } = req.body;

    const startDate = new Date('2025-01-01');
    const endDate = new Date();

    // Generate Invoices
    const invoiceData = [];
    for (let i = 0; i < count; i++) {
      const invoiceNumber = `INV_2025_${String(1000 + i).padStart(4, '0')}`;
      const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
      const projectType = PROJECT_TYPES[Math.floor(Math.random() * PROJECT_TYPES.length)];
      const amount = randomAmount(100000, 5000000);
      const gstAmount = (amount * 18) / 100;
      const total = amount + gstAmount;
      const status = Math.random() > 0.3 ? 'paid' : Math.random() > 0.5 ? 'pending' : 'overdue';
      const issueDate = randomDate(startDate, endDate);
      const dueDate = new Date(issueDate);
      dueDate.setDate(dueDate.getDate() + 30);

      invoiceData.push({
        invoiceId: invoiceNumber,
        clientName: company,
        clientEmail: `${company.toLowerCase().replace(/\s+/g, '')}@example.com`,
        clientPhone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        items: JSON.stringify([{
          item: projectType,
          description: `${projectType} project for ${company}`,
          quantity: 1,
          rate: amount,
          amount: amount,
        }]),
        subtotal: amount.toFixed(2),
        gst: gstAmount.toFixed(2),
        total: total.toFixed(2),
        paidAmount: status === 'paid' ? total.toFixed(2) : '0.00',
        balanceAmount: status === 'paid' ? '0.00' : total.toFixed(2),
        dueDate,
        status: status === 'paid' ? 'paid' : status === 'overdue' ? 'overdue' : 'unpaid',
        paymentMethod: status === 'paid' ? ['UPI', 'Bank Transfer', 'Cheque'][Math.floor(Math.random() * 3)] : null,
      });
    }

    // Insert invoices in batches
    for (let i = 0; i < invoiceData.length; i += 10) {
      const batch = invoiceData.slice(i, i + 10);
      await db.insert(invoices).values(batch);
    }

    // Generate Expenses
    const expenseData = [];
    for (let i = 0; i < count; i++) {
      const expenseId = `EXP_2025_${String(1000 + i).padStart(4, '0')}`;
      const category = EXPENSE_CATEGORIES[Math.floor(Math.random() * EXPENSE_CATEGORIES.length)];
      const amount = randomAmount(5000, 500000);
      const gstAmount = (amount * 18) / 100;
      const totalAmount = amount + gstAmount;
      const paymentDate = randomDate(startDate, endDate);

      expenseData.push({
        expenseId,
        category,
        description: `${category} expense for project`,
        amount: amount.toFixed(2),
        gstAmount: gstAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        paymentMode: ['Cash', 'UPI', 'Bank Transfer', 'Cheque'][Math.floor(Math.random() * 4)],
        paymentDate,
        vendor: `Vendor ${i + 1}`,
        invoiceNumber: `VINV_${1000 + i}`,
        status: 'paid',
      });
    }

    // Insert expenses in batches
    for (let i = 0; i < expenseData.length; i += 10) {
      const batch = expenseData.slice(i, i + 10);
      await db.insert(expenses).values(batch);
    }

    // Generate GST Filings (last 12 months)
    const gstData = [];
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
      const month = currentDate.getMonth() - i;
      const year = currentDate.getFullYear();
      const period = `${String(month + 1).padStart(2, '0')}-${year}`;
      
      const totalSales = randomAmount(1000000, 10000000);
      const totalPurchases = randomAmount(500000, 5000000);
      const outputGst = (totalSales * 18) / 100;
      const inputGst = (totalPurchases * 18) / 100;
      const netGst = outputGst - inputGst;

      const dueDate = new Date(year, month + 1, 20); // 20th of next month
      const filed = i > 1; // Last 2 months pending

      gstData.push({
        filingId: `GST_${year}_${String(month + 1).padStart(2, '0')}`,
        filingType: i % 3 === 0 ? 'GSTR-9' : i % 2 === 0 ? 'GSTR-3B' : 'GSTR-1',
        period,
        dueDate,
        filedDate: filed ? new Date(dueDate.getTime() - Math.random() * 10 * 24 * 60 * 60 * 1000) : null,
        status: filed ? 'filed' : 'pending',
        totalSales: totalSales.toFixed(2),
        totalPurchases: totalPurchases.toFixed(2),
        outputGst: outputGst.toFixed(2),
        inputGst: inputGst.toFixed(2),
        netGst: netGst.toFixed(2),
      });
    }

    // Insert GST filings
    await db.insert(gstFilings).values(gstData);

    // Calculate totals
    const totalRevenue = invoiceData.reduce((sum, inv) => sum + parseFloat(inv.total), 0);
    const totalExpenses = expenseData.reduce((sum, exp) => sum + parseFloat(exp.totalAmount), 0);
    const profit = totalRevenue - totalExpenses;

    console.log(`[Finance] Master data seeded: ${count} invoices, ${count} expenses, 12 GST filings`);

    res.status(201).json({
      success: true,
      data: {
        invoices: count,
        expenses: count,
        gstFilings: 12,
      },
      summary: {
        totalRevenue: totalRevenue.toFixed(2),
        totalExpenses: totalExpenses.toFixed(2),
        profit: profit.toFixed(2),
      },
      message: 'Finance master data seeded successfully',
    });
  } catch (error) {
    console.error('[Finance] Seed data error:', error);
    res.status(500).json({
      error: 'Failed to seed finance data',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
