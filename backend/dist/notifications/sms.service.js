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
var SMSService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const twilio = require("twilio");
let SMSService = SMSService_1 = class SMSService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(SMSService_1.name);
        this.isConfigured = false;
        const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
        const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
        if (accountSid && accountSid.startsWith('AC') && authToken) {
            this.twilioClient = twilio(accountSid, authToken);
            this.isConfigured = true;
            this.logger.log('Twilio configured successfully');
        }
        else {
            this.logger.warn('Twilio not configured - SMS notifications will be logged only');
        }
    }
    async sendSMS(to, message) {
        if (!this.isConfigured) {
            this.logger.log(`[SMS SIMULATION] To: ${to}, Message: ${message}`);
            return;
        }
        try {
            await this.twilioClient.messages.create({
                body: message,
                from: this.configService.get('TWILIO_PHONE_NUMBER'),
                to,
            });
            this.logger.log(`SMS sent to ${to}`);
        }
        catch (error) {
            this.logger.error('SMS sending failed:', error);
            throw new Error('Failed to send SMS');
        }
    }
};
exports.SMSService = SMSService;
exports.SMSService = SMSService = SMSService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SMSService);
//# sourceMappingURL=sms.service.js.map