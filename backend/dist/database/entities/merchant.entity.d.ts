import { OnboardingRecord } from './onboarding-record.entity';
export declare class Merchant {
    id: string;
    accountName: string;
    email: string;
    phone: string;
    picName: string;
    segment: string;
    deliveryAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    trainingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    preferredLanguage: string;
    expectedGoLiveDate: Date;
    authToken: string;
    authTokenExpiry: Date;
    status: string;
    businessLocation: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    onboardingRecords: OnboardingRecord[];
}
