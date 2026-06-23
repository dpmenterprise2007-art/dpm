import type { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { db } from '../../../db/client.js';
import { leads } from '../../../db/schema.js';
import { inArray } from 'drizzle-orm';

/**
 * Email Campaign Automation API
 * POST /api/email/send-campaign
 * 
 * Sends bulk email campaigns with personalization and tracking
 * Requires Gmail SMTP credentials in environment variables
 */

interface CampaignRequest {
  campaignId: string;
  recipients: string[]; // Array of lead IDs or email addresses
  subject: string;
  template: 'welcome' | 'followup' | 'quote' | 'reminder' | 'custom';
  customContent?: string;
  trackOpens?: boolean;
  trackClicks?: boolean;
}

interface EmailTemplate {
  subject: string;
  html: (data: any) => string;
}

// Email Templates
const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  welcome: {
    subject: 'Welcome to DPM Enterprise - Your Interior Design Partner',
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #d97706; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to DPM Enterprise</h1>
            <p>Your Trusted Interior Design Partner Since 2007</p>
          </div>
          <div class="content">
            <p>Dear ${data.name || 'Valued Client'},</p>
            <p>Thank you for your interest in DPM Enterprise! We're excited to help you transform your space into something extraordinary.</p>
            <p><strong>What's Next?</strong></p>
            <ul>
              <li>Our team will review your requirements within 24 hours</li>
              <li>You'll receive a personalized quote tailored to your needs</li>
              <li>We'll schedule a consultation at your convenience</li>
            </ul>
            <p>In the meantime, explore our portfolio of 500+ completed projects:</p>
            <a href="https://dpmenterprise.in/projects" class="button">View Our Projects</a>
            <p><strong>Need immediate assistance?</strong></p>
            <p>Call us: <a href="tel:+912269719769">022-69719769</a><br>
            WhatsApp: <a href="https://wa.me/919321478963">+91 93214 78963</a></p>
          </div>
          <div class="footer">
            <p>DPM Enterprise Private Limited<br>
            Navi Mumbai, Maharashtra 400708<br>
            <a href="https://dpmenterprise.in">www.dpmenterprise.in</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  },
  followup: {
    subject: 'Following Up on Your Interior Design Project',
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #d97706; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .highlight { background: #fef3c7; padding: 15px; border-left: 4px solid #d97706; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>We're Here to Help!</h1>
          </div>
          <div class="content">
            <p>Dear ${data.name || 'Valued Client'},</p>
            <p>We wanted to follow up on your recent inquiry about <strong>${data.projectType || 'your interior design project'}</strong>.</p>
            <div class="highlight">
              <p><strong>Special Offer:</strong> Book a free consultation this week and get 10% off on design fees!</p>
            </div>
            <p><strong>Why Choose DPM Enterprise?</strong></p>
            <ul>
              <li>18+ years of experience</li>
              <li>500+ completed projects</li>
              <li>ISO 9001:2015 certified</li>
              <li>In-house manufacturing facility</li>
              <li>Turnkey solutions from design to execution</li>
            </ul>
            <a href="https://dpmenterprise.in/contact" class="button">Schedule Free Consultation</a>
            <p>Have questions? Reply to this email or call us at <a href="tel:+912269719769">022-69719769</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  },
  quote: {
    subject: 'Your Personalized Quote from DPM Enterprise',
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .quote-box { background: white; border: 2px solid #d97706; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .button { display: inline-block; background: #d97706; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Quote is Ready!</h1>
          </div>
          <div class="content">
            <p>Dear ${data.name || 'Valued Client'},</p>
            <p>Thank you for your patience. We've prepared a detailed quote for your <strong>${data.projectType || 'project'}</strong>.</p>
            <div class="quote-box">
              <h3>Quote Summary</h3>
              <p><strong>Project:</strong> ${data.projectType || 'Interior Design'}<br>
              <strong>Estimated Area:</strong> ${data.area || 'TBD'} sq ft<br>
              <strong>Timeline:</strong> ${data.timeline || 'TBD'}<br>
              <strong>Total Amount:</strong> ₹${data.total ? data.total.toLocaleString('en-IN') : 'TBD'} (incl. GST)</p>
            </div>
            <p><strong>What's Included:</strong></p>
            <ul>
              <li>Complete design consultation</li>
              <li>3D visualization</li>
              <li>Material procurement</li>
              <li>Execution & installation</li>
              <li>Quality assurance</li>
            </ul>
            <a href="https://dpmenterprise.in/contact" class="button">Accept Quote & Proceed</a>
            <p><em>This quote is valid for 30 days from the date of issue.</em></p>
          </div>
        </div>
      </body>
      </html>
    `,
  },
  reminder: {
    subject: 'Reminder: Your Quote Expires Soon',
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc2626 0%, #f59e0b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .urgent { background: #fef2f2; border: 2px solid #dc2626; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .button { display: inline-block; background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏰ Quote Expiring Soon!</h1>
          </div>
          <div class="content">
            <p>Dear ${data.name || 'Valued Client'},</p>
            <div class="urgent">
              <p><strong>⚠️ Your quote expires in ${data.daysLeft || '3'} days!</strong></p>
            </div>
            <p>We noticed you haven't responded to our quote for <strong>${data.projectType || 'your project'}</strong>.</p>
            <p><strong>Don't miss out on:</strong></p>
            <ul>
              <li>Current pricing (subject to material cost changes)</li>
              <li>Priority scheduling for your project</li>
              <li>Special discount offer</li>
            </ul>
            <a href="https://dpmenterprise.in/contact" class="button">Confirm Your Project Now</a>
            <p>Questions? Call us at <a href="tel:+912269719769">022-69719769</a> or reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  },
};

// Create email transporter
function createEmailTransporter() {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPassword) {
    throw new Error('Gmail SMTP credentials not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in environment variables.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
  });
}

// Send individual email
async function sendEmail(transporter: any, to: string, subject: string, html: string, trackingPixel?: string) {
  const fromName = process.env.EMAIL_FROM_NAME || 'DPM Enterprise';
  const fromEmail = process.env.GMAIL_USER || 'contact@dpmenterprise.in';
  const replyTo = process.env.EMAIL_REPLY_TO || fromEmail;

  let finalHtml = html;
  if (trackingPixel) {
    finalHtml += trackingPixel;
  }

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject,
    html: finalHtml,
    replyTo,
  });
}

export default async function handler(req: Request, res: Response) {
  try {
    const { campaignId, recipients, subject, template, customContent, trackOpens }: CampaignRequest = req.body;

    // Validation
    if (!campaignId || !recipients || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: campaignId, recipients',
      });
    }

    if (!template && !customContent) {
      return res.status(400).json({
        success: false,
        error: 'Either template or customContent must be provided',
      });
    }

    // Create transporter
    let transporter;
    try {
      transporter = createEmailTransporter();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Email service not configured',
        message: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Please configure Gmail SMTP credentials using the requestSecrets tool',
      });
    }

    // Fetch recipient data from database
    const recipientData = await db
      .select()
      .from(leads)
      .where(inArray(leads.id, recipients.map(Number)));

    if (recipientData.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No valid recipients found',
      });
    }

    // Send emails
    const results = {
      sent: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const recipient of recipientData) {
      try {
        // Get template or use custom content
        let emailSubject = subject;
        let emailHtml = customContent || '';

        if (template && EMAIL_TEMPLATES[template]) {
          const templateData = EMAIL_TEMPLATES[template];
          emailSubject = emailSubject || templateData.subject;
          emailHtml = templateData.html({
            name: recipient.name,
            email: recipient.email,
            projectType: recipient.projectType,
            budget: recipient.budget,
            timeline: recipient.timeline,
          });
        }

        // Add tracking pixel if enabled
        let trackingPixel = '';
        if (trackOpens) {
          trackingPixel = `<img src="https://dpmenterprise.in/api/email/track-open/${campaignId}/${recipient.id}" width="1" height="1" style="display:none;" />`;
        }

        // Send email
        await sendEmail(transporter, recipient.email || '', emailSubject, emailHtml, trackingPixel);
        results.sent++;

        // Rate limiting (1 email per second to avoid spam filters)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        results.failed++;
        results.errors.push(`Failed to send to ${recipient.email}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Campaign sent successfully`,
      campaignId,
      results: {
        total: recipientData.length,
        sent: results.sent,
        failed: results.failed,
        errors: results.errors.length > 0 ? results.errors : undefined,
      },
    });
  } catch (error) {
    console.error('Email campaign error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send campaign',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
