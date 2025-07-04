import { HolidaysService } from './holidays.service';
import { Holiday } from '../database/entities/holiday.entity';
export declare class HolidaysController {
    private readonly holidaysService;
    constructor(holidaysService: HolidaysService);
    findAll(): Promise<Holiday[]>;
    getWorkingDays(startDate: string, endDate: string): Promise<{
        workingDays: Date[];
    }>;
    getNextWorkingDay(date: string): Promise<{
        nextWorkingDay: Date;
    }>;
    checkDate(date: string): Promise<{
        date: Date;
        isHoliday: boolean;
        isWorkingDay: boolean;
    }>;
    create(holidayData: Partial<Holiday>): Promise<Holiday>;
    update(id: string, updateData: Partial<Holiday>): Promise<Holiday>;
    delete(id: string): Promise<{
        message: string;
    }>;
    findByRegion(region: string): Promise<Holiday[]>;
    seedHolidays(): Promise<{
        message: string;
    }>;
}
