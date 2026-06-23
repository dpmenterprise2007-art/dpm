/**
 * AUTO FOLLOW-UP CRON JOB
 * Automatically sends follow-ups to leads based on their status and last contact
 */

import cron from 'node-cron';
import { db } from './db/client.js';
import { leads, followUps } from './db/schema.js';
import { eq } from 'drizzle-orm';

// Follow-up rules based on lead status
const FOLLOW_UP_RULES = {
  hot: {
    firstFollowUp: 1,
    secondFollowUp: 3,
    thirdFollowUp: 7,
    message: 'HOT lead - Urgent follow-up required'
  },
  warm: {
    firstFollowUp: 3,
    secondFollowUp: 7,
    thirdFollowUp: 14,
    message: 'WARM lead - Regular follow-up'
  },
  cold: {
    firstFollowUp: 7,
    secondFollowUp: 14,
    thirdFollowUp: 30,
    message: 'COLD lead - Periodic check-in'
  }
};

// Generate follow-up message
function generateFollowUpMessage(lead: any, followUpNumber: number): string {
  const name = lead.name || 'there';
  const projectType = lead.projectType || 'interior design services';
  const location = lead.location || 'your area';
  
  if (followUpNumber === 1) {
    return `Hi ${name}, Thank you for your interest in DPM Enterprise! I wanted to follow up on your inquiry about ${projectType}. We specialize in corporate and residential interiors and have successfully completed 500+ projects. Would you like to schedule a consultation call this week? Best regards, DPM Enterprise Team`;
  } else if (followUpNumber === 2) {
    return `Hi ${name}, I hope this message finds you well. I wanted to check if you had a chance to review our services for your ${projectType}. We're currently offering a FREE site visit and consultation for projects in ${location}. Would you be interested in discussing your requirements? Best regards, DPM Enterprise Team`;
  } else {
    return `Hi ${name}, This is my final follow-up regarding your ${projectType} inquiry. If you're still interested, we'd love to help bring your vision to life. Our team is ready to start whenever you are. Please let me know if you'd like to proceed or if you have any questions. Best regards, DPM Enterprise Team`;
  }
}

// Send follow-up
async function sendFollowUp(lead: any, followUpNumber: number) {
  const message = generateFollowUpMessage(lead, followUpNumber);
  
  console.log(`[FOLLOW-UP] Sending to ${lead.name} (${lead.phone})`);
  console.log(`[FOLLOW-UP] Type: ${lead.status.toUpperCase()} Lead - Follow-up #${followUpNumber}`);
  
  const followUpId = `FU_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    await db.insert(followUps).values({
      followUpId,
      leadId: lead.leadId,
      dealId: null,
      type: 'email',
      subject: `Follow-up #${followUpNumber} - ${lead.projectType || 'Your Project'}`,
      description: message,
      scheduledDate: new Date(),
      status: 'completed',
      assignedTo: 'Auto Follow-up System',
      completedDate: new Date(),
    });
    
    console.log(`[FOLLOW-UP] Created record: ${followUpId}`);
    return true;
  } catch (error) {
    console.error(`[FOLLOW-UP] Error:`, error);
    return false;
  }
}

// Check if follow_ups table exists
async function tableExists(): Promise<boolean> {
  try {
    await db.select().from(followUps).limit(1);
    return true;
  } catch {
    return false;
  }
}

// Process follow-ups
async function processFollowUps() {
  console.log('[FOLLOW-UP] Starting auto follow-up check...');
  
  try {
    // Guard: check table exists before querying
    const hasTable = await tableExists();
    if (!hasTable) {
      console.log('[FOLLOW-UP] follow_ups table not found - skipping (run db:migrate to create it)');
      return;
    }

    const allLeads = await db.select().from(leads);
    const now = new Date();
    let followUpsSent = 0;
    
    for (const lead of allLeads) {
      if (lead.status === 'converted' || lead.status === 'closed') continue;
      
      const createdAt = new Date(lead.createdAt!);
      const daysSinceCreation = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
      
      const rules = FOLLOW_UP_RULES[lead.status as keyof typeof FOLLOW_UP_RULES] || FOLLOW_UP_RULES.cold;
      
      let existingFollowUps: any[] = [];
      try {
        existingFollowUps = await db
          .select()
          .from(followUps)
          .where(eq(followUps.leadId, lead.leadId));
      } catch {
        continue; // skip this lead if query fails
      }
      
      const followUpCount = existingFollowUps.length;
      
      let shouldFollowUp = false;
      let followUpNumber = 1;
      
      if (followUpCount === 0 && daysSinceCreation >= rules.firstFollowUp) {
        shouldFollowUp = true;
        followUpNumber = 1;
      } else if (followUpCount === 1 && daysSinceCreation >= (rules.firstFollowUp + rules.secondFollowUp)) {
        shouldFollowUp = true;
        followUpNumber = 2;
      } else if (followUpCount === 2 && daysSinceCreation >= (rules.firstFollowUp + rules.secondFollowUp + rules.thirdFollowUp)) {
        shouldFollowUp = true;
        followUpNumber = 3;
      }
      
      if (shouldFollowUp) {
        const sent = await sendFollowUp(lead, followUpNumber);
        if (sent) followUpsSent++;
      }
    }
    
    console.log(`[FOLLOW-UP] Completed: ${followUpsSent} follow-ups sent`);
  } catch (error) {
    console.error('[FOLLOW-UP] Error:', error);
  }
}

// Start cron job
export function startFollowUpCron() {
  cron.schedule('0 */6 * * *', () => {
    console.log('[FOLLOW-UP] Cron job triggered');
    processFollowUps();
  });
  
  console.log('[FOLLOW-UP] Auto follow-up cron job scheduled: Every 6 hours');
  
  setTimeout(() => {
    console.log('[FOLLOW-UP] Running initial follow-up check...');
    processFollowUps();
  }, 5000);
}
