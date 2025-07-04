import { Repository } from 'typeorm';
import { OnboardingRecord } from '../database/entities/onboarding-record.entity';
import { Merchant } from '../database/entities/merchant.entity';
import { Trainer } from '../database/entities/trainer.entity';
import { TrainingSlot } from '../database/entities/training-slot.entity';
import { TrainingType } from '../database/entities/training-type.entity';
import { DeliveryLocation } from '../database/entities/delivery-location.entity';
import { Holiday } from '../database/entities/holiday.entity';
import { SystemSettings } from '../database/entities/system-settings.entity';
import { PreFillFormDto } from './dto/pre-fill-form.dto';
import { MerchantLinkResponseDto } from './dto/merchant-link-response.dto';
import { CryptoService } from '../shared/services/crypto.service';
import { DateService } from '../shared/services/date.service';
export declare class AdminService {
    private onboardingRepository;
    private merchantRepository;
    private trainerRepository;
    private trainingSlotRepository;
    private trainingTypeRepository;
    private deliveryLocationRepository;
    private holidayRepository;
    private systemSettingsRepository;
    private cryptoService;
    private dateService;
    constructor(onboardingRepository: Repository<OnboardingRecord>, merchantRepository: Repository<Merchant>, trainerRepository: Repository<Trainer>, trainingSlotRepository: Repository<TrainingSlot>, trainingTypeRepository: Repository<TrainingType>, deliveryLocationRepository: Repository<DeliveryLocation>, holidayRepository: Repository<Holiday>, systemSettingsRepository: Repository<SystemSettings>, cryptoService: CryptoService, dateService: DateService);
    getAllOnboardingRecords(): Promise<OnboardingRecord[]>;
    getOnboardingById(id: string): Promise<OnboardingRecord>;
    createOnboardingRecord(data: Partial<OnboardingRecord>): Promise<OnboardingRecord>;
    updateOnboardingRecord(id: string, data: Partial<OnboardingRecord>): Promise<OnboardingRecord>;
    createMerchantFromPreFill(preFillData: PreFillFormDto): Promise<MerchantLinkResponseDto>;
    generateMerchantLoginLink(merchantId: string): Promise<MerchantLinkResponseDto>;
    verifyMerchantToken(token: string): Promise<{
        valid: boolean;
        merchantId?: string;
    }>;
}
