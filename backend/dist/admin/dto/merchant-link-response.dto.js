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
exports.MerchantLinkResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MerchantLinkResponseDto {
}
exports.MerchantLinkResponseDto = MerchantLinkResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://storehub.com/onboarding/abc123def456', description: 'Unique merchant onboarding link' }),
    __metadata("design:type", String)
], MerchantLinkResponseDto.prototype, "loginLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'abc123def456', description: 'Unique merchant token' }),
    __metadata("design:type", String)
], MerchantLinkResponseDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-08-04T10:00:00Z', description: 'Link expiration date' }),
    __metadata("design:type", Date)
], MerchantLinkResponseDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Merchant ID' }),
    __metadata("design:type", String)
], MerchantLinkResponseDto.prototype, "merchantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123e4567-e89b-12d3-a456-426614174001', description: 'Onboarding record ID' }),
    __metadata("design:type", String)
], MerchantLinkResponseDto.prototype, "onboardingId", void 0);
//# sourceMappingURL=merchant-link-response.dto.js.map