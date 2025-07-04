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
exports.HolidaysService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const holiday_entity_1 = require("../database/entities/holiday.entity");
let HolidaysService = class HolidaysService {
    constructor(holidaysRepository) {
        this.holidaysRepository = holidaysRepository;
        this.malaysianHolidays = [
            { name: 'New Year\'s Day', date: '2024-01-01', isRecurring: true },
            { name: 'Chinese New Year', date: '2024-02-10', isRecurring: false },
            { name: 'Chinese New Year (2nd Day)', date: '2024-02-11', isRecurring: false },
            { name: 'Federal Territory Day', date: '2024-02-01', isRecurring: true, region: 'Federal Territory' },
            { name: 'Labour Day', date: '2024-05-01', isRecurring: true },
            { name: 'Wesak Day', date: '2024-05-22', isRecurring: false },
            { name: 'Yang di-Pertuan Agong\'s Birthday', date: '2024-06-03', isRecurring: false },
            { name: 'Hari Raya Aidilfitri', date: '2024-04-10', isRecurring: false },
            { name: 'Hari Raya Aidilfitri (2nd Day)', date: '2024-04-11', isRecurring: false },
            { name: 'Hari Raya Haji', date: '2024-06-17', isRecurring: false },
            { name: 'Merdeka Day', date: '2024-08-31', isRecurring: true },
            { name: 'Malaysia Day', date: '2024-09-16', isRecurring: true },
            { name: 'Deepavali', date: '2024-10-31', isRecurring: false },
            { name: 'Christmas Day', date: '2024-12-25', isRecurring: true },
            { name: 'New Year\'s Day', date: '2025-01-01', isRecurring: true },
            { name: 'Chinese New Year', date: '2025-01-29', isRecurring: false },
            { name: 'Chinese New Year (2nd Day)', date: '2025-01-30', isRecurring: false },
            { name: 'Federal Territory Day', date: '2025-02-01', isRecurring: true, region: 'Federal Territory' },
            { name: 'Labour Day', date: '2025-05-01', isRecurring: true },
            { name: 'Wesak Day', date: '2025-05-12', isRecurring: false },
            { name: 'Yang di-Pertuan Agong\'s Birthday', date: '2025-06-02', isRecurring: false },
            { name: 'Hari Raya Aidilfitri', date: '2025-03-31', isRecurring: false },
            { name: 'Hari Raya Aidilfitri (2nd Day)', date: '2025-04-01', isRecurring: false },
            { name: 'Hari Raya Haji', date: '2025-06-07', isRecurring: false },
            { name: 'Merdeka Day', date: '2025-08-31', isRecurring: true },
            { name: 'Malaysia Day', date: '2025-09-16', isRecurring: true },
            { name: 'Deepavali', date: '2025-11-01', isRecurring: false },
            { name: 'Christmas Day', date: '2025-12-25', isRecurring: true },
        ];
    }
    async seedHolidays() {
        const existingHolidays = await this.holidaysRepository.find();
        if (existingHolidays.length === 0) {
            const holidays = this.malaysianHolidays.map(holiday => {
                const newHoliday = new holiday_entity_1.Holiday();
                newHoliday.name = holiday.name;
                newHoliday.date = new Date(holiday.date);
                newHoliday.isRecurring = holiday.isRecurring;
                newHoliday.region = holiday.region || 'Malaysia';
                return newHoliday;
            });
            await this.holidaysRepository.save(holidays);
        }
    }
    async findAll() {
        return this.holidaysRepository.find({
            order: { date: 'ASC' },
        });
    }
    async findByDateRange(startDate, endDate) {
        return this.holidaysRepository
            .createQueryBuilder('holiday')
            .where('holiday.date >= :startDate', { startDate })
            .andWhere('holiday.date <= :endDate', { endDate })
            .orderBy('holiday.date', 'ASC')
            .getMany();
    }
    async isHoliday(date) {
        const holiday = await this.holidaysRepository.findOne({
            where: { date },
        });
        return !!holiday;
    }
    async isWorkingDay(date) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return false;
        }
        const isHoliday = await this.isHoliday(date);
        return !isHoliday;
    }
    async getNextWorkingDay(date) {
        let nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        while (!(await this.isWorkingDay(nextDay))) {
            nextDay.setDate(nextDay.getDate() + 1);
        }
        return nextDay;
    }
    async getWorkingDaysInRange(startDate, endDate) {
        const workingDays = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            if (await this.isWorkingDay(currentDate)) {
                workingDays.push(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return workingDays;
    }
    async create(holidayData) {
        const holiday = this.holidaysRepository.create(holidayData);
        return this.holidaysRepository.save(holiday);
    }
    async update(id, updateData) {
        await this.holidaysRepository.update(id, updateData);
        return this.holidaysRepository.findOne({ where: { id } });
    }
    async delete(id) {
        await this.holidaysRepository.delete(id);
    }
    async findByRegion(region) {
        return this.holidaysRepository.find({
            where: { region },
            order: { date: 'ASC' },
        });
    }
};
exports.HolidaysService = HolidaysService;
exports.HolidaysService = HolidaysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(holiday_entity_1.Holiday)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HolidaysService);
//# sourceMappingURL=holidays.service.js.map