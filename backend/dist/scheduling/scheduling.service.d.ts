import { Repository } from 'typeorm';
import { TrainingSlot } from '../database/entities/training-slot.entity';
import { Trainer } from '../database/entities/trainer.entity';
import { TrainingType } from '../database/entities/training-type.entity';
import { Holiday } from '../database/entities/holiday.entity';
import { DateService } from '../shared/services/date.service';
export declare class SchedulingService {
    private trainingSlotRepository;
    private trainerRepository;
    private trainingTypeRepository;
    private holidayRepository;
    private dateService;
    constructor(trainingSlotRepository: Repository<TrainingSlot>, trainerRepository: Repository<Trainer>, trainingTypeRepository: Repository<TrainingType>, holidayRepository: Repository<Holiday>, dateService: DateService);
    createTrainingSlot(data: Partial<TrainingSlot>): Promise<TrainingSlot>;
    assignTrainerRoundRobin(language: string, location: string, date: Date): Promise<Trainer | null>;
    getAvailableSlots(date: Date, language?: string): Promise<TrainingSlot[]>;
}
