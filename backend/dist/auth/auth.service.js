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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const merchant_entity_1 = require("../database/entities/merchant.entity");
const crypto_service_1 = require("../shared/services/crypto.service");
let AuthService = class AuthService {
    constructor(userRepository, merchantRepository, jwtService, configService, cryptoService) {
        this.userRepository = userRepository;
        this.merchantRepository = merchantRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.cryptoService = cryptoService;
    }
    async generateMerchantToken(merchantId) {
        const merchant = await this.merchantRepository.findOne({
            where: { id: merchantId },
        });
        if (!merchant) {
            throw new common_1.BadRequestException('Merchant not found');
        }
        const expiresIn = this.configService.get('JWT_EXPIRES_IN', '30d');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);
        const payload = {
            sub: merchant.id,
            email: merchant.email,
            role: 'merchant',
            type: 'merchant_portal',
        };
        const token = this.jwtService.sign(payload, {
            expiresIn,
        });
        return {
            token,
            expiresAt,
        };
    }
    async validateMerchantToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            if (payload.role !== 'merchant') {
                throw new common_1.UnauthorizedException('Invalid token type');
            }
            const merchant = await this.merchantRepository.findOne({
                where: { id: payload.sub },
            });
            if (!merchant) {
                throw new common_1.UnauthorizedException('Merchant not found');
            }
            return {
                userId: merchant.id,
                email: merchant.email,
                role: 'merchant',
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
    async adminLogin(email, password) {
        const user = await this.userRepository.findOne({
            where: { email, isActive: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        user.lastLoginAt = new Date();
        await this.userRepository.save(user);
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            type: 'admin',
        };
        const token = this.jwtService.sign(payload, {
            expiresIn: '8h',
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '30d',
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });
        return {
            token,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            const user = await this.userRepository.findOne({
                where: { id: payload.sub, isActive: true },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const newPayload = {
                sub: user.id,
                email: user.email,
                role: user.role,
                type: 'admin',
            };
            const newToken = this.jwtService.sign(newPayload, {
                expiresIn: '8h',
            });
            const newRefreshToken = this.jwtService.sign(newPayload, {
                expiresIn: '30d',
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            return {
                token: newToken,
                refreshToken: newRefreshToken,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async validateUser(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId, isActive: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const isOldPasswordValid = await user.validatePassword(oldPassword);
        if (!isOldPasswordValid) {
            throw new common_1.BadRequestException('Invalid old password');
        }
        user.password = newPassword;
        await this.userRepository.save(user);
    }
    async resetPassword(email) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const newPassword = this.cryptoService.generateSecureRandom(12);
        user.password = newPassword;
        await this.userRepository.save(user);
        console.log(`New password for ${email}: ${newPassword}`);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(merchant_entity_1.Merchant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService,
        crypto_service_1.CryptoService])
], AuthService);
//# sourceMappingURL=auth.service.js.map