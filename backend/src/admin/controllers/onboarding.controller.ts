import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from '../admin.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('Admin - Onboarding')
@Controller('admin/onboarding')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'super_admin')
@ApiBearerAuth('JWT-auth')
export class OnboardingController {
  constructor(private adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: 'Get all onboarding records' })
  @ApiResponse({ status: 200, description: 'Onboarding records retrieved successfully' })
  async getAllOnboardingRecords() {
    return this.adminService.getAllOnboardingRecords();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get onboarding record by ID' })
  @ApiResponse({ status: 200, description: 'Onboarding record retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Onboarding record not found' })
  async getOnboardingById(@Param('id') id: string) {
    return this.adminService.getOnboardingById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new onboarding record' })
  @ApiResponse({ status: 201, description: 'Onboarding record created successfully' })
  async createOnboardingRecord(@Body() data: any) {
    return this.adminService.createOnboardingRecord(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update onboarding record' })
  @ApiResponse({ status: 200, description: 'Onboarding record updated successfully' })
  @ApiResponse({ status: 404, description: 'Onboarding record not found' })
  async updateOnboardingRecord(@Param('id') id: string, @Body() data: any) {
    return this.adminService.updateOnboardingRecord(id, data);
  }
}
