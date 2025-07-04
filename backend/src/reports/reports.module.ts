import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { OnboardingRecord } from '../database/entities/onboarding-record.entity';
import { Merchant } from '../database/entities/merchant.entity';
import { SLABreach } from '../database/entities/sla-breach.entity';
import { TrainingSlot } from '../database/entities/training-slot.entity';
import { Trainer } from '../database/entities/trainer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OnboardingRecord,
      Merchant,
      SLABreach,
      TrainingSlot,
      Trainer,
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
