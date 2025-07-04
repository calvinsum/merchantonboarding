import { MerchantsService } from './merchants.service';
import { ScheduleAppointmentDto } from './dto';
export declare class MerchantsController {
    private merchantsService;
    constructor(merchantsService: MerchantsService);
    getOnboardingDetails(merchantId: string): Promise<any>;
    getMerchantProgress(merchantId: string): Promise<any>;
    getAvailableDeliveryDates(merchantId: string): Promise<Date[]>;
    getAvailableInstallationDates(merchantId: string): Promise<Date[]>;
    getAvailableTrainingSlots(merchantId: string): Promise<import("../database/entities").TrainingSlot[]>;
    scheduleAppointment(merchantId: string, scheduleDto: ScheduleAppointmentDto): Promise<any>;
}
