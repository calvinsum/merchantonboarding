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
exports.Trainer = void 0;
const typeorm_1 = require("typeorm");
const training_slot_entity_1 = require("./training-slot.entity");
let Trainer = class Trainer {
};
exports.Trainer = Trainer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Trainer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Trainer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Trainer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Trainer.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        array: true,
    }),
    __metadata("design:type", Array)
], Trainer.prototype, "languages", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        array: true,
    }),
    __metadata("design:type", Array)
], Trainer.prototype, "locations", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['active', 'inactive', 'busy'],
        default: 'active',
    }),
    __metadata("design:type", String)
], Trainer.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assignment_count', default: 0 }),
    __metadata("design:type", Number)
], Trainer.prototype, "assignmentCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Trainer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Trainer.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => training_slot_entity_1.TrainingSlot, (slot) => slot.trainer),
    __metadata("design:type", Array)
], Trainer.prototype, "trainingSlots", void 0);
exports.Trainer = Trainer = __decorate([
    (0, typeorm_1.Entity)('trainers')
], Trainer);
//# sourceMappingURL=trainer.entity.js.map