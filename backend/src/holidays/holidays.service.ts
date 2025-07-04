import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from '../database/entities/holiday.entity';

@Injectable()
export class HolidaysService {
  constructor(
    @InjectRepository(Holiday)
    private holidaysRepository: Repository<Holiday>,
  ) {}

  // Malaysian Public Holidays 2024-2025
  private malaysianHolidays = [
    // 2024
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
    
    // 2025
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

  async seedHolidays(): Promise<void> {
    const existingHolidays = await this.holidaysRepository.find();
    
    if (existingHolidays.length === 0) {
      const holidays = this.malaysianHolidays.map(holiday => {
        const newHoliday = new Holiday();
        newHoliday.name = holiday.name;
        newHoliday.date = new Date(holiday.date);
        newHoliday.isRecurring = holiday.isRecurring;
        newHoliday.region = holiday.region || 'Malaysia';
        return newHoliday;
      });
      
      await this.holidaysRepository.save(holidays);
    }
  }

  async findAll(): Promise<Holiday[]> {
    return this.holidaysRepository.find({
      order: { date: 'ASC' },
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Holiday[]> {
    return this.holidaysRepository
      .createQueryBuilder('holiday')
      .where('holiday.date >= :startDate', { startDate })
      .andWhere('holiday.date <= :endDate', { endDate })
      .orderBy('holiday.date', 'ASC')
      .getMany();
  }

  async isHoliday(date: Date): Promise<boolean> {
    const holiday = await this.holidaysRepository.findOne({
      where: { date },
    });
    return !!holiday;
  }

  async isWorkingDay(date: Date): Promise<boolean> {
    // Check if it's a weekend (Saturday = 6, Sunday = 0)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return false;
    }

    // Check if it's a holiday
    const isHoliday = await this.isHoliday(date);
    return !isHoliday;
  }

  async getNextWorkingDay(date: Date): Promise<Date> {
    let nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    while (!(await this.isWorkingDay(nextDay))) {
      nextDay.setDate(nextDay.getDate() + 1);
    }

    return nextDay;
  }

  async getWorkingDaysInRange(startDate: Date, endDate: Date): Promise<Date[]> {
    const workingDays: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (await this.isWorkingDay(currentDate)) {
        workingDays.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return workingDays;
  }

  async create(holidayData: Partial<Holiday>): Promise<Holiday> {
    const holiday = this.holidaysRepository.create(holidayData);
    return this.holidaysRepository.save(holiday);
  }

  async update(id: string, updateData: Partial<Holiday>): Promise<Holiday> {
    await this.holidaysRepository.update(id, updateData);
    return this.holidaysRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.holidaysRepository.delete(id);
  }

  async findByRegion(region: string): Promise<Holiday[]> {
    return this.holidaysRepository.find({
      where: { region },
      order: { date: 'ASC' },
    });
  }
}
