import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { OnboardingController } from './controllers/onboarding.controller';
import { PreFillController } from './controllers/pre-fill.controller';
import { OnboardingRecord } from '../database/entities/onboarding-record.entity';
import { Merchant } from '../database/entities/merchant.entity';
import { Trainer } from '../database/entities/trainer.entity';
import { TrainingSlot } from '../database/entities/training-slot.entity';
import { TrainingType } from '../database/entities/training-type.entity';
import { DeliveryLocation } from '../database/entities/delivery-location.entity';
import { Holiday } from '../database/entities/holiday.entity';
import { SystemSettings } from '../database/entities/system-settings.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OnboardingRecord,
      Merchant,
      Trainer,
      TrainingSlot,
      TrainingType,
      DeliveryLocation,
      Holiday,
      SystemSettings,
    ]),
    SharedModule,
  ],
  controllers: [OnboardingController, PreFillController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
