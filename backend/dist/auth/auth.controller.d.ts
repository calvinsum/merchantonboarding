import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, ChangePasswordDto, ResetPasswordDto, GenerateTokenDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        token: string;
        refreshToken: string;
        user: any;
    }>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<{
        token: string;
        refreshToken: string;
    }>;
    generateMerchantToken(generateTokenDto: GenerateTokenDto): Promise<{
        token: string;
        expiresAt: Date;
    }>;
    verifyMerchantToken(body: {
        token: string;
    }): Promise<any>;
    getProfile(user: any): Promise<any>;
    changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
