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
exports.DeliveryLocation = void 0;
const typeorm_1 = require("typeorm");
let DeliveryLocation = class DeliveryLocation {
};
exports.DeliveryLocation = DeliveryLocation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DeliveryLocation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeliveryLocation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeliveryLocation.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'min_working_days' }),
    __metadata("design:type", Number)
], DeliveryLocation.prototype, "minWorkingDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_working_days' }),
    __metadata("design:type", Number)
], DeliveryLocation.prototype, "maxWorkingDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], DeliveryLocation.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], DeliveryLocation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], DeliveryLocation.prototype, "updatedAt", void 0);
exports.DeliveryLocation = DeliveryLocation = __decorate([
    (0, typeorm_1.Entity)('delivery_locations')
], DeliveryLocation);
//# sourceMappingURL=delivery-location.entity.js.map