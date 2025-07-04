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
exports.OnboardingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("../admin.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
let OnboardingController = class OnboardingController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getAllOnboardingRecords() {
        return this.adminService.getAllOnboardingRecords();
    }
    async getOnboardingById(id) {
        return this.adminService.getOnboardingById(id);
    }
    async createOnboardingRecord(data) {
        return this.adminService.createOnboardingRecord(data);
    }
    async updateOnboardingRecord(id, data) {
        return this.adminService.updateOnboardingRecord(id, data);
    }
};
exports.OnboardingController = OnboardingController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all onboarding records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Onboarding records retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getAllOnboardingRecords", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get onboarding record by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Onboarding record retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Onboarding record not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "getOnboardingById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new onboarding record' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Onboarding record created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "createOnboardingRecord", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update onboarding record' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Onboarding record updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Onboarding record not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OnboardingController.prototype, "updateOnboardingRecord", null);
exports.OnboardingController = OnboardingController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Onboarding'),
    (0, common_1.Controller)('admin/onboarding'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], OnboardingController);
//# sourceMappingURL=onboarding.controller.js.map