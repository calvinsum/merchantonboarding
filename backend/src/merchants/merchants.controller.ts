import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MerchantsService } from './merchants.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ScheduleAppointmentDto } from './dto';

@ApiTags('Merchant Portal')
@Controller('merchant')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('merchant')
@ApiBearerAuth('JWT-auth')
export class MerchantsController {
  constructor(private merchantsService: MerchantsService) {}

  @Get('onboarding')
  @ApiOperation({ summary: 'Get merchant onboarding details' })
  @ApiResponse({ status: 200, description: 'Onboarding details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Merchant not found' })
  async getOnboardingDetails(@CurrentUser('userId') merchantId: string) {
    return this.merchantsService.getOnboardingDetails(merchantId);
  }

  @Get('progress')
  @ApiOperation({ summary: 'Get merchant progress' })
  @ApiResponse({ status: 200, description: 'Progress retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Merchant not found' })
  async getMerchantProgress(@CurrentUser('userId') merchantId: string) {
    return this.merchantsService.getMerchantProgress(merchantId);
  }

  @Get('delivery-dates')
  @ApiOperation({ summary: 'Get available delivery dates' })
  @ApiResponse({ status: 200, description: 'Available dates retrieved successfully' })
  async getAvailableDeliveryDates(@CurrentUser('userId') merchantId: string) {
    return this.merchantsService.getAvailableDeliveryDates(merchantId);
  }

  @Get('installation-dates')
  @ApiOperation({ summary: 'Get available installation dates' })
  @ApiResponse({ status: 200, description: 'Available dates retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Hardware delivery must be scheduled first' })
  async getAvailableInstallationDates(@CurrentUser('userId') merchantId: string) {
    return this.merchantsService.getAvailableInstallationDates(merchantId);
  }

  @Get('training-slots')
  @ApiOperation({ summary: 'Get available training slots' })
  @ApiResponse({ status: 200, description: 'Available slots retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Hardware installation must be scheduled first' })
  async getAvailableTrainingSlots(@CurrentUser('userId') merchantId: string) {
    return this.merchantsService.getAvailableTrainingSlots(merchantId);
  }

  @Post('schedule')
  @ApiOperation({ summary: 'Schedule appointment' })
  @ApiResponse({ status: 200, description: 'Appointment scheduled successfully' })
  @ApiResponse({ status: 400, description: 'Invalid scheduling constraints' })
  async scheduleAppointment(
    @CurrentUser('userId') merchantId: string,
    @Body() scheduleDto: ScheduleAppointmentDto,
  ) {
    return this.merchantsService.scheduleAppointment(merchantId, scheduleDto);
  }
}
