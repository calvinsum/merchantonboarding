import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Reports')
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'super_admin')
@ApiBearerAuth('JWT-auth')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('onboarding-funnel')
  @ApiOperation({ summary: 'Get onboarding funnel data' })
  @ApiResponse({ status: 200, description: 'Funnel data retrieved successfully' })
  async getOnboardingFunnel() {
    return this.reportsService.getOnboardingFunnel();
  }

  @Get('sla-performance')
  @ApiOperation({ summary: 'Get SLA performance metrics' })
  @ApiResponse({ status: 200, description: 'SLA performance retrieved successfully' })
  async getSLAPerformance() {
    return this.reportsService.getSLAPerformance();
  }

  @Get('trainer-utilization')
  @ApiOperation({ summary: 'Get trainer utilization metrics' })
  @ApiResponse({ status: 200, description: 'Trainer utilization retrieved successfully' })
  async getTrainerUtilization() {
    return this.reportsService.getTrainerUtilization();
  }

  @Get('segment-performance')
  @ApiOperation({ summary: 'Get segment performance metrics' })
  @ApiResponse({ status: 200, description: 'Segment performance retrieved successfully' })
  async getSegmentPerformance() {
    return this.reportsService.getSegmentPerformance();
  }
}
