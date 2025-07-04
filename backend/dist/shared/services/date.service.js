"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
let DateService = class DateService {
    addWorkingDays(startDate, days, holidays = []) {
        let currentDate = new Date(startDate);
        let addedDays = 0;
        while (addedDays < days) {
            currentDate = (0, date_fns_1.addDays)(currentDate, 1);
            if (!(0, date_fns_1.isWeekend)(currentDate) && !this.isHoliday(currentDate, holidays)) {
                addedDays++;
            }
        }
        return currentDate;
    }
    isHoliday(date, holidays) {
        return holidays.some(holiday => (0, date_fns_1.isSameDay)(date, holiday));
    }
    isWorkingDay(date, holidays = []) {
        return !(0, date_fns_1.isWeekend)(date) && !this.isHoliday(date, holidays);
    }
    getWorkingDaysBetween(startDate, endDate, holidays = []) {
        let workingDays = 0;
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            if (this.isWorkingDay(currentDate, holidays)) {
                workingDays++;
            }
            currentDate = (0, date_fns_1.addDays)(currentDate, 1);
        }
        return workingDays;
    }
    getNextWorkingDay(date, holidays = []) {
        let nextDay = (0, date_fns_1.addDays)(date, 1);
        while (!this.isWorkingDay(nextDay, holidays)) {
            nextDay = (0, date_fns_1.addDays)(nextDay, 1);
        }
        return nextDay;
    }
    formatDate(date, formatString = 'dd MMM yyyy') {
        return (0, date_fns_1.format)(date, formatString);
    }
    parseDate(dateString) {
        return (0, date_fns_1.parseISO)(dateString);
    }
    isWithinBusinessHours(date, startTime = '09:00', endTime = '18:00') {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const currentTime = hours * 60 + minutes;
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        const startMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;
        return currentTime >= startMinutes && currentTime <= endMinutes;
    }
    getSLADate(startDate, onboardingType, holidays = []) {
        const slaConfig = {
            hardware_delivery: 7,
            hardware_installation: 3,
            training: 5,
        };
        const days = slaConfig[onboardingType] || 7;
        return this.addWorkingDays(startDate, days, holidays);
    }
};
exports.DateService = DateService;
exports.DateService = DateService = __decorate([
    (0, common_1.Injectable)()
], DateService);
//# sourceMappingURL=date.service.js.map