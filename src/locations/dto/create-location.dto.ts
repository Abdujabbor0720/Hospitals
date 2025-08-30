import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({
    description: 'To\'liq manzil',
    example: 'Amir Temur ko\'chasi 15-uy',
    default: 'Mustaqillik ko\'chasi 1-uy'
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Mamlakat nomi',
    example: 'O\'zbekiston',
    default: 'O\'zbekiston'
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'Shahar nomi',
    example: 'Toshkent',
    default: 'Toshkent'
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'Viloyat nomi',
    example: 'Toshkent viloyati',
    default: 'Toshkent viloyati'
  })
  @IsString()
  @IsNotEmpty()
  region: string;
}
