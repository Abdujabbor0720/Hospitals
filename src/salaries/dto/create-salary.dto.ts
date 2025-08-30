import { IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSalaryDto {
  @ApiPropertyOptional({
    description: 'Xodim ID raqami (xodim maoshi uchun)',
    example: 1,
    default: null
  })
  @IsOptional()
  @IsNumber()
  staff_id?: number;

  @ApiProperty({
    description: 'Asosiy maosh miqdori',
    example: 5000000,
    default: 5000000
  })
  @IsNumber()
  @IsNotEmpty()
  base_salary: number;

  @ApiProperty({
    description: 'Umumiy maosh miqdori (asosiy + bonuslar)',
    example: 6000000,
    default: 6000000
  })
  @IsNumber()
  @IsNotEmpty()
  total_salary: number;

  @ApiPropertyOptional({
    description: 'Shifokor ID raqami (shifokor maoshi uchun)',
    example: 1,
    default: 1
  })
  @IsOptional()
  @IsNumber()
  doctor_id?: number;

  @ValidateIf(o => !o.doctor_id)
  @IsNotEmpty({ message: 'Either staff_id or doctor_id must be provided' })
  staff_id_required?: number;

  @ValidateIf(o => !o.staff_id)
  @IsNotEmpty({ message: 'Either staff_id or doctor_id must be provided' })
  doctor_id_required?: number;
}
