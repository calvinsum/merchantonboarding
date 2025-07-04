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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const onboarding_record_entity_1 = require("../database/entities/onboarding-record.entity");
const merchant_entity_1 = require("../database/entities/merchant.entity");
const trainer_entity_1 = require("../database/entities/trainer.entity");
const training_slot_entity_1 = require("../database/entities/training-slot.entity");
const training_type_entity_1 = require("../database/entities/training-type.entity");
const delivery_location_entity_1 = require("../database/entities/delivery-location.entity");
const holiday_entity_1 = require("../database/entities/holiday.entity");
const system_settings_entity_1 = require("../database/entities/system-settings.entity");
let AdminService = class AdminService {
    constructor(onboardingRepository, merchantRepository, trainerRepository, trainingSlotRepository, trainingTypeRepository, deliveryLocationRepository, holidayRepository, systemSettingsRepository) {
        this.onboardingRepository = onboardingRepository;
        this.merchantRepository = merchantRepository;
        this.trainerRepository = trainerRepository;
        this.trainingSlotRepository = trainingSlotRepository;
        this.trainingTypeRepository = trainingTypeRepository;
        this.deliveryLocationRepository = deliveryLocationRepository;
        this.holidayRepository = holidayRepository;
        this.systemSettingsRepository = systemSettingsRepository;
    }
    async getAllOnboardingRecords() {
        return this.onboardingRepository.find({
            relations: ['merchant', 'slaBreaches'],
        });
    }
    async getOnboardingById(id) {
        return this.onboardingRepository.findOne({
            where: { id },
            relations: ['merchant', 'slaBreaches'],
        });
    }
    async createOnboardingRecord(data) {
        const onboardingRecord = this.onboardingRepository.create(data);
        return this.onboardingRepository.save(onboardingRecord);
    }
    async updateOnboardingRecord(id, data) {
        await this.onboardingRepository.update(id, data);
        return this.getOnboardingById(id);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(onboarding_record_entity_1.OnboardingRecord)),
    __param(1, (0, typeorm_1.InjectRepository)(merchant_entity_1.Merchant)),
    __param(2, (0, typeorm_1.InjectRepository)(trainer_entity_1.Trainer)),
    __param(3, (0, typeorm_1.InjectRepository)(training_slot_entity_1.TrainingSlot)),
    __param(4, (0, typeorm_1.InjectRepository)(training_type_entity_1.TrainingType)),
    __param(5, (0, typeorm_1.InjectRepository)(delivery_location_entity_1.DeliveryLocation)),
    __param(6, (0, typeorm_1.InjectRepository)(holiday_entity_1.Holiday)),
    __param(7, (0, typeorm_1.InjectRepository)(system_settings_entity_1.SystemSettings)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map