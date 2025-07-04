import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3001);
  const apiPrefix = configService.get<string>('API_PREFIX', 'api/v1');

  // Security middleware with CSP configuration for admin dashboard
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts for admin dashboard
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "https:", "data:"],
        connectSrc: ["'self'", "https:"],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  }));
  app.use(compression());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: true, // Allow all origins for testing
    credentials: configService.get<boolean>('CORS_CREDENTIALS', true),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // API prefix - exclude certain routes
  app.setGlobalPrefix(apiPrefix, {
    exclude: [
      '/',
      '/admin',
      '/admin/prefill',
      '/admin/prefill/*',
      '/admin/onboarding',
      '/admin/onboarding/*',
      '/auth/google',
      '/auth/google/callback'
    ],
  });

  // Swagger documentation - Enable in production for Phase 1A
  if (configService.get<string>('NODE_ENV') !== 'test') {
    const config = new DocumentBuilder()
      .setTitle('StoreHub Onboarding API')
      .setDescription('StoreHub Onboarding Automation System API Documentation')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(port);
  console.log(`🚀 StoreHub Onboarding API is running on port ${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
