import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum, IsPhoneNumber } from 'class-validator';

export enum OnboardingType {
  HARDWARE_DELIVERY = 'hardware_delivery',
  TRAINING_ONLY = 'training_only', 
  INSTALLATION_ONLY = 'installation_only',
  FULL_ONBOARDING = 'full_onboarding',
}

export enum MerchantSegment {
  FOOD_BEVERAGE = 'food_beverage',
  RETAIL = 'retail',
  SERVICES = 'services',
  HEALTHCARE = 'healthcare',
  EDUCATION = 'education',
  OTHER = 'other',
}

export class PreFillFormDto {
  @ApiProperty({ example: 'Demo Restaurant', description: 'Merchant account name' })
  @IsNotEmpty()
  @IsString()
  accountName: string;

  @ApiProperty({ example: 'demo@restaurant.com', description: 'Merchant email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+60123456789', description: 'Merchant phone number' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'John Doe', description: 'Person in charge name' })
  @IsNotEmpty()
  @IsString()
  picName: string;

  @ApiProperty({ example: 'food_beverage', enum: MerchantSegment, description: 'Merchant business segment' })
  @IsNotEmpty()
  @IsEnum(MerchantSegment)
  segment: MerchantSegment;

  @ApiProperty({ example: 'full_onboarding', enum: OnboardingType, description: 'Type of onboarding needed' })
  @IsNotEmpty()
  @IsEnum(OnboardingType)
  onboardingType: OnboardingType;

  @ApiProperty({ example: 'en', description: 'Preferred language', required: false })
  @IsOptional()
  @IsString()
  preferredLanguage?: string;

  @ApiProperty({ example: 'Kuala Lumpur', description: 'Business location', required: false })
  @IsOptional()
  @IsString()
  businessLocation?: string;

  @ApiProperty({ example: 'Special requirements', description: 'Additional notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
