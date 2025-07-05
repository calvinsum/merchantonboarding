import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from '../admin.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { PreFillFormDto } from '../dto/pre-fill-form.dto';
import { MerchantLinkResponseDto } from '../dto/merchant-link-response.dto';

@ApiTags('Admin - Pre-Fill & Merchant Links')
@Controller('admin/prefill')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'super_admin')
@ApiBearerAuth('JWT-auth')
export class PreFillController {
  constructor(private adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: 'Get pre-fill service information' })
  @ApiResponse({ 
    status: 200, 
    description: 'Pre-fill service information retrieved successfully' 
  })
  async getPreFillInfo() {
    return {
      service: 'Pre-Fill & Merchant Links',
      version: '1.0',
      description: 'Create merchants from pre-fill forms and generate login links',
      endpoints: {
        createMerchant: 'POST /admin/prefill',
        generateLink: 'GET /admin/prefill/link/:merchantId',
        verifyToken: 'GET /admin/prefill/verify/:token'
      },
      status: 'active'
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create merchant from pre-fill form and generate login link' })
  @ApiResponse({ 
    status: 201, 
    description: 'Merchant created successfully with login link',
    type: MerchantLinkResponseDto 
  })
  @ApiResponse({ status: 400, description: 'Invalid form data' })
  async createMerchantFromPreFill(
    @Body() preFillData: PreFillFormDto,
  ): Promise<MerchantLinkResponseDto> {
    return this.adminService.createMerchantFromPreFill(preFillData);
  }

  @Get('link/:merchantId')
  @ApiOperation({ summary: 'Generate new login link for existing merchant' })
  @ApiResponse({ 
    status: 200, 
    description: 'Login link generated successfully',
    type: MerchantLinkResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Merchant not found' })
  async generateMerchantLink(
    @Param('merchantId') merchantId: string,
  ): Promise<MerchantLinkResponseDto> {
    return this.adminService.generateMerchantLoginLink(merchantId);
  }

  @Get('verify/:token')
  @ApiOperation({ summary: 'Verify merchant token validity' })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  @ApiResponse({ status: 401, description: 'Token is invalid or expired' })
  async verifyMerchantToken(@Param('token') token: string) {
    return this.adminService.verifyMerchantToken(token);
  }
}
