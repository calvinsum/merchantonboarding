import { Repository } from 'typeorm';
import { Merchant } from '../database/entities/merchant.entity';
import { OnboardingRecord } from '../database/entities/onboarding-record.entity';
import { TrainingSlot } from '../database/entities/training-slot.entity';
import { Holiday } from '../database/entities/holiday.entity';
import { DateService } from '../shared/services/date.service';
import { ValidationService } from '../shared/services/validation.service';
import { ScheduleAppointmentDto } from './dto';
export declare class MerchantsService {
    private merchantRepository;
    private onboardingRepository;
    private trainingSlotRepository;
    private holidayRepository;
    private dateService;
    private validationService;
    constructor(merchantRepository: Repository<Merchant>, onboardingRepository: Repository<OnboardingRecord>, trainingSlotRepository: Repository<TrainingSlot>, holidayRepository: Repository<Holiday>, dateService: DateService, validationService: ValidationService);
    getOnboardingDetails(merchantId: string): Promise<any>;
    getAvailableDeliveryDates(merchantId: string): Promise<Date[]>;
    getAvailableInstallationDates(merchantId: string): Promise<Date[]>;
    getAvailableTrainingSlots(merchantId: string): Promise<TrainingSlot[]>;
    scheduleAppointment(merchantId: string, scheduleDto: ScheduleAppointmentDto): Promise<any>;
    getMerchantProgress(merchantId: string): Promise<any>;
    private getNextSteps;
}
