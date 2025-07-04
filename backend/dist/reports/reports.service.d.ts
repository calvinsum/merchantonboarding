import { Repository } from 'typeorm';
import { OnboardingRecord } from '../database/entities/onboarding-record.entity';
import { Merchant } from '../database/entities/merchant.entity';
import { SLABreach } from '../database/entities/sla-breach.entity';
import { TrainingSlot } from '../database/entities/training-slot.entity';
import { Trainer } from '../database/entities/trainer.entity';
export declare class ReportsService {
    private onboardingRepository;
    private merchantRepository;
    private slaBreachRepository;
    private trainingSlotRepository;
    private trainerRepository;
    constructor(onboardingRepository: Repository<OnboardingRecord>, merchantRepository: Repository<Merchant>, slaBreachRepository: Repository<SLABreach>, trainingSlotRepository: Repository<TrainingSlot>, trainerRepository: Repository<Trainer>);
    getOnboardingFunnel(): Promise<any>;
    getSLAPerformance(): Promise<any>;
    getTrainerUtilization(): Promise<any[]>;
    getSegmentPerformance(): Promise<any[]>;
}
