import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OnboardingRecord } from '../database/entities/onboarding-record.entity';
import { Merchant } from '../database/entities/merchant.entity';
import { SLABreach } from '../database/entities/sla-breach.entity';
import { TrainingSlot } from '../database/entities/training-slot.entity';
import { Trainer } from '../database/entities/trainer.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(OnboardingRecord)
    private onboardingRepository: Repository<OnboardingRecord>,
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
    @InjectRepository(SLABreach)
    private slaBreachRepository: Repository<SLABreach>,
    @InjectRepository(TrainingSlot)
    private trainingSlotRepository: Repository<TrainingSlot>,
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  async getOnboardingFunnel(): Promise<any> {
    const totalRecords = await this.onboardingRepository.count();
    
    const deliveryScheduled = await this.onboardingRepository.count({
      where: { 
        // Use a raw query for JSONB path
      },
    });

    // This is a simplified version - full implementation would use complex queries
    return {
      total: totalRecords,
      hardwareDeliveryScheduled: 0,
      hardwareDeliveryCompleted: 0,
      hardwareInstallationScheduled: 0,
      hardwareInstallationCompleted: 0,
      trainingScheduled: 0,
      trainingCompleted: 0,
      fullyCompleted: 0,
    };
  }

  async getSLAPerformance(): Promise<any> {
    const totalRecords = await this.onboardingRepository.count();
    const totalBreaches = await this.slaBreachRepository.count();
    
    return {
      totalRecords,
      onTime: totalRecords - totalBreaches,
      breached: totalBreaches,
      breachRate: totalRecords > 0 ? (totalBreaches / totalRecords) * 100 : 0,
      averageCompletionDays: 0, // Would calculate from actual data
    };
  }

  async getTrainerUtilization(): Promise<any[]> {
    const trainers = await this.trainerRepository.find();
    
    // This would include complex calculations for actual utilization
    return trainers.map(trainer => ({
      trainerId: trainer.id,
      trainerName: trainer.name,
      totalSlots: 0,
      bookedSlots: 0,
      utilizationRate: 0,
    }));
  }

  async getSegmentPerformance(): Promise<any[]> {
    // This would group by segment and calculate performance metrics
    return [];
  }
}
