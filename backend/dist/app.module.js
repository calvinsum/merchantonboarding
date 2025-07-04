"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_1 = require("@nestjs/schedule");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("./auth/auth.module");
const merchants_module_1 = require("./merchants/merchants.module");
const scheduling_module_1 = require("./scheduling/scheduling.module");
const notifications_module_1 = require("./notifications/notifications.module");
const admin_module_1 = require("./admin/admin.module");
const reports_module_1 = require("./reports/reports.module");
const database_module_1 = require("./database/database.module");
const shared_module_1 = require("./shared/shared.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.local', '.env'],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const isProduction = configService.get('NODE_ENV') === 'production';
                    if (isProduction) {
                        return {
                            type: 'postgres',
                            url: configService.get('DATABASE_URL'),
                            autoLoadEntities: true,
                            synchronize: false,
                            logging: configService.get('DB_LOGGING', false),
                            ssl: {
                                rejectUnauthorized: false,
                            },
                        };
                    }
                    else {
                        return {
                            type: 'sqlite',
                            database: 'database.sqlite',
                            autoLoadEntities: true,
                            synchronize: true,
                            logging: configService.get('DB_LOGGING', false),
                        };
                    }
                },
            }),
            schedule_1.ScheduleModule.forRoot(),
            jwt_1.JwtModule.registerAsync({
                global: true,
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET', 'your-secret-key'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRES_IN', '30d'),
                    },
                }),
            }),
            database_module_1.DatabaseModule,
            shared_module_1.SharedModule,
            auth_module_1.AuthModule,
            merchants_module_1.MerchantsModule,
            scheduling_module_1.SchedulingModule,
            notifications_module_1.NotificationsModule,
            admin_module_1.AdminModule,
            reports_module_1.ReportsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map