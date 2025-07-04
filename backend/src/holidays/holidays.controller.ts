import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HolidaysService } from './holidays.service';
import { Holiday } from '../database/entities/holiday.entity';

@ApiTags('holidays')
@Controller('api/v1/holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Get()
  @ApiOperation({ summary: 'Get all holidays' })
  @ApiResponse({ status: 200, description: 'List of holidays retrieved successfully' })
  async findAll(): Promise<Holiday[]> {
    return this.holidaysService.findAll();
  }

  @Get('working-days')
  @ApiOperation({ summary: 'Get working days in date range' })
  @ApiResponse({ status: 200, description: 'Working days retrieved successfully' })
  async getWorkingDays(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<{ workingDays: Date[] }> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const workingDays = await this.holidaysService.getWorkingDaysInRange(start, end);
    return { workingDays };
  }

  @Get('next-working-day')
  @ApiOperation({ summary: 'Get next working day after given date' })
  @ApiResponse({ status: 200, description: 'Next working day retrieved successfully' })
  async getNextWorkingDay(@Query('date') date: string): Promise<{ nextWorkingDay: Date }> {
    const inputDate = new Date(date);
    const nextWorkingDay = await this.holidaysService.getNextWorkingDay(inputDate);
    return { nextWorkingDay };
  }

  @Get('check/:date')
  @ApiOperation({ summary: 'Check if date is holiday or working day' })
  @ApiResponse({ status: 200, description: 'Date status retrieved successfully' })
  async checkDate(@Param('date') date: string): Promise<{
    date: Date;
    isHoliday: boolean;
    isWorkingDay: boolean;
  }> {
    const inputDate = new Date(date);
    const isHoliday = await this.holidaysService.isHoliday(inputDate);
    const isWorkingDay = await this.holidaysService.isWorkingDay(inputDate);
    
    return {
      date: inputDate,
      isHoliday,
      isWorkingDay,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new holiday' })
  @ApiResponse({ status: 201, description: 'Holiday created successfully' })
  async create(@Body() holidayData: Partial<Holiday>): Promise<Holiday> {
    return this.holidaysService.create(holidayData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a holiday' })
  @ApiResponse({ status: 200, description: 'Holiday updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Holiday>,
  ): Promise<Holiday> {
    return this.holidaysService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a holiday' })
  @ApiResponse({ status: 200, description: 'Holiday deleted successfully' })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.holidaysService.delete(id);
    return { message: 'Holiday deleted successfully' };
  }

  @Get('region/:region')
  @ApiOperation({ summary: 'Get holidays by region' })
  @ApiResponse({ status: 200, description: 'Regional holidays retrieved successfully' })
  async findByRegion(@Param('region') region: string): Promise<Holiday[]> {
    return this.holidaysService.findByRegion(region);
  }

  @Post('seed')
  @ApiOperation({ summary: 'Seed Malaysian holidays' })
  @ApiResponse({ status: 200, description: 'Holidays seeded successfully' })
  async seedHolidays(): Promise<{ message: string }> {
    await this.holidaysService.seedHolidays();
    return { message: 'Malaysian holidays seeded successfully' };
  }
}
