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
exports.MerchantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const merchant_entity_1 = require("../database/entities/merchant.entity");
const onboarding_record_entity_1 = require("../database/entities/onboarding-record.entity");
const training_slot_entity_1 = require("../database/entities/training-slot.entity");
const holiday_entity_1 = require("../database/entities/holiday.entity");
const date_service_1 = require("../shared/services/date.service");
const validation_service_1 = require("../shared/services/validation.service");
let MerchantsService = class MerchantsService {
    constructor(merchantRepository, onboardingRepository, trainingSlotRepository, holidayRepository, dateService, validationService) {
        this.merchantRepository = merchantRepository;
        this.onboardingRepository = onboardingRepository;
        this.trainingSlotRepository = trainingSlotRepository;
        this.holidayRepository = holidayRepository;
        this.dateService = dateService;
        this.validationService = validationService;
    }
    async getOnboardingDetails(merchantId) {
        const merchant = await this.merchantRepository.findOne({
            where: { id: merchantId },
        });
        if (!merchant) {
            throw new common_1.NotFoundException('Merchant not found');
        }
        const onboardingRecord = await this.onboardingRepository.findOne({
            where: { merchantId },
            relations: ['slaBreaches'],
        });
        if (!onboardingRecord) {
            throw new common_1.NotFoundException('Onboarding record not found');
        }
        return {
            merchant,
            onboarding: onboardingRecord,
        };
    }
    async getAvailableDeliveryDates(merchantId) {
        const merchant = await this.merchantRepository.findOne({
            where: { id: merchantId },
        });
        if (!merchant) {
            throw new common_1.NotFoundException('Merchant not found');
        }
        const holidays = await this.holidayRepository.find();
        const holidayDates = holidays.map(h => h.date);
        const startDate = new Date();
        const availableDates = [];
        for (let i = 0; i < 30; i++) {
            const date = this.dateService.addWorkingDays(startDate, i + 1, holidayDates);
            availableDates.push(date);
        }
        return availableDates;
    }
    async getAvailableInstallationDates(merchantId) {
        const onboardingRecord = await this.onboardingRepository.findOne({
            where: { merchantId },
        });
        if (!onboardingRecord) {
            throw new common_1.NotFoundException('Onboarding record not found');
        }
        const deliveryDate = onboardingRecord.progress.hardwareDelivery.scheduledDate;
        if (!deliveryDate) {
            throw new common_1.BadRequestException('Hardware delivery must be scheduled first');
        }
        const holidays = await this.holidayRepository.find();
        const holidayDates = holidays.map(h => h.date);
        const startDate = this.dateService.addWorkingDays(deliveryDate, 1, holidayDates);
        const availableDates = [];
        for (let i = 0; i < 20; i++) {
            const date = this.dateService.addWorkingDays(startDate, i, holidayDates);
            availableDates.push(date);
        }
        return availableDates;
    }
    async getAvailableTrainingSlots(merchantId) {
        const merchant = await this.merchantRepository.findOne({
            where: { id: merchantId },
        });
        if (!merchant) {
            throw new common_1.NotFoundException('Merchant not found');
        }
        const onboardingRecord = await this.onboardingRepository.findOne({
            where: { merchantId },
        });
        if (!onboardingRecord) {
            throw new common_1.NotFoundException('Onboarding record not found');
        }
        const installationDate = onboardingRecord.progress.hardwareInstallation.scheduledDate;
        if (!installationDate) {
            throw new common_1.BadRequestException('Hardware installation must be scheduled first');
        }
        const startDate = this.dateService.addWorkingDays(installationDate, 1);
        const availableSlots = await this.trainingSlotRepository.find({
            where: {
                date: startDate,
                isBooked: false,
            },
            relations: ['trainer', 'trainingType'],
        });
        const filteredSlots = availableSlots.filter(slot => slot.trainer.languages.includes(merchant.preferredLanguage));
        return filteredSlots;
    }
    async scheduleAppointment(merchantId, scheduleDto) {
        const onboardingRecord = await this.onboardingRepository.findOne({
            where: { merchantId },
        });
        if (!onboardingRecord) {
            throw new common_1.NotFoundException('Onboarding record not found');
        }
        const { type, date, slotId, notes } = scheduleDto;
        const validation = this.validationService.validateSchedulingConstraints({
            type,
            date,
            deliveryDate: onboardingRecord.progress.hardwareDelivery.scheduledDate,
            installationDate: onboardingRecord.progress.hardwareInstallation.scheduledDate,
        });
        if (!validation.valid) {
            throw new common_1.BadRequestException(validation.error);
        }
        const progress = { ...onboardingRecord.progress };
        if (type === 'hardware_delivery') {
            progress.hardwareDelivery = {
                ...progress.hardwareDelivery,
                status: 'scheduled',
                scheduledDate: date,
                notes,
            };
        }
        else if (type === 'hardware_installation') {
            progress.hardwareInstallation = {
                ...progress.hardwareInstallation,
                status: 'scheduled',
                scheduledDate: date,
                notes,
            };
        }
        else if (type === 'training' && slotId) {
            const trainingSlot = await this.trainingSlotRepository.findOne({
                where: { id: slotId },
            });
            if (!trainingSlot) {
                throw new common_1.BadRequestException('Training slot not found');
            }
            if (trainingSlot.isBooked) {
                throw new common_1.BadRequestException('Training slot is already booked');
            }
            trainingSlot.isBooked = true;
            trainingSlot.onboardingId = onboardingRecord.id;
            trainingSlot.bookedParticipants += 1;
            await this.trainingSlotRepository.save(trainingSlot);
            progress.training = {
                ...progress.training,
                status: 'scheduled',
                scheduledDate: trainingSlot.date,
                notes,
            };
        }
        onboardingRecord.progress = progress;
        onboardingRecord.status = 'in_progress';
        await this.onboardingRepository.save(onboardingRecord);
        return {
            message: 'Appointment scheduled successfully',
            onboarding: onboardingRecord,
        };
    }
    async getMerchantProgress(merchantId) {
        const onboardingRecord = await this.onboardingRepository.findOne({
            where: { merchantId },
            relations: ['merchant', 'slaBreaches'],
        });
        if (!onboardingRecord) {
            throw new common_1.NotFoundException('Onboarding record not found');
        }
        const progress = onboardingRecord.progress;
        const now = new Date();
        let completedSteps = 0;
        let totalSteps = 0;
        Object.values(progress).forEach(step => {
            totalSteps++;
            if (step.status === 'completed') {
                completedSteps++;
            }
        });
        const completionPercentage = Math.round((completedSteps / totalSteps) * 100);
        const slaRisks = Object.entries(progress).map(([key, step]) => {
            if (step.status !== 'completed' && step.slaDate) {
                const daysUntilSLA = Math.ceil((step.slaDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                return {
                    type: key,
                    daysUntilSLA,
                    isAtRisk: daysUntilSLA <= 2,
                    isBreached: daysUntilSLA < 0,
                };
            }
            return null;
        }).filter(Boolean);
        return {
            merchant: onboardingRecord.merchant,
            progress: onboardingRecord.progress,
            completionPercentage,
            slaRisks,
            slaBreaches: onboardingRecord.slaBreaches,
            nextSteps: this.getNextSteps(progress),
        };
    }
    getNextSteps(progress) {
        const steps = [];
        if (progress.hardwareDelivery.status === 'pending') {
            steps.push('Schedule hardware delivery');
        }
        if (progress.hardwareDelivery.status === 'completed' &&
            progress.hardwareInstallation.status === 'pending') {
            steps.push('Schedule hardware installation');
        }
        if (progress.hardwareInstallation.status === 'completed' &&
            progress.training.status === 'pending') {
            steps.push('Schedule training session');
        }
        if (steps.length === 0) {
            steps.push('All steps completed! Welcome to StoreHub!');
        }
        return steps;
    }
};
exports.MerchantsService = MerchantsService;
exports.MerchantsService = MerchantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(merchant_entity_1.Merchant)),
    __param(1, (0, typeorm_1.InjectRepository)(onboarding_record_entity_1.OnboardingRecord)),
    __param(2, (0, typeorm_1.InjectRepository)(training_slot_entity_1.TrainingSlot)),
    __param(3, (0, typeorm_1.InjectRepository)(holiday_entity_1.Holiday)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        date_service_1.DateService,
        validation_service_1.ValidationService])
], MerchantsService);
//# sourceMappingURL=merchants.service.js.map