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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const onboarding_record_entity_1 = require("../database/entities/onboarding-record.entity");
const merchant_entity_1 = require("../database/entities/merchant.entity");
const sla_breach_entity_1 = require("../database/entities/sla-breach.entity");
const training_slot_entity_1 = require("../database/entities/training-slot.entity");
const trainer_entity_1 = require("../database/entities/trainer.entity");
let ReportsService = class ReportsService {
    constructor(onboardingRepository, merchantRepository, slaBreachRepository, trainingSlotRepository, trainerRepository) {
        this.onboardingRepository = onboardingRepository;
        this.merchantRepository = merchantRepository;
        this.slaBreachRepository = slaBreachRepository;
        this.trainingSlotRepository = trainingSlotRepository;
        this.trainerRepository = trainerRepository;
    }
    async getOnboardingFunnel() {
        const totalRecords = await this.onboardingRepository.count();
        const deliveryScheduled = await this.onboardingRepository.count({
            where: {},
        });
        return {
            total: totalRecords,
            hardwareDeliveryScheduled: 0,
            hardwareDeliveryCompleted: 0,
            hardwareInstallationScheduled: 0,
            hardwareInstallationCompleted: 0,
            trainingScheduled: 0,
            trainingCompleted: 0,
            fullyCompleted: 0,
        };
    }
    async getSLAPerformance() {
        const totalRecords = await this.onboardingRepository.count();
        const totalBreaches = await this.slaBreachRepository.count();
        return {
            totalRecords,
            onTime: totalRecords - totalBreaches,
            breached: totalBreaches,
            breachRate: totalRecords > 0 ? (totalBreaches / totalRecords) * 100 : 0,
            averageCompletionDays: 0,
        };
    }
    async getTrainerUtilization() {
        const trainers = await this.trainerRepository.find();
        return trainers.map(trainer => ({
            trainerId: trainer.id,
            trainerName: trainer.name,
            totalSlots: 0,
            bookedSlots: 0,
            utilizationRate: 0,
        }));
    }
    async getSegmentPerformance() {
        return [];
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(onboarding_record_entity_1.OnboardingRecord)),
    __param(1, (0, typeorm_1.InjectRepository)(merchant_entity_1.Merchant)),
    __param(2, (0, typeorm_1.InjectRepository)(sla_breach_entity_1.SLABreach)),
    __param(3, (0, typeorm_1.InjectRepository)(training_slot_entity_1.TrainingSlot)),
    __param(4, (0, typeorm_1.InjectRepository)(trainer_entity_1.Trainer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map