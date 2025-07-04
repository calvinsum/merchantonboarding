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
exports.PreFillController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("../admin.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const pre_fill_form_dto_1 = require("../dto/pre-fill-form.dto");
const merchant_link_response_dto_1 = require("../dto/merchant-link-response.dto");
let PreFillController = class PreFillController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async createMerchantFromPreFill(preFillData) {
        return this.adminService.createMerchantFromPreFill(preFillData);
    }
    async generateMerchantLink(merchantId) {
        return this.adminService.generateMerchantLoginLink(merchantId);
    }
    async verifyMerchantToken(token) {
        return this.adminService.verifyMerchantToken(token);
    }
};
exports.PreFillController = PreFillController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create merchant from pre-fill form and generate login link' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Merchant created successfully with login link',
        type: merchant_link_response_dto_1.MerchantLinkResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid form data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pre_fill_form_dto_1.PreFillFormDto]),
    __metadata("design:returntype", Promise)
], PreFillController.prototype, "createMerchantFromPreFill", null);
__decorate([
    (0, common_1.Get)('link/:merchantId'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate new login link for existing merchant' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login link generated successfully',
        type: merchant_link_response_dto_1.MerchantLinkResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Merchant not found' }),
    __param(0, (0, common_1.Param)('merchantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PreFillController.prototype, "generateMerchantLink", null);
__decorate([
    (0, common_1.Get)('verify/:token'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify merchant token validity' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token is valid' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token is invalid or expired' }),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PreFillController.prototype, "verifyMerchantToken", null);
exports.PreFillController = PreFillController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Pre-Fill & Merchant Links'),
    (0, common_1.Controller)('admin/prefill'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], PreFillController);
//# sourceMappingURL=pre-fill.controller.js.map