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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sgMail = require("@sendgrid/mail");
let EmailService = EmailService_1 = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(EmailService_1.name);
        this.isConfigured = false;
        const apiKey = this.configService.get('SENDGRID_API_KEY');
        if (apiKey && apiKey.startsWith('SG.')) {
            sgMail.setApiKey(apiKey);
            this.isConfigured = true;
            this.logger.log('SendGrid configured successfully');
        }
        else {
            this.logger.warn('SendGrid not configured - email notifications will be logged only');
        }
    }
    async sendEmail(to, subject, body) {
        if (!this.isConfigured) {
            this.logger.log(`[EMAIL SIMULATION] To: ${to}, Subject: ${subject}, Body: ${body}`);
            return;
        }
        const msg = {
            to,
            from: {
                email: this.configService.get('SENDGRID_FROM_EMAIL'),
                name: this.configService.get('SENDGRID_FROM_NAME'),
            },
            subject,
            text: body,
            html: body.replace(/\n/g, '<br>'),
        };
        try {
            await sgMail.send(msg);
            this.logger.log(`Email sent to ${to}`);
        }
        catch (error) {
            this.logger.error('Email sending failed:', error);
            throw new Error('Failed to send email');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map