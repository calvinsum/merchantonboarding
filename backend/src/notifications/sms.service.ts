import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';

@Injectable()
export class SMSService {
  private readonly logger = new Logger(SMSService.name);
  private twilioClient: twilio.Twilio;
  private isConfigured = false;

  constructor(private configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    
    if (accountSid && accountSid.startsWith('AC') && authToken) {
      this.twilioClient = twilio(accountSid, authToken);
      this.isConfigured = true;
      this.logger.log('Twilio configured successfully');
    } else {
      this.logger.warn('Twilio not configured - SMS notifications will be logged only');
    }
  }

  async sendSMS(to: string, message: string): Promise<void> {
    if (!this.isConfigured) {
      this.logger.log(`[SMS SIMULATION] To: ${to}, Message: ${message}`);
      return;
    }

    try {
      await this.twilioClient.messages.create({
        body: message,
        from: this.configService.get<string>('TWILIO_PHONE_NUMBER'),
        to,
      });
      this.logger.log(`SMS sent to ${to}`);
    } catch (error) {
      this.logger.error('SMS sending failed:', error);
      throw new Error('Failed to send SMS');
    }
  }
}
