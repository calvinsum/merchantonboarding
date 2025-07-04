import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private isConfigured = false;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    if (apiKey && apiKey.startsWith('SG.')) {
      sgMail.setApiKey(apiKey);
      this.isConfigured = true;
      this.logger.log('SendGrid configured successfully');
    } else {
      this.logger.warn('SendGrid not configured - email notifications will be logged only');
    }
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    if (!this.isConfigured) {
      this.logger.log(`[EMAIL SIMULATION] To: ${to}, Subject: ${subject}, Body: ${body}`);
      return;
    }

    const msg = {
      to,
      from: {
        email: this.configService.get<string>('SENDGRID_FROM_EMAIL'),
        name: this.configService.get<string>('SENDGRID_FROM_NAME'),
      },
      subject,
      text: body,
      html: body.replace(/\n/g, '<br>'),
    };

    try {
      await sgMail.send(msg);
      this.logger.log(`Email sent to ${to}`);
    } catch (error) {
      this.logger.error('Email sending failed:', error);
      throw new Error('Failed to send email');
    }
  }
}
