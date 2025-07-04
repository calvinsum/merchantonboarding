export declare enum OnboardingType {
    HARDWARE_DELIVERY = "hardware_delivery",
    TRAINING_ONLY = "training_only",
    INSTALLATION_ONLY = "installation_only",
    FULL_ONBOARDING = "full_onboarding"
}
export declare enum MerchantSegment {
    FOOD_BEVERAGE = "food_beverage",
    RETAIL = "retail",
    SERVICES = "services",
    HEALTHCARE = "healthcare",
    EDUCATION = "education",
    OTHER = "other"
}
export declare class PreFillFormDto {
    accountName: string;
    email: string;
    phone: string;
    picName: string;
    segment: MerchantSegment;
    onboardingType: OnboardingType;
    preferredLanguage?: string;
    businessLocation?: string;
    notes?: string;
}
