import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulingService } from './scheduling.service';
import { TrainingSlot } from '../database/entities/training-slot.entity';
import { Trainer } from '../database/entities/trainer.entity';
import { TrainingType } from '../database/entities/training-type.entity';
import { Holiday } from '../database/entities/holiday.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingSlot, Trainer, TrainingType, Holiday]),
    SharedModule,
  ],
  providers: [SchedulingService],
  exports: [SchedulingService],
})
export class SchedulingModule {}
