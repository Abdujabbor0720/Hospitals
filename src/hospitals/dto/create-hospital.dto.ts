import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHospitalDto {
  @ApiProperty({
    description: 'Shifoxona nomi',
    example: 'Markaziy Shahar Shifoxonasi',
    default: 'Umumiy Shifoxona'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Shifoxona telefon raqami',
    example: '+998712345678',
    default: '+998712345678'
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    description: 'Shifoxona email manzili',
    example: 'info.shifoxona@gmail.com',
    default: 'shifoxona@gmail.com'
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Shifoxona tashkil etilgan yili',
    example: 1990,
    default: 2000
  })
  @IsNumber()
  @IsNotEmpty()
  established_year: number;

  @ApiProperty({
    description: 'Joylashuv ID raqami',
    example: 1,
    default: 1
  })
  @IsNumber()
  @IsNotEmpty()
  location_id: number;

  @ApiProperty({
    description: 'Bo\'lim ID raqami',
    example: 1,
    default: 1
  })
  @IsNumber()
  @IsNotEmpty()
  department_id: number;
}
