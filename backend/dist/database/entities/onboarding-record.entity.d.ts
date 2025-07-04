import { Merchant } from './merchant.entity';
import { SLABreach } from './sla-breach.entity';
export declare class OnboardingRecord {
    id: string;
    merchantId: string;
    types: string[];
    status: string;
    progress: {
        hardwareDelivery: {
            status: string;
            scheduledDate?: Date;
            completedDate?: Date;
            slaDate: Date;
            notes?: string;
        };
        hardwareInstallation: {
            status: string;
            scheduledDate?: Date;
            completedDate?: Date;
            slaDate: Date;
            notes?: string;
        };
        training: {
            status: string;
            scheduledDate?: Date;
            completedDate?: Date;
            slaDate: Date;
            notes?: string;
        };
    };
    notes: string;
    assignedTo: string;
    createdAt: Date;
    updatedAt: Date;
    merchant: Merchant;
    slaBreaches: SLABreach[];
}
