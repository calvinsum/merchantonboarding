import { ConfigService } from '@nestjs/config';
export declare class SMSService {
    private configService;
    private readonly logger;
    private twilioClient;
    private isConfigured;
    constructor(configService: ConfigService);
    sendSMS(to: string, message: string): Promise<void>;
}
