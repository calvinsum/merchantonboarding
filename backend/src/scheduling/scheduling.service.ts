import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingSlot } from '../database/entities/training-slot.entity';
import { Trainer } from '../database/entities/trainer.entity';
import { TrainingType } from '../database/entities/training-type.entity';
import { Holiday } from '../database/entities/holiday.entity';
import { DateService } from '../shared/services/date.service';

@Injectable()
export class SchedulingService {
  constructor(
    @InjectRepository(TrainingSlot)
    private trainingSlotRepository: Repository<TrainingSlot>,
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
    @InjectRepository(TrainingType)
    private trainingTypeRepository: Repository<TrainingType>,
    @InjectRepository(Holiday)
    private holidayRepository: Repository<Holiday>,
    private dateService: DateService,
  ) {}

  async createTrainingSlot(data: Partial<TrainingSlot>): Promise<TrainingSlot> {
    const trainingSlot = this.trainingSlotRepository.create(data);
    return this.trainingSlotRepository.save(trainingSlot);
  }

  async assignTrainerRoundRobin(
    language: string,
    location: string,
    date: Date,
  ): Promise<Trainer | null> {
    const availableTrainers = await this.trainerRepository.find({
      where: {
        status: 'active',
      },
    });

    // Filter by language and location (simplified for now)
    const filteredTrainers = availableTrainers.filter(trainer => 
      trainer.languages.includes(language) && trainer.locations.includes(location)
    );

    if (filteredTrainers.length === 0) {
      return null;
    }

    // Sort by assignment count (round-robin)
    filteredTrainers.sort((a, b) => a.assignmentCount - b.assignmentCount);
    
    const selectedTrainer = filteredTrainers[0];
    selectedTrainer.assignmentCount += 1;
    
    await this.trainerRepository.save(selectedTrainer);
    
    return selectedTrainer;
  }

  async getAvailableSlots(date: Date, language?: string): Promise<TrainingSlot[]> {
    const query = this.trainingSlotRepository
      .createQueryBuilder('slot')
      .leftJoinAndSelect('slot.trainer', 'trainer')
      .leftJoinAndSelect('slot.trainingType', 'trainingType')
      .where('slot.date = :date', { date })
      .andWhere('slot.isBooked = false');

    if (language) {
      // Note: This is a simplified query - for production you'd need proper JSON/array queries
      query.andWhere('trainer.languages LIKE :language', { language: `%${language}%` });
    }

    return query.getMany();
  }
}
