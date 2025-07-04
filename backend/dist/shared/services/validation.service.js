"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const common_1 = require("@nestjs/common");
let ValidationService = class ValidationService {
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    isValidPhone(phone) {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    isValidPostalCode(postalCode) {
        const postalCodeRegex = /^\d{5}$/;
        return postalCodeRegex.test(postalCode);
    }
    isValidTime(time) {
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(time);
    }
    isFutureDate(date) {
        return date > new Date();
    }
    isDateInRange(date, minDate, maxDate) {
        return date >= minDate && date <= maxDate;
    }
    isValidOnboardingType(type) {
        const validTypes = ['hardware_delivery', 'hardware_installation', 'training'];
        return validTypes.includes(type);
    }
    isValidMerchantSegment(segment) {
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
    isValidLanguage(language) {
        const validLanguages = ['en', 'ms', 'zh', 'ta'];
        return validLanguages.includes(language);
    }
    isValidTrainingMode(mode) {
        const validModes = ['physical', 'remote', 'video'];
        return validModes.includes(mode);
    }
    isValidFileType(mimeType) {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        return allowedTypes.includes(mimeType);
    }
    isValidFileSize(size, maxSize = 10 * 1024 * 1024) {
        return size <= maxSize;
    }
    sanitizeString(input) {
        return input.trim().replace(/[<>]/g, '');
    }
    isValidUUID(uuid) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    }
    isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }
    validateSchedulingConstraints(data) {
        const { type, date, deliveryDate, installationDate } = data;
        if (type === 'hardware_installation' && deliveryDate) {
            if (date <= deliveryDate) {
                return {
                    valid: false,
                    error: 'Installation must be scheduled after delivery date',
                };
            }
        }
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
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)()
], ValidationService);
//# sourceMappingURL=validation.service.js.map