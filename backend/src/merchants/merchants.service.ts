import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from '../database/entities/merchant.entity';
import { OnboardingRecord } from '../database/entities/onboarding-record.entity';
import { TrainingSlot } from '../database/entities/training-slot.entity';
import { Holiday } from '../database/entities/holiday.entity';
import { DateService } from '../shared/services/date.service';
import { ValidationService } from '../shared/services/validation.service';
import { ScheduleAppointmentDto } from './dto';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
    @InjectRepository(OnboardingRecord)
    private onboardingRepository: Repository<OnboardingRecord>,
    @InjectRepository(TrainingSlot)
    private trainingSlotRepository: Repository<TrainingSlot>,
    @InjectRepository(Holiday)
    private holidayRepository: Repository<Holiday>,
    private dateService: DateService,
    private validationService: ValidationService,
  ) {}

  /**
   * Get merchant onboarding details
   */
  async getOnboardingDetails(merchantId: string): Promise<any> {
    const merchant = await this.merchantRepository.findOne({
      where: { id: merchantId },
    });

    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    const onboardingRecord = await this.onboardingRepository.findOne({
      where: { merchantId },
      relations: ['slaBreaches'],
    });

    if (!onboardingRecord) {
      throw new NotFoundException('Onboarding record not found');
    }

    return {
      merchant,
      onboarding: onboardingRecord,
    };
  }

  /**
   * Get available delivery dates
   */
  async getAvailableDeliveryDates(merchantId: string): Promise<Date[]> {
    const merchant = await this.merchantRepository.findOne({
      where: { id: merchantId },
    });

    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    const holidays = await this.holidayRepository.find();
    const holidayDates = holidays.map(h => h.date);

    const startDate = new Date();
    const availableDates: Date[] = [];

    // Generate next 30 working days
    for (let i = 0; i < 30; i++) {
      const date = this.dateService.addWorkingDays(startDate, i + 1, holidayDates);
      availableDates.push(date);
    }

    return availableDates;
  }

  /**
   * Get available installation dates
   */
  async getAvailableInstallationDates(merchantId: string): Promise<Date[]> {
    const onboardingRecord = await this.onboardingRepository.findOne({
      where: { merchantId },
    });

    if (!onboardingRecord) {
      throw new NotFoundException('Onboarding record not found');
    }

    const deliveryDate = onboardingRecord.progress.hardwareDelivery.scheduledDate;
    if (!deliveryDate) {
      throw new BadRequestException('Hardware delivery must be scheduled first');
    }

    const holidays = await this.holidayRepository.find();
    const holidayDates = holidays.map(h => h.date);

    const startDate = this.dateService.addWorkingDays(deliveryDate, 1, holidayDates);
    const availableDates: Date[] = [];

    // Generate next 20 working days after delivery
    for (let i = 0; i < 20; i++) {
      const date = this.dateService.addWorkingDays(startDate, i, holidayDates);
      availableDates.push(date);
    }

    return availableDates;
  }

  /**
   * Get available training slots
   */
  async getAvailableTrainingSlots(merchantId: string): Promise<TrainingSlot[]> {
    const merchant = await this.merchantRepository.findOne({
      where: { id: merchantId },
    });

    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    const onboardingRecord = await this.onboardingRepository.findOne({
      where: { merchantId },
    });

    if (!onboardingRecord) {
      throw new NotFoundException('Onboarding record not found');
    }

    const installationDate = onboardingRecord.progress.hardwareInstallation.scheduledDate;
    if (!installationDate) {
      throw new BadRequestException('Hardware installation must be scheduled first');
    }

    const startDate = this.dateService.addWorkingDays(installationDate, 1);

    const availableSlots = await this.trainingSlotRepository.find({
      where: {
        date: startDate,
        isBooked: false,
      },
      relations: ['trainer', 'trainingType'],
    });

    // Filter by merchant's preferred language
    const filteredSlots = availableSlots.filter(slot => 
      slot.trainer.languages.includes(merchant.preferredLanguage)
    );

    return filteredSlots;
  }

  /**
   * Schedule appointment
   */
  async scheduleAppointment(
    merchantId: string,
    scheduleDto: ScheduleAppointmentDto,
  ): Promise<any> {
    const onboardingRecord = await this.onboardingRepository.findOne({
      where: { merchantId },
    });

    if (!onboardingRecord) {
      throw new NotFoundException('Onboarding record not found');
    }

    const { type, date, slotId, notes } = scheduleDto;

    // Validate scheduling constraints
    const validation = this.validationService.validateSchedulingConstraints({
      type,
      date,
      deliveryDate: onboardingRecord.progress.hardwareDelivery.scheduledDate,
      installationDate: onboardingRecord.progress.hardwareInstallation.scheduledDate,
    });

    if (!validation.valid) {
      throw new BadRequestException(validation.error);
    }

    // Update progress
    const progress = { ...onboardingRecord.progress };
    
    if (type === 'hardware_delivery') {
      progress.hardwareDelivery = {
        ...progress.hardwareDelivery,
        status: 'scheduled',
        scheduledDate: date,
        notes,
      };
    } else if (type === 'hardware_installation') {
      progress.hardwareInstallation = {
        ...progress.hardwareInstallation,
        status: 'scheduled',
        scheduledDate: date,
        notes,
      };
    } else if (type === 'training' && slotId) {
      // Book the training slot
      const trainingSlot = await this.trainingSlotRepository.findOne({
        where: { id: slotId },
      });

      if (!trainingSlot) {
        throw new BadRequestException('Training slot not found');
      }

      if (trainingSlot.isBooked) {
        throw new BadRequestException('Training slot is already booked');
      }

      trainingSlot.isBooked = true;
      trainingSlot.onboardingId = onboardingRecord.id;
      trainingSlot.bookedParticipants += 1;
      await this.trainingSlotRepository.save(trainingSlot);

      progress.training = {
        ...progress.training,
        status: 'scheduled',
        scheduledDate: trainingSlot.date,
        notes,
      };
    }

    onboardingRecord.progress = progress;
    onboardingRecord.status = 'in_progress';
    await this.onboardingRepository.save(onboardingRecord);

    return {
      message: 'Appointment scheduled successfully',
      onboarding: onboardingRecord,
    };
  }

  /**
   * Get merchant progress
   */
  async getMerchantProgress(merchantId: string): Promise<any> {
    const onboardingRecord = await this.onboardingRepository.findOne({
      where: { merchantId },
      relations: ['merchant', 'slaBreaches'],
    });

    if (!onboardingRecord) {
      throw new NotFoundException('Onboarding record not found');
    }

    const progress = onboardingRecord.progress;
    const now = new Date();

    // Calculate completion percentage
    let completedSteps = 0;
    let totalSteps = 0;

    Object.values(progress).forEach(step => {
      totalSteps++;
      if (step.status === 'completed') {
        completedSteps++;
      }
    });

    const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

    // Check for SLA risks
    const slaRisks = Object.entries(progress).map(([key, step]) => {
      if (step.status !== 'completed' && step.slaDate) {
        const daysUntilSLA = Math.ceil((step.slaDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return {
          type: key,
          daysUntilSLA,
          isAtRisk: daysUntilSLA <= 2,
          isBreached: daysUntilSLA < 0,
        };
      }
      return null;
    }).filter(Boolean);

    return {
      merchant: onboardingRecord.merchant,
      progress: onboardingRecord.progress,
      completionPercentage,
      slaRisks,
      slaBreaches: onboardingRecord.slaBreaches,
      nextSteps: this.getNextSteps(progress),
    };
  }

  /**
   * Get next steps for merchant
   */
  private getNextSteps(progress: any): string[] {
    const steps = [];

    if (progress.hardwareDelivery.status === 'pending') {
      steps.push('Schedule hardware delivery');
    }

    if (progress.hardwareDelivery.status === 'completed' && 
        progress.hardwareInstallation.status === 'pending') {
      steps.push('Schedule hardware installation');
    }

    if (progress.hardwareInstallation.status === 'completed' && 
        progress.training.status === 'pending') {
      steps.push('Schedule training session');
    }

    if (steps.length === 0) {
      steps.push('All steps completed! Welcome to StoreHub!');
    }

    return steps;
  }
}
