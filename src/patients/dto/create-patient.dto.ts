import { IsDate, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePatientDto {
  @ApiProperty({
    description: 'Bemor ismi',
    example: 'Ahrorbek',
    default: 'Ahrorbek'
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Bemor familiyasi',
    example: 'Karimov',
    default: 'Karimov'
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'Bemor tug\'ilgan sanasi',
    example: '1990-01-01T00:00:00.000Z',
    default: '1990-01-01T00:00:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birth_date: Date;

  @ApiProperty({
    description: 'Bemor jinsi',
    example: 'erkak',
    default: 'erkak',
    enum: ['erkak', 'ayol']
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    description: 'Bemor passport ma\'lumotlari',
    example: 'AB1234567',
    default: 'AB1234567'
  })
  @IsString()
  @IsNotEmpty()
  passport_info: string;

  @ApiProperty({
    description: 'Bemor yoshi',
    example: 30,
    default: 25
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    description: 'Bemor telefon raqami',
    example: '+998901234567',
    default: '+998901234567'
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    description: 'Bemor manzili',
    example: 'Toshkent, O\'zbekiston',
    default: 'Toshkent, O\'zbekiston'
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
