import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantsController } from './merchants.controller';
import { MerchantsService } from './merchants.service';
import { Merchant } from '../database/entities/merchant.entity';
import { OnboardingRecord } from '../database/entities/onboarding-record.entity';
import { TrainingSlot } from '../database/entities/training-slot.entity';
import { Holiday } from '../database/entities/holiday.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Merchant,
      OnboardingRecord,
      TrainingSlot,
      Holiday,
    ]),
    SharedModule,
  ],
  controllers: [MerchantsController],
  providers: [MerchantsService],
  exports: [MerchantsService],
})
export class MerchantsModule {}
