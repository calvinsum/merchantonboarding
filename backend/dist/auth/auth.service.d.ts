import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Merchant } from '../database/entities/merchant.entity';
import { CryptoService } from '../shared/services/crypto.service';
export declare class AuthService {
    private userRepository;
    private merchantRepository;
    private jwtService;
    private configService;
    private cryptoService;
    constructor(userRepository: Repository<User>, merchantRepository: Repository<Merchant>, jwtService: JwtService, configService: ConfigService, cryptoService: CryptoService);
    generateMerchantToken(merchantId: string): Promise<{
        token: string;
        expiresAt: Date;
    }>;
    validateMerchantToken(token: string): Promise<any>;
    adminLogin(email: string, password: string): Promise<{
        token: string;
        refreshToken: string;
        user: any;
    }>;
    refreshToken(refreshToken: string): Promise<{
        token: string;
        refreshToken: string;
    }>;
    validateUser(userId: string): Promise<any>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>;
    resetPassword(email: string): Promise<void>;
}
