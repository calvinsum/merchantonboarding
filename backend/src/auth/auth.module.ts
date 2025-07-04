import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { User } from '../database/entities/user.entity';
import { Merchant } from '../database/entities/merchant.entity';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Merchant]),
    PassportModule,
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: JwtStrategy,
      inject: [ConfigService, getRepositoryToken(User)],
      useFactory: (configService: ConfigService, userRepository: any) => {
        // This factory ensures ConfigService is ready before JwtStrategy is created
        return new JwtStrategy(configService, userRepository);
      },
    },
  ],
  exports: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}