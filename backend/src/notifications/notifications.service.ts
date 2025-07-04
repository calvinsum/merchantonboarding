import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';
import { SMSService } from './sms.service';

@Injectable()
export class NotificationsService {
  constructor(
    private emailService: EmailService,
    private smsService: SMSService,
  ) {}

  async sendWelcomeEmail(email: string, name: string, token: string): Promise<void> {
    const subject = 'Welcome to StoreHub Onboarding';
    const body = `
      Dear ${name},
      
      Welcome to StoreHub! Your onboarding portal is now ready.
      
      Click here to access your portal: ${process.env.FRONTEND_URL}/portal?token=${token}
      
      Best regards,
      StoreHub Team
    `;

    await this.emailService.sendEmail(email, subject, body);
  }

  async sendReminderEmail(email: string, name: string, type: string): Promise<void> {
    const subject = `Reminder: ${type} Scheduling Required`;
    const body = `
      Dear ${name},
      
      This is a reminder that you need to schedule your ${type}.
      
      Please log in to your portal to schedule: ${process.env.FRONTEND_URL}/portal
      
      Best regards,
      StoreHub Team
    `;

    await this.emailService.sendEmail(email, subject, body);
  }

  async sendSLABreachAlert(email: string, merchantName: string, type: string): Promise<void> {
    const subject = `SLA Breach Alert: ${merchantName}`;
    const body = `
      Alert: SLA breach detected for ${merchantName}
      
      Type: ${type}
      
      Please take immediate action.
    `;

    await this.emailService.sendEmail(email, subject, body);
  }

  async sendReminderSMS(phone: string, type: string): Promise<void> {
    const message = `StoreHub Reminder: Please schedule your ${type}. Visit your portal to schedule.`;
    await this.smsService.sendSMS(phone, message);
  }
}
