import type { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';
import { eq, or } from 'drizzle-orm';

function generateLeadId(): string {
  const year = new Date().getFullYear();
  const num = String(Math.floor(Math.random() * 90000) + 10000);
  return `LEAD_${year}_${num}`;
}

export default async function handler(req: Request, res: Response) {
  try {
    const formData = req.body;

    if (!formData.companyName || !formData.email || !formData.phone || !formData.gst) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to DB
    try {
      const existing = await db.select().from(leads).where(
        or(eq(leads.phone, formData.phone), eq(leads.email, formData.email))
      );
      if (existing.length === 0) {
        await db.insert(leads).values({
          leadId: generateLeadId(),
          name: formData.contactPerson || formData.companyName,
          phone: formData.phone,
          email: formData.email,
          company: formData.companyName,
          projectType: 'Supplier Registration',
          budget: formData.turnover || null,
          location: formData.city ? `${formData.city}, ${formData.state}` : null,
          source: 'Supplier Registration Form',
          message: `Category: ${formData.category}. Products: ${formData.products}`,
          status: 'warm',
          score: 50,
        });
      }
    } catch (dbErr) {
      console.error('[SupplierReg] DB save error:', dbErr);
    }

    // Create email transporter (using Gmail as example)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'sales@dpmenterprise.in',
        pass: process.env.EMAIL_PASSWORD || '',
      },
    });

    // Email content
    const emailContent = `
      <h2>New Supplier Registration</h2>
      <h3>Company Information</h3>
      <p><strong>Company Name:</strong> ${formData.companyName}</p>
      <p><strong>GST Number:</strong> ${formData.gst}</p>
      <p><strong>Contact Person:</strong> ${formData.contactPerson}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Website:</strong> ${formData.website || 'N/A'}</p>
      
      <h3>Business Details</h3>
      <p><strong>Category:</strong> ${formData.category}</p>
      <p><strong>Experience:</strong> ${formData.experience} years</p>
      <p><strong>Annual Turnover:</strong> ${formData.turnover || 'N/A'}</p>
      <p><strong>Certifications:</strong> ${formData.certifications || 'N/A'}</p>
      <p><strong>Products/Services:</strong> ${formData.products}</p>
      
      <h3>Address</h3>
      <p>${formData.address}</p>
      <p>${formData.city}, ${formData.state} - ${formData.pincode}</p>
      
      <p><em>Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</em></p>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'sales@dpmenterprise.in',
      to: 'sales@dpmenterprise.in',
      subject: `New Supplier Registration - ${formData.companyName}`,
      html: emailContent,
    });

    res.status(200).json({ success: true, message: 'Registration submitted successfully' });
  } catch (error) {
    console.error('Supplier registration error:', error);
    res.status(500).json({ error: 'Failed to submit registration', message: String(error) });
  }
}
