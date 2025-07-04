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
exports.OnboardingRecord = void 0;
const typeorm_1 = require("typeorm");
const merchant_entity_1 = require("./merchant.entity");
const sla_breach_entity_1 = require("./sla-breach.entity");
let OnboardingRecord = class OnboardingRecord {
};
exports.OnboardingRecord = OnboardingRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OnboardingRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'merchant_id' }),
    __metadata("design:type", String)
], OnboardingRecord.prototype, "merchantId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        array: true,
        name: 'onboarding_types',
    }),
    __metadata("design:type", Array)
], OnboardingRecord.prototype, "types", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['pending', 'in_progress', 'completed', 'cancelled'],
        default: 'pending',
    }),
    __metadata("design:type", String)
], OnboardingRecord.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], OnboardingRecord.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], OnboardingRecord.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_to', nullable: true }),
    __metadata("design:type", String)
], OnboardingRecord.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], OnboardingRecord.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], OnboardingRecord.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => merchant_entity_1.Merchant, (merchant) => merchant.onboardingRecords),
    (0, typeorm_1.JoinColumn)({ name: 'merchant_id' }),
    __metadata("design:type", merchant_entity_1.Merchant)
], OnboardingRecord.prototype, "merchant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sla_breach_entity_1.SLABreach, (breach) => breach.onboardingRecord),
    __metadata("design:type", Array)
], OnboardingRecord.prototype, "slaBreaches", void 0);
exports.OnboardingRecord = OnboardingRecord = __decorate([
    (0, typeorm_1.Entity)('onboarding_records')
], OnboardingRecord);
//# sourceMappingURL=onboarding-record.entity.js.map