import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private readonly logger;
    private isConfigured;
    constructor(configService: ConfigService);
    sendEmail(to: string, subject: string, body: string): Promise<void>;
}
