"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const scheduling_service_1 = require("./scheduling.service");
const training_slot_entity_1 = require("../database/entities/training-slot.entity");
const trainer_entity_1 = require("../database/entities/trainer.entity");
const training_type_entity_1 = require("../database/entities/training-type.entity");
const holiday_entity_1 = require("../database/entities/holiday.entity");
const shared_module_1 = require("../shared/shared.module");
let SchedulingModule = class SchedulingModule {
};
exports.SchedulingModule = SchedulingModule;
exports.SchedulingModule = SchedulingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([training_slot_entity_1.TrainingSlot, trainer_entity_1.Trainer, training_type_entity_1.TrainingType, holiday_entity_1.Holiday]),
            shared_module_1.SharedModule,
        ],
        providers: [scheduling_service_1.SchedulingService],
        exports: [scheduling_service_1.SchedulingService],
    })
], SchedulingModule);
//# sourceMappingURL=scheduling.module.js.map