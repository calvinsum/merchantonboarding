"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
const sms_service_1 = require("./sms.service");
let NotificationsService = class NotificationsService {
    constructor(emailService, smsService) {
        this.emailService = emailService;
        this.smsService = smsService;
    }
    async sendWelcomeEmail(email, name, token) {
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
    async sendReminderEmail(email, name, type) {
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
    async sendSLABreachAlert(email, merchantName, type) {
        const subject = `SLA Breach Alert: ${merchantName}`;
        const body = `
      Alert: SLA breach detected for ${merchantName}
      
      Type: ${type}
      
      Please take immediate action.
    `;
        await this.emailService.sendEmail(email, subject, body);
    }
    async sendReminderSMS(phone, type) {
        const message = `StoreHub Reminder: Please schedule your ${type}. Visit your portal to schedule.`;
        await this.smsService.sendSMS(phone, message);
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        sms_service_1.SMSService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map