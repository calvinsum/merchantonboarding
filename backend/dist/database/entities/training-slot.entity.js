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
exports.TrainingSlot = void 0;
const typeorm_1 = require("typeorm");
const trainer_entity_1 = require("./trainer.entity");
const training_type_entity_1 = require("./training-type.entity");
let TrainingSlot = class TrainingSlot {
};
exports.TrainingSlot = TrainingSlot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TrainingSlot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], TrainingSlot.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_time' }),
    __metadata("design:type", String)
], TrainingSlot.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_time' }),
    __metadata("design:type", String)
], TrainingSlot.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trainer_id' }),
    __metadata("design:type", String)
], TrainingSlot.prototype, "trainerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'training_type_id' }),
    __metadata("design:type", String)
], TrainingSlot.prototype, "trainingTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['physical', 'remote', 'video'],
    }),
    __metadata("design:type", String)
], TrainingSlot.prototype, "mode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_participants', default: 1 }),
    __metadata("design:type", Number)
], TrainingSlot.prototype, "maxParticipants", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'booked_participants', default: 0 }),
    __metadata("design:type", Number)
], TrainingSlot.prototype, "bookedParticipants", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_booked', default: false }),
    __metadata("design:type", Boolean)
], TrainingSlot.prototype, "isBooked", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'onboarding_id', nullable: true }),
    __metadata("design:type", String)
], TrainingSlot.prototype, "onboardingId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], TrainingSlot.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], TrainingSlot.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => trainer_entity_1.Trainer, (trainer) => trainer.trainingSlots),
    (0, typeorm_1.JoinColumn)({ name: 'trainer_id' }),
    __metadata("design:type", trainer_entity_1.Trainer)
], TrainingSlot.prototype, "trainer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => training_type_entity_1.TrainingType, (type) => type.trainingSlots),
    (0, typeorm_1.JoinColumn)({ name: 'training_type_id' }),
    __metadata("design:type", training_type_entity_1.TrainingType)
], TrainingSlot.prototype, "trainingType", void 0);
exports.TrainingSlot = TrainingSlot = __decorate([
    (0, typeorm_1.Entity)('training_slots')
], TrainingSlot);
//# sourceMappingURL=training-slot.entity.js.map