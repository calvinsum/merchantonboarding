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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reports_service_1 = require("./reports.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let ReportsController = class ReportsController {
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    async getOnboardingFunnel() {
        return this.reportsService.getOnboardingFunnel();
    }
    async getSLAPerformance() {
        return this.reportsService.getSLAPerformance();
    }
    async getTrainerUtilization() {
        return this.reportsService.getTrainerUtilization();
    }
    async getSegmentPerformance() {
        return this.reportsService.getSegmentPerformance();
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('onboarding-funnel'),
    (0, swagger_1.ApiOperation)({ summary: 'Get onboarding funnel data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Funnel data retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getOnboardingFunnel", null);
__decorate([
    (0, common_1.Get)('sla-performance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get SLA performance metrics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'SLA performance retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getSLAPerformance", null);
__decorate([
    (0, common_1.Get)('trainer-utilization'),
    (0, swagger_1.ApiOperation)({ summary: 'Get trainer utilization metrics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Trainer utilization retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getTrainerUtilization", null);
__decorate([
    (0, common_1.Get)('segment-performance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get segment performance metrics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Segment performance retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getSegmentPerformance", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map