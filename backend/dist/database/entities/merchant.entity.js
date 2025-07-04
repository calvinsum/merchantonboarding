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
exports.Merchant = void 0;
const typeorm_1 = require("typeorm");
const onboarding_record_entity_1 = require("./onboarding-record.entity");
let Merchant = class Merchant {
};
exports.Merchant = Merchant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Merchant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_name' }),
    __metadata("design:type", String)
], Merchant.prototype, "accountName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Merchant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Merchant.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pic_name' }),
    __metadata("design:type", String)
], Merchant.prototype, "picName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['food_beverage', 'retail', 'services', 'healthcare', 'beauty', 'education', 'other'],
    }),
    __metadata("design:type", String)
], Merchant.prototype, "segment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'delivery_address' }),
    __metadata("design:type", Object)
], Merchant.prototype, "deliveryAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'training_address' }),
    __metadata("design:type", Object)
], Merchant.prototype, "trainingAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['en', 'ms', 'zh', 'ta'],
        name: 'preferred_language',
    }),
    __metadata("design:type", String)
], Merchant.prototype, "preferredLanguage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'expected_go_live_date' }),
    __metadata("design:type", Date)
], Merchant.prototype, "expectedGoLiveDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Merchant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Merchant.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => onboarding_record_entity_1.OnboardingRecord, (record) => record.merchant),
    __metadata("design:type", Array)
], Merchant.prototype, "onboardingRecords", void 0);
exports.Merchant = Merchant = __decorate([
    (0, typeorm_1.Entity)('merchants')
], Merchant);
//# sourceMappingURL=merchant.entity.js.map