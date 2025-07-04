import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format
   */
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Validate Malaysian postal code
   */
  isValidPostalCode(postalCode: string): boolean {
    const postalCodeRegex = /^\d{5}$/;
    return postalCodeRegex.test(postalCode);
  }

  /**
   * Validate time format (HH:MM)
   */
  isValidTime(time: string): boolean {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  }

  /**
   * Validate date is in the future
   */
  isFutureDate(date: Date): boolean {
    return date > new Date();
  }

  /**
   * Validate date is within allowed range
   */
  isDateInRange(date: Date, minDate: Date, maxDate: Date): boolean {
    return date >= minDate && date <= maxDate;
  }

  /**
   * Validate onboarding type
   */
  isValidOnboardingType(type: string): boolean {
    const validTypes = ['hardware_delivery', 'hardware_installation', 'training'];
    return validTypes.includes(type);
  }

  /**
   * Validate merchant segment
   */
  isValidMerchantSegment(segment: string): boolean {
    const validSegments = [
      'food_beverage',
      'retail',
      'services',
      'healthcare',
      'beauty',
      'education',
      'other',
    ];
    return validSegments.includes(segment);
  }

  /**
   * Validate language
   */
  isValidLanguage(language: string): boolean {
    const validLanguages = ['en', 'ms', 'zh', 'ta'];
    return validLanguages.includes(language);
  }

  /**
   * Validate training mode
   */
  isValidTrainingMode(mode: string): boolean {
    const validModes = ['physical', 'remote', 'video'];
    return validModes.includes(mode);
  }

  /**
   * Validate file type
   */
  isValidFileType(mimeType: string): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    return allowedTypes.includes(mimeType);
  }

  /**
   * Validate file size
   */
  isValidFileSize(size: number, maxSize: number = 10 * 1024 * 1024): boolean {
    return size <= maxSize;
  }

  /**
   * Sanitize string input
   */
  sanitizeString(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }

  /**
   * Validate UUID format
   */
  isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  /**
   * Validate password strength
   */
  isValidPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  /**
   * Validate scheduling constraints
   */
  validateSchedulingConstraints(data: {
    type: string;
    date: Date;
    deliveryDate?: Date;
    installationDate?: Date;
  }): { valid: boolean; error?: string } {
    const { type, date, deliveryDate, installationDate } = data;

    // Installation must be after delivery
    if (type === 'hardware_installation' && deliveryDate) {
      if (date <= deliveryDate) {
        return {
          valid: false,
          error: 'Installation must be scheduled after delivery date',
        };
      }
    }

    // Training must be after installation
    if (type === 'training' && installationDate) {
      if (date <= installationDate) {
        return {
          valid: false,
          error: 'Training must be scheduled after installation date',
        };
      }
    }

    return { valid: true };
  }
}
