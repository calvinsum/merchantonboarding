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
exports.HolidaysController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const holidays_service_1 = require("./holidays.service");
let HolidaysController = class HolidaysController {
    constructor(holidaysService) {
        this.holidaysService = holidaysService;
    }
    async findAll() {
        return this.holidaysService.findAll();
    }
    async getWorkingDays(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const workingDays = await this.holidaysService.getWorkingDaysInRange(start, end);
        return { workingDays };
    }
    async getNextWorkingDay(date) {
        const inputDate = new Date(date);
        const nextWorkingDay = await this.holidaysService.getNextWorkingDay(inputDate);
        return { nextWorkingDay };
    }
    async checkDate(date) {
        const inputDate = new Date(date);
        const isHoliday = await this.holidaysService.isHoliday(inputDate);
        const isWorkingDay = await this.holidaysService.isWorkingDay(inputDate);
        return {
            date: inputDate,
            isHoliday,
            isWorkingDay,
        };
    }
    async create(holidayData) {
        return this.holidaysService.create(holidayData);
    }
    async update(id, updateData) {
        return this.holidaysService.update(id, updateData);
    }
    async delete(id) {
        await this.holidaysService.delete(id);
        return { message: 'Holiday deleted successfully' };
    }
    async findByRegion(region) {
        return this.holidaysService.findByRegion(region);
    }
    async seedHolidays() {
        await this.holidaysService.seedHolidays();
        return { message: 'Malaysian holidays seeded successfully' };
    }
};
exports.HolidaysController = HolidaysController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all holidays' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of holidays retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('working-days'),
    (0, swagger_1.ApiOperation)({ summary: 'Get working days in date range' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Working days retrieved successfully' }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "getWorkingDays", null);
__decorate([
    (0, common_1.Get)('next-working-day'),
    (0, swagger_1.ApiOperation)({ summary: 'Get next working day after given date' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Next working day retrieved successfully' }),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "getNextWorkingDay", null);
__decorate([
    (0, common_1.Get)('check/:date'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if date is holiday or working day' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Date status retrieved successfully' }),
    __param(0, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "checkDate", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new holiday' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Holiday created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a holiday' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Holiday updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a holiday' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Holiday deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('region/:region'),
    (0, swagger_1.ApiOperation)({ summary: 'Get holidays by region' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Regional holidays retrieved successfully' }),
    __param(0, (0, common_1.Param)('region')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "findByRegion", null);
__decorate([
    (0, common_1.Post)('seed'),
    (0, swagger_1.ApiOperation)({ summary: 'Seed Malaysian holidays' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Holidays seeded successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HolidaysController.prototype, "seedHolidays", null);
exports.HolidaysController = HolidaysController = __decorate([
    (0, swagger_1.ApiTags)('holidays'),
    (0, common_1.Controller)('api/v1/holidays'),
    __metadata("design:paramtypes", [holidays_service_1.HolidaysService])
], HolidaysController);
//# sourceMappingURL=holidays.controller.js.map