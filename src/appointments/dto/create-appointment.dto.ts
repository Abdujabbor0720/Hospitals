import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Uchrashish holati',
    example: 'rejalashtirilgan',
    default: 'rejalashtirilgan',
    enum: ['rejalashtirilgan', 'tugallangan', 'bekor_qilingan']
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Rejalashtirilgan uchrashish sanasi va vaqti',
    example: '2024-12-31T10:00:00.000Z',
    default: '2024-12-31T10:00:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  scheduled_at: Date;

  @ApiPropertyOptional({
    description: 'Uchrashish uchun qo\'shimcha eslatmalar',
    example: 'Muntazam tekshiruv',
    default: 'Muntazam tekshiruv'
  })
  notes: string;

  @ApiProperty({
    description: 'Shifokor ID raqami',
    example: 1,
    default: 1
  })
  @IsNumber()
  @IsNotEmpty()
  doctor_id: number;

  @ApiProperty({
    description: 'Bemor ID raqami',
    example: 1,
    default: 1
  })
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;
}
