"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const merchants_service_1 = require("./merchants.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const dto_1 = require("./dto");
let MerchantsController = class MerchantsController {
    constructor(merchantsService) {
        this.merchantsService = merchantsService;
    }
    async getOnboardingDetails(merchantId) {
        return this.merchantsService.getOnboardingDetails(merchantId);
    }
    async getMerchantProgress(merchantId) {
        return this.merchantsService.getMerchantProgress(merchantId);
    }
    async getAvailableDeliveryDates(merchantId) {
        return this.merchantsService.getAvailableDeliveryDates(merchantId);
    }
    async getAvailableInstallationDates(merchantId) {
        return this.merchantsService.getAvailableInstallationDates(merchantId);
    }
    async getAvailableTrainingSlots(merchantId) {
        return this.merchantsService.getAvailableTrainingSlots(merchantId);
    }
    async scheduleAppointment(merchantId, scheduleDto) {
        return this.merchantsService.scheduleAppointment(merchantId, scheduleDto);
    }
};
exports.MerchantsController = MerchantsController;
__decorate([
    (0, common_1.Get)('onboarding'),
    (0, swagger_1.ApiOperation)({ summary: 'Get merchant onboarding details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Onboarding details retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Merchant not found' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "getOnboardingDetails", null);
__decorate([
    (0, common_1.Get)('progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Get merchant progress' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Progress retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Merchant not found' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "getMerchantProgress", null);
__decorate([
    (0, common_1.Get)('delivery-dates'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available delivery dates' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Available dates retrieved successfully' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "getAvailableDeliveryDates", null);
__decorate([
    (0, common_1.Get)('installation-dates'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available installation dates' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Available dates retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Hardware delivery must be scheduled first' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "getAvailableInstallationDates", null);
__decorate([
    (0, common_1.Get)('training-slots'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available training slots' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Available slots retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Hardware installation must be scheduled first' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "getAvailableTrainingSlots", null);
__decorate([
    (0, common_1.Post)('schedule'),
    (0, swagger_1.ApiOperation)({ summary: 'Schedule appointment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Appointment scheduled successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid scheduling constraints' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.ScheduleAppointmentDto]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "scheduleAppointment", null);
exports.MerchantsController = MerchantsController = __decorate([
    (0, swagger_1.ApiTags)('Merchant Portal'),
    (0, common_1.Controller)('merchant'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('merchant'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [merchants_service_1.MerchantsService])
], MerchantsController);
//# sourceMappingURL=merchants.controller.js.map