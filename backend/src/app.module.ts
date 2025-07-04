import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';

// Feature modules
import { AuthModule } from './auth/auth.module';
import { MerchantsModule } from './merchants/merchants.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { ReportsModule } from './reports/reports.module';
import { DatabaseModule } from './database/database.module';

// Shared modules
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Database - Environment-aware configuration
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        
        if (isProduction) {
          // Production: Use PostgreSQL
          return {
            type: 'postgres',
            url: configService.get<string>('DATABASE_URL'),
            autoLoadEntities: true,
            synchronize: true, // TODO: Set to false after initial deployment // Never auto-sync in production
            logging: configService.get<boolean>('DB_LOGGING', false),
            ssl: {
              rejectUnauthorized: false, // Required for most cloud PostgreSQL services
            },
          };
        } else {
          // Development: Use SQLite
          return {
            type: 'sqlite',
            database: 'database.sqlite',
            autoLoadEntities: true,
            synchronize: true, // Auto-create tables in development
            logging: configService.get<boolean>('DB_LOGGING', false),
          };
        }
      },
    }),

    // Schedule module for cron jobs
    ScheduleModule.forRoot(),

    // JWT Module
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'your-secret-key'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '30d'),
        },
      }),
    }),

    // Feature modules
    DatabaseModule,
    SharedModule,
    AuthModule,
    MerchantsModule,
    SchedulingModule,
    NotificationsModule,
    AdminModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
