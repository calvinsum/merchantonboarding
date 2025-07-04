"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_service_1 = require("./admin.service");
const onboarding_controller_1 = require("./controllers/onboarding.controller");
const pre_fill_controller_1 = require("./controllers/pre-fill.controller");
const onboarding_record_entity_1 = require("../database/entities/onboarding-record.entity");
const merchant_entity_1 = require("../database/entities/merchant.entity");
const trainer_entity_1 = require("../database/entities/trainer.entity");
const training_slot_entity_1 = require("../database/entities/training-slot.entity");
const training_type_entity_1 = require("../database/entities/training-type.entity");
const delivery_location_entity_1 = require("../database/entities/delivery-location.entity");
const holiday_entity_1 = require("../database/entities/holiday.entity");
const system_settings_entity_1 = require("../database/entities/system-settings.entity");
const shared_module_1 = require("../shared/shared.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                onboarding_record_entity_1.OnboardingRecord,
                merchant_entity_1.Merchant,
                trainer_entity_1.Trainer,
                training_slot_entity_1.TrainingSlot,
                training_type_entity_1.TrainingType,
                delivery_location_entity_1.DeliveryLocation,
                holiday_entity_1.Holiday,
                system_settings_entity_1.SystemSettings,
            ]),
            shared_module_1.SharedModule,
        ],
        controllers: [onboarding_controller_1.OnboardingController, pre_fill_controller_1.PreFillController],
        providers: [admin_service_1.AdminService],
        exports: [admin_service_1.AdminService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map