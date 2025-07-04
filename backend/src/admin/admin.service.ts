import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(OnboardingRecord)
    private onboardingRepository: Repository<OnboardingRecord>,
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
    @InjectRepository(TrainingSlot)
    private trainingSlotRepository: Repository<TrainingSlot>,
    @InjectRepository(TrainingType)
    private trainingTypeRepository: Repository<TrainingType>,
    @InjectRepository(DeliveryLocation)
    private deliveryLocationRepository: Repository<DeliveryLocation>,
    @InjectRepository(Holiday)
    private holidayRepository: Repository<Holiday>,
    @InjectRepository(SystemSettings)
    private systemSettingsRepository: Repository<SystemSettings>,
    private cryptoService: CryptoService,
    private dateService: DateService,
  ) {}

  async getAllOnboardingRecords(): Promise<OnboardingRecord[]> {
    return this.onboardingRepository.find({
      relations: ['merchant', 'slaBreaches'],
    });
  }

  async getOnboardingById(id: string): Promise<OnboardingRecord> {
    return this.onboardingRepository.findOne({
      where: { id },
      relations: ['merchant', 'slaBreaches'],
    });
  }

  async createOnboardingRecord(data: Partial<OnboardingRecord>): Promise<OnboardingRecord> {
    const onboardingRecord = this.onboardingRepository.create(data);
    return this.onboardingRepository.save(onboardingRecord);
  }

  async updateOnboardingRecord(id: string, data: Partial<OnboardingRecord>): Promise<OnboardingRecord> {
    await this.onboardingRepository.update(id, data);
    return this.getOnboardingById(id);
  }

  // Phase 1a: New Methods for Merchant Creation & Login Links
  async createMerchantFromPreFill(preFillData: PreFillFormDto): Promise<MerchantLinkResponseDto> {
    // Check if merchant already exists
    const existingMerchant = await this.merchantRepository.findOne({
      where: { email: preFillData.email },
    });

    if (existingMerchant) {
      throw new BadRequestException('Merchant with this email already exists');
    }

    // Create merchant
    const merchant = this.merchantRepository.create({
      accountName: preFillData.accountName,
      email: preFillData.email,
      phone: preFillData.phone,
      picName: preFillData.picName,
      segment: preFillData.segment,
      preferredLanguage: preFillData.preferredLanguage || 'en',
      businessLocation: preFillData.businessLocation,
      notes: preFillData.notes,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedMerchant = await this.merchantRepository.save(merchant);

    // Create onboarding record
    const onboardingRecord = this.onboardingRepository.create({
      merchantId: savedMerchant.id,
      types: [preFillData.onboardingType],
      status: 'pending',
      progress: {
        hardwareDelivery: {
          status: 'pending',
          slaDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
        hardwareInstallation: {
          status: 'pending', 
          slaDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
        training: {
          status: 'pending',
          slaDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const savedOnboardingRecord = await this.onboardingRepository.save(onboardingRecord);

    // Generate login link
    return this.generateMerchantLoginLink(savedMerchant.id);
  }

  async generateMerchantLoginLink(merchantId: string): Promise<MerchantLinkResponseDto> {
    // Verify merchant exists
    const merchant = await this.merchantRepository.findOne({
      where: { id: merchantId },
    });

    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    // Generate secure token (30-day expiry)
    const token = this.cryptoService.generateToken(64);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    // Store token in merchant record
    await this.merchantRepository.update(merchantId, {
      authToken: token,
      authTokenExpiry: expiresAt,
      updatedAt: new Date(),
    });

    // Get onboarding record
    const onboardingRecord = await this.onboardingRepository.findOne({
      where: { merchantId },
    });

    // Generate login link
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const loginLink = `${baseUrl}/merchant/onboarding?token=${token}`;

    return {
      loginLink,
      token,
      expiresAt,
      merchantId,
      onboardingId: onboardingRecord?.id || null,
    };
  }

  async verifyMerchantToken(token: string): Promise<{ valid: boolean; merchantId?: string }> {
    const merchant = await this.merchantRepository.findOne({
      where: { authToken: token },
    });

    if (!merchant) {
      return { valid: false };
    }

    // Check if token is expired
    if (merchant.authTokenExpiry && merchant.authTokenExpiry < new Date()) {
      return { valid: false };
    }

    return { valid: true, merchantId: merchant.id };
  }
}
