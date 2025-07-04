import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateTokenDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  merchantId: string;
}
