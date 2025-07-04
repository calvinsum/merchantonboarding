import { Repository } from 'typeorm';
import { Holiday } from '../database/entities/holiday.entity';
export declare class HolidaysService {
    private holidaysRepository;
    constructor(holidaysRepository: Repository<Holiday>);
    private malaysianHolidays;
    seedHolidays(): Promise<void>;
    findAll(): Promise<Holiday[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Holiday[]>;
    isHoliday(date: Date): Promise<boolean>;
    isWorkingDay(date: Date): Promise<boolean>;
    getNextWorkingDay(date: Date): Promise<Date>;
    getWorkingDaysInRange(startDate: Date, endDate: Date): Promise<Date[]>;
    create(holidayData: Partial<Holiday>): Promise<Holiday>;
    update(id: string, updateData: Partial<Holiday>): Promise<Holiday>;
    delete(id: string): Promise<void>;
    findByRegion(region: string): Promise<Holiday[]>;
}
