import { IsString, IsDate, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ScheduleAppointmentDto {
  @ApiProperty({
    enum: ['hardware_delivery', 'hardware_installation', 'training'],
    example: 'hardware_delivery',
  })
  @IsEnum(['hardware_delivery', 'hardware_installation', 'training'])
  type: string;

  @ApiProperty({ example: '2024-01-15T10:00:00.000Z' })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  slotId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
