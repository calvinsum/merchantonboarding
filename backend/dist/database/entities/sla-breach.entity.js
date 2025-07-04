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
exports.SLABreach = void 0;
const typeorm_1 = require("typeorm");
const onboarding_record_entity_1 = require("./onboarding-record.entity");
let SLABreach = class SLABreach {
};
exports.SLABreach = SLABreach;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SLABreach.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'onboarding_id' }),
    __metadata("design:type", String)
], SLABreach.prototype, "onboardingId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['hardware_delivery', 'hardware_installation', 'training'],
    }),
    __metadata("design:type", String)
], SLABreach.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected_date' }),
    __metadata("design:type", Date)
], SLABreach.prototype, "expectedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'actual_date', nullable: true }),
    __metadata("design:type", Date)
], SLABreach.prototype, "actualDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'breach_days' }),
    __metadata("design:type", Number)
], SLABreach.prototype, "breachDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SLABreach.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_resolved', default: false }),
    __metadata("design:type", Boolean)
], SLABreach.prototype, "isResolved", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'resolved_at', nullable: true }),
    __metadata("design:type", Date)
], SLABreach.prototype, "resolvedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SLABreach.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => onboarding_record_entity_1.OnboardingRecord, (record) => record.slaBreaches),
    (0, typeorm_1.JoinColumn)({ name: 'onboarding_id' }),
    __metadata("design:type", onboarding_record_entity_1.OnboardingRecord)
], SLABreach.prototype, "onboardingRecord", void 0);
exports.SLABreach = SLABreach = __decorate([
    (0, typeorm_1.Entity)('sla_breaches')
], SLABreach);
//# sourceMappingURL=sla-breach.entity.js.map