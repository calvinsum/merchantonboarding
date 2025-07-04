import { Module } from '@nestjs/common';
import { DateService } from './services/date.service';
import { ValidationService } from './services/validation.service';
import { CryptoService } from './services/crypto.service';

@Module({
  providers: [DateService, ValidationService, CryptoService],
  exports: [DateService, ValidationService, CryptoService],
})
export class SharedModule {}
