export declare class ValidationService {
    isValidEmail(email: string): boolean;
    isValidPhone(phone: string): boolean;
    isValidPostalCode(postalCode: string): boolean;
    isValidTime(time: string): boolean;
    isFutureDate(date: Date): boolean;
    isDateInRange(date: Date, minDate: Date, maxDate: Date): boolean;
    isValidOnboardingType(type: string): boolean;
    isValidMerchantSegment(segment: string): boolean;
    isValidLanguage(language: string): boolean;
    isValidTrainingMode(mode: string): boolean;
    isValidFileType(mimeType: string): boolean;
    isValidFileSize(size: number, maxSize?: number): boolean;
    sanitizeString(input: string): string;
    isValidUUID(uuid: string): boolean;
    isValidPassword(password: string): boolean;
    validateSchedulingConstraints(data: {
        type: string;
        date: Date;
        deliveryDate?: Date;
        installationDate?: Date;
    }): {
        valid: boolean;
        error?: string;
    };
}
