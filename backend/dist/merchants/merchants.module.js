"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const merchants_controller_1 = require("./merchants.controller");
const merchants_service_1 = require("./merchants.service");
const merchant_entity_1 = require("../database/entities/merchant.entity");
const onboarding_record_entity_1 = require("../database/entities/onboarding-record.entity");
const training_slot_entity_1 = require("../database/entities/training-slot.entity");
const holiday_entity_1 = require("../database/entities/holiday.entity");
const shared_module_1 = require("../shared/shared.module");
let MerchantsModule = class MerchantsModule {
};
exports.MerchantsModule = MerchantsModule;
exports.MerchantsModule = MerchantsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                merchant_entity_1.Merchant,
                onboarding_record_entity_1.OnboardingRecord,
                training_slot_entity_1.TrainingSlot,
                holiday_entity_1.Holiday,
            ]),
            shared_module_1.SharedModule,
        ],
        controllers: [merchants_controller_1.MerchantsController],
        providers: [merchants_service_1.MerchantsService],
        exports: [merchants_service_1.MerchantsService],
    })
], MerchantsModule);
//# sourceMappingURL=merchants.module.js.map