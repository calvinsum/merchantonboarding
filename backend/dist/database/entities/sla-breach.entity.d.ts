import { OnboardingRecord } from './onboarding-record.entity';
export declare class SLABreach {
    id: string;
    onboardingId: string;
    type: string;
    expectedDate: Date;
    actualDate: Date;
    breachDays: number;
    reason: string;
    isResolved: boolean;
    resolvedAt: Date;
    createdAt: Date;
    onboardingRecord: OnboardingRecord;
}
