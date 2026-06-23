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

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.organization) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to DB as lead (dedup check)
    try {
      const existing = await db.select().from(leads).where(
        or(eq(leads.phone, formData.phone), eq(leads.email, formData.email))
      );
      if (existing.length === 0) {
        await db.insert(leads).values({
          leadId: generateLeadId(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          company: formData.organization,
          projectType: formData.projectType || 'Elite B2B Enquiry',
          budget: formData.projectValue || null,
          timeline: formData.timeline || null,
          location: formData.projectLocation || null,
          source: 'Elite Enquiry Form',
          message: formData.requirements || null,
          status: 'hot', // Elite enquiries are always hot
          score: 90,
        });
      }
    } catch (dbErr) {
      console.error('[EliteEnquiry] DB save error:', dbErr);
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'sales@dpmenterprise.in',
        pass: process.env.EMAIL_PASSWORD || '',
      },
    });

    // Email content with high priority styling
    const emailContent = `
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: white; margin: 0;">🏆 ELITE B2B ENQUIRY - HIGH PRIORITY</h2>
      </div>
      
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Designation:</strong> ${formData.designation}</p>
      <p><strong>Organization:</strong> ${formData.organization}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      
      <h3>Project Details</h3>
      <p><strong>Project Type:</strong> ${formData.projectType}</p>
      <p><strong>Project Value:</strong> ${formData.projectValue}</p>
      <p><strong>Location:</strong> ${formData.projectLocation}</p>
      <p><strong>Timeline:</strong> ${formData.timeline}</p>
      
      <h3>Requirements</h3>
      <p>${formData.requirements}</p>
      
      ${formData.referenceProjects ? `
        <h3>Reference Projects</h3>
        <p>${formData.referenceProjects}</p>
      ` : ''}
      
      <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-top: 20px;">
        <p style="margin: 0;"><strong>⚠️ ACTION REQUIRED:</strong> Senior team must respond within 24 hours</p>
      </div>
      
      <p><em>Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</em></p>
    `;

    // Send email with high priority
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'sales@dpmenterprise.in',
      to: 'sales@dpmenterprise.in',
      subject: `🏆 ELITE ENQUIRY - ${formData.organization} - ${formData.projectValue}`,
      html: emailContent,
      priority: 'high',
    });

    res.status(200).json({ success: true, message: 'Elite enquiry submitted successfully' });
  } catch (error) {
    console.error('Elite enquiry error:', error);
    res.status(500).json({ error: 'Failed to submit enquiry', message: String(error) });
  }
}
