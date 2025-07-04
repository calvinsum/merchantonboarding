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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreFillFormDto = exports.MerchantSegment = exports.OnboardingType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var OnboardingType;
(function (OnboardingType) {
    OnboardingType["HARDWARE_DELIVERY"] = "hardware_delivery";
    OnboardingType["TRAINING_ONLY"] = "training_only";
    OnboardingType["INSTALLATION_ONLY"] = "installation_only";
    OnboardingType["FULL_ONBOARDING"] = "full_onboarding";
})(OnboardingType || (exports.OnboardingType = OnboardingType = {}));
var MerchantSegment;
(function (MerchantSegment) {
    MerchantSegment["FOOD_BEVERAGE"] = "food_beverage";
    MerchantSegment["RETAIL"] = "retail";
    MerchantSegment["SERVICES"] = "services";
    MerchantSegment["HEALTHCARE"] = "healthcare";
    MerchantSegment["EDUCATION"] = "education";
    MerchantSegment["OTHER"] = "other";
})(MerchantSegment || (exports.MerchantSegment = MerchantSegment = {}));
class PreFillFormDto {
}
exports.PreFillFormDto = PreFillFormDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Demo Restaurant', description: 'Merchant account name' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreFillFormDto.prototype, "accountName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'demo@restaurant.com', description: 'Merchant email' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], PreFillFormDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+60123456789', description: 'Merchant phone number' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], PreFillFormDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Person in charge name' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreFillFormDto.prototype, "picName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'food_beverage', enum: MerchantSegment, description: 'Merchant business segment' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(MerchantSegment),
    __metadata("design:type", String)
], PreFillFormDto.prototype, "segment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'full_onboarding', enum: OnboardingType, description: 'Type of onboarding needed' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(OnboardingType),
    __metadata("design:type", String)
], PreFillFormDto.prototype, "onboardingType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'en', description: 'Preferred language', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreFillFormDto.prototype, "preferredLanguage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Kuala Lumpur', description: 'Business location', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreFillFormDto.prototype, "businessLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Special requirements', description: 'Additional notes', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PreFillFormDto.prototype, "notes", void 0);
//# sourceMappingURL=pre-fill-form.dto.js.map