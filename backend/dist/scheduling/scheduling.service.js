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
exports.SchedulingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const training_slot_entity_1 = require("../database/entities/training-slot.entity");
const trainer_entity_1 = require("../database/entities/trainer.entity");
const training_type_entity_1 = require("../database/entities/training-type.entity");
const holiday_entity_1 = require("../database/entities/holiday.entity");
const date_service_1 = require("../shared/services/date.service");
let SchedulingService = class SchedulingService {
    constructor(trainingSlotRepository, trainerRepository, trainingTypeRepository, holidayRepository, dateService) {
        this.trainingSlotRepository = trainingSlotRepository;
        this.trainerRepository = trainerRepository;
        this.trainingTypeRepository = trainingTypeRepository;
        this.holidayRepository = holidayRepository;
        this.dateService = dateService;
    }
    async createTrainingSlot(data) {
        const trainingSlot = this.trainingSlotRepository.create(data);
        return this.trainingSlotRepository.save(trainingSlot);
    }
    async assignTrainerRoundRobin(language, location, date) {
        const availableTrainers = await this.trainerRepository.find({
            where: {
                status: 'active',
            },
        });
        const filteredTrainers = availableTrainers.filter(trainer => trainer.languages.includes(language) && trainer.locations.includes(location));
        if (filteredTrainers.length === 0) {
            return null;
        }
        filteredTrainers.sort((a, b) => a.assignmentCount - b.assignmentCount);
        const selectedTrainer = filteredTrainers[0];
        selectedTrainer.assignmentCount += 1;
        await this.trainerRepository.save(selectedTrainer);
        return selectedTrainer;
    }
    async getAvailableSlots(date, language) {
        const query = this.trainingSlotRepository
            .createQueryBuilder('slot')
            .leftJoinAndSelect('slot.trainer', 'trainer')
            .leftJoinAndSelect('slot.trainingType', 'trainingType')
            .where('slot.date = :date', { date })
            .andWhere('slot.isBooked = false');
        if (language) {
            query.andWhere('trainer.languages LIKE :language', { language: `%${language}%` });
        }
        return query.getMany();
    }
};
exports.SchedulingService = SchedulingService;
exports.SchedulingService = SchedulingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(training_slot_entity_1.TrainingSlot)),
    __param(1, (0, typeorm_1.InjectRepository)(trainer_entity_1.Trainer)),
    __param(2, (0, typeorm_1.InjectRepository)(training_type_entity_1.TrainingType)),
    __param(3, (0, typeorm_1.InjectRepository)(holiday_entity_1.Holiday)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        date_service_1.DateService])
], SchedulingService);
//# sourceMappingURL=scheduling.service.js.map