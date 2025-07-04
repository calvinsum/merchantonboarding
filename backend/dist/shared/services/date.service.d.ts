export declare class DateService {
    addWorkingDays(startDate: Date, days: number, holidays?: Date[]): Date;
    isHoliday(date: Date, holidays: Date[]): boolean;
    isWorkingDay(date: Date, holidays?: Date[]): boolean;
    getWorkingDaysBetween(startDate: Date, endDate: Date, holidays?: Date[]): number;
    getNextWorkingDay(date: Date, holidays?: Date[]): Date;
    formatDate(date: Date, formatString?: string): string;
    parseDate(dateString: string): Date;
    isWithinBusinessHours(date: Date, startTime?: string, endTime?: string): boolean;
    getSLADate(startDate: Date, onboardingType: string, holidays?: Date[]): Date;
}
