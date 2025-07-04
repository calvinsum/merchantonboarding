import { ApiProperty } from '@nestjs/swagger';

export class MerchantLinkResponseDto {
  @ApiProperty({ example: 'https://storehub.com/onboarding/abc123def456', description: 'Unique merchant onboarding link' })
  loginLink: string;

  @ApiProperty({ example: 'abc123def456', description: 'Unique merchant token' })
  token: string;

  @ApiProperty({ example: '2024-08-04T10:00:00Z', description: 'Link expiration date' })
  expiresAt: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Merchant ID' })
  merchantId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001', description: 'Onboarding record ID' })
  onboardingId: string;
}
