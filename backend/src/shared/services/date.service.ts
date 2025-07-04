import { Injectable } from '@nestjs/common';
import { addDays, isWeekend, isSameDay, parseISO, format } from 'date-fns';

@Injectable()
export class DateService {
  /**
   * Add working days to a date, excluding weekends and holidays
   */
  addWorkingDays(
    startDate: Date,
    days: number,
    holidays: Date[] = [],
  ): Date {
    let currentDate = new Date(startDate);
    let addedDays = 0;

    while (addedDays < days) {
      currentDate = addDays(currentDate, 1);
      
      // Skip weekends and holidays
      if (!isWeekend(currentDate) && !this.isHoliday(currentDate, holidays)) {
        addedDays++;
      }
    }

    return currentDate;
  }

  /**
   * Check if a date is a holiday
   */
  isHoliday(date: Date, holidays: Date[]): boolean {
    return holidays.some(holiday => isSameDay(date, holiday));
  }

  /**
   * Check if a date is a working day
   */
  isWorkingDay(date: Date, holidays: Date[] = []): boolean {
    return !isWeekend(date) && !this.isHoliday(date, holidays);
  }

  /**
   * Calculate working days between two dates
   */
  getWorkingDaysBetween(
    startDate: Date,
    endDate: Date,
    holidays: Date[] = [],
  ): number {
    let workingDays = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (this.isWorkingDay(currentDate, holidays)) {
        workingDays++;
      }
      currentDate = addDays(currentDate, 1);
    }

    return workingDays;
  }

  /**
   * Get the next working day after a given date
   */
  getNextWorkingDay(date: Date, holidays: Date[] = []): Date {
    let nextDay = addDays(date, 1);
    
    while (!this.isWorkingDay(nextDay, holidays)) {
      nextDay = addDays(nextDay, 1);
    }

    return nextDay;
  }

  /**
   * Format date for display
   */
  formatDate(date: Date, formatString: string = 'dd MMM yyyy'): string {
    return format(date, formatString);
  }

  /**
   * Parse date from string
   */
  parseDate(dateString: string): Date {
    return parseISO(dateString);
  }

  /**
   * Check if a date is within business hours
   */
  isWithinBusinessHours(
    date: Date,
    startTime: string = '09:00',
    endTime: string = '18:00',
  ): boolean {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const currentTime = hours * 60 + minutes;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    return currentTime >= startMinutes && currentTime <= endMinutes;
  }

  /**
   * Get SLA date based on onboarding type
   */
  getSLADate(
    startDate: Date,
    onboardingType: string,
    holidays: Date[] = [],
  ): Date {
    const slaConfig = {
      hardware_delivery: 7,
      hardware_installation: 3,
      training: 5,
    };

    const days = slaConfig[onboardingType] || 7;
    return this.addWorkingDays(startDate, days, holidays);
  }
}
