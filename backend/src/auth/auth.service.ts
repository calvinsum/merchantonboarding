import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Merchant } from '../database/entities/merchant.entity';
import { CryptoService } from '../shared/services/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private cryptoService: CryptoService,
  ) {}

  /**
   * Generate merchant token for onboarding portal access
   */
  async generateMerchantToken(merchantId: string): Promise<{
    token: string;
    expiresAt: Date;
  }> {
    const merchant = await this.merchantRepository.findOne({
      where: { id: merchantId },
    });

    if (!merchant) {
      throw new BadRequestException('Merchant not found');
    }

    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '30d');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

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

  /**
   * Validate merchant token
   */
  async validateMerchantToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      
      if (payload.role !== 'merchant') {
        throw new UnauthorizedException('Invalid token type');
      }

      const merchant = await this.merchantRepository.findOne({
        where: { id: payload.sub },
      });

      if (!merchant) {
        throw new UnauthorizedException('Merchant not found');
      }

      return {
        userId: merchant.id,
        email: merchant.email,
        role: 'merchant',
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Admin login
   */
  async adminLogin(email: string, password: string): Promise<{
    token: string;
    refreshToken: string;
    user: any;
  }> {
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
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
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
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

  /**
   * Refresh token
   */
  async refreshToken(refreshToken: string): Promise<{
    token: string;
    refreshToken: string;
  }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.sub, isActive: true },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
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
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      return {
        token: newToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Validate user
   */
  async validateUser(userId: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userId, isActive: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  /**
   * Change password
   */
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isOldPasswordValid = await user.validatePassword(oldPassword);
    if (!isOldPasswordValid) {
      throw new BadRequestException('Invalid old password');
    }

    user.password = newPassword;
    await this.userRepository.save(user);
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const newPassword = this.cryptoService.generateSecureRandom(12);
    user.password = newPassword;
    await this.userRepository.save(user);

    // TODO: Send email with new password
    console.log(`New password for ${email}: ${newPassword}`);
  }
}
