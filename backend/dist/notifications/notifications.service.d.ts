import { EmailService } from './email.service';
import { SMSService } from './sms.service';
export declare class NotificationsService {
    private emailService;
    private smsService;
    constructor(emailService: EmailService, smsService: SMSService);
    sendWelcomeEmail(email: string, name: string, token: string): Promise<void>;
    sendReminderEmail(email: string, name: string, type: string): Promise<void>;
    sendSLABreachAlert(email: string, merchantName: string, type: string): Promise<void>;
    sendReminderSMS(phone: string, type: string): Promise<void>;
}
