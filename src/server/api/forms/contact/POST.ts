import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';
import nodemailer from 'nodemailer';

export default async function handler(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      phone,
      company,
      message,
      // contact form sends "service", API also accepts "projectType" directly
      service,
      projectType: rawProjectType,
      budget,
      timeline,
      city,
      location: rawLocation,
    } = req.body;

    // ── Normalise field aliases ──────────────────────────────────────────────
    const projectType: string = rawProjectType || service || 'General Enquiry';
    const location: string = rawLocation || city || '';

    // ── Validate required fields (only name + phone are truly required) ──────
    if (!name || !phone) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Name and phone are required',
      });
    }

    // ── AI scoring ───────────────────────────────────────────────────────────
    let aiScore = 0;

    // Budget scoring (0-30 points)
    if (budget) {
      const budgetLower = budget.toLowerCase();
      if (budgetLower.includes('1 crore') || budgetLower.includes('crore')) aiScore += 30;
      else if (budgetLower.includes('50') || budgetLower.includes('50 lakh')) aiScore += 25;
      else if (budgetLower.includes('15') || budgetLower.includes('15 lakh')) aiScore += 20;
      else if (budgetLower.includes('5') || budgetLower.includes('5 lakh')) aiScore += 15;
      else aiScore += 10;
    }

    // Timeline scoring (0-25 points)
    if (timeline) {
      if (timeline.includes('Immediate') || timeline.includes('1-2 weeks')) aiScore += 25;
      else if (timeline.includes('1 month')) aiScore += 20;
      else if (timeline.includes('2-3 months')) aiScore += 15;
      else aiScore += 10;
    }

    // Project type scoring (0-25 points)
    if (projectType) {
      if (projectType.includes('Government') || projectType.includes('Defense') || projectType.includes('Corporate')) aiScore += 25;
      else if (projectType.includes('Commercial') || projectType.includes('Turnkey')) aiScore += 20;
      else if (projectType.includes('Residential') || projectType.includes('Kitchen')) aiScore += 15;
      else aiScore += 10;
    }

    // Source quality — website leads are high quality (20 points)
    aiScore += 20;

    // Message quality (0-15 points)
    if (message && message.length > 100) aiScore += 15;
    else if (message && message.length > 50) aiScore += 10;
    else if (message) aiScore += 5;

    // Company provided (15 points)
    if (company) aiScore += 15;

    // Email provided (10 points)
    if (email) aiScore += 10;

    // Location provided (5 points)
    if (location) aiScore += 5;

    // ── Determine status (stored lowercase to match DB schema) ───────────────
    let status: 'hot' | 'warm' | 'cold' = 'cold';
    if (aiScore >= 70) status = 'hot';
    else if (aiScore >= 40) status = 'warm';

    // ── Generate unique leadId ────────────────────────────────────────────────
    const year = new Date().getFullYear();
    const leadCount = await db.select().from(leads);
    const leadNumber = String(leadCount.length + 1).padStart(4, '0');
    const leadId = `LEAD_${year}_${leadNumber}`;

    // ── Insert lead ───────────────────────────────────────────────────────────
    const result = await db.insert(leads).values({
      leadId,
      name,
      email: email || null,
      phone,
      company: company || null,
      message: message || null,
      projectType,
      budget: budget || null,
      timeline: timeline || null,
      location: location || null,
      source: 'Website Contact Form',
      status,
      score: aiScore,
      insights: JSON.stringify({
        scoreBreakdown: {
          budget: budget ? 'Provided' : 'Not provided',
          timeline: timeline || 'Not specified',
          projectType,
          source: 'Website (High Quality)',
          message: message ? 'Detailed inquiry' : 'Brief inquiry',
          company: company ? 'Company provided' : 'Individual',
          email: email ? 'Provided' : 'Not provided',
          location: location || 'Not specified',
        },
        recommendation:
          status === 'hot'
            ? 'Contact immediately - high potential'
            : status === 'warm'
            ? 'Follow up within 24 hours'
            : 'Standard follow-up within 48 hours',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const insertId = Number(result[0].insertId);

    // ── Email notification (non-blocking) ────────────────────────────────────
    try {
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (smtpUser && smtpPass) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: false,
          auth: { user: smtpUser, pass: smtpPass },
        });

        const statusEmoji = status === 'hot' ? '🔥' : status === 'warm' ? '⚡' : '❄️';
        const priorityText =
          status === 'hot' ? 'HIGH PRIORITY' : status === 'warm' ? 'MEDIUM PRIORITY' : 'STANDARD';

        await transporter.sendMail({
          from: smtpUser,
          to: 'admin@dpmenterprise.in',
          subject: `${statusEmoji} New ${priorityText} Lead — ${name} (Score: ${aiScore})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #001a3a; border-bottom: 3px solid #D4AF37; padding-bottom: 10px;">
                ${statusEmoji} New Lead — DPM Enterprise Website
              </h2>

              <div style="background: ${status === 'hot' ? '#fee2e2' : status === 'warm' ? '#fef3c7' : '#f3f4f6'}; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0; color: ${status === 'hot' ? '#dc2626' : status === 'warm' ? '#d97706' : '#6b7280'};">
                  ${priorityText} — AI Score: ${aiScore}/145
                </h3>
              </div>

              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #374151;">Contact Details</h3>
                <p><strong>Name:</strong> ${name}</p>
                ${email ? `<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` : ''}
                <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                ${location ? `<p><strong>City:</strong> ${location}</p>` : ''}
              </div>

              ${projectType || budget || timeline ? `
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #374151;">Project Details</h3>
                <p><strong>Service:</strong> ${projectType}</p>
                ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
                ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
              </div>` : ''}

              ${message ? `
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #374151;">Message</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>` : ''}

              <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1e40af;">AI Recommendation</h3>
                <p>${
                  status === 'hot'
                    ? '🔥 <strong>Contact immediately</strong> — high-potential lead with strong buying signals.'
                    : status === 'warm'
                    ? '⚡ <strong>Follow up within 24 hours</strong> — good potential, prompt response recommended.'
                    : '❄️ Standard follow-up within 48 hours.'
                }</p>
              </div>

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <a href="https://www.dpmenterprise.in/dashboard/leads"
                   style="background: #001a3a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  View in Dashboard
                </a>
              </div>

              <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px;">
                DPM Enterprise Private Limited — Complete Infrastructure Solutions Since 2007
              </p>
            </div>
          `,
        });
      }
    } catch (emailError) {
      // Email failure must never block the lead save
      console.error('Email notification failed (non-fatal):', emailError);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for contacting DPM Enterprise. We will get back to you shortly.',
      leadId: insertId,
      status,
      aiScore,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Failed to submit form',
      message: String(error),
    });
  }
}
