import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EmailService } from './email.service';
import { SMSService } from './sms.service';

@Module({
  providers: [NotificationsService, EmailService, SMSService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
