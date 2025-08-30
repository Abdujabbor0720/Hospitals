import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBonusDto {
  @ApiProperty({
    description: 'Bonus turi',
    example: 'Ish samaradorligi bonusi',
    default: 'Umumiy bonus'
  })
  @IsString()
  @IsNotEmpty()
  bonus_type: string;

  @ApiProperty({
    description: 'Bonus miqdori',
    example: 500000,
    default: 300000
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiPropertyOptional({
    description: 'Bonus berilish sababi',
    example: 'Yaxshi ish natijasi uchun',
    default: 'Ragbatlantirish maqsadida'
  })
  reason: string;

  @ApiProperty({
    description: 'Maosh ID raqami',
    example: 1,
    default: 1
  })
  @IsNumber()
  @IsNotEmpty()
  salary_id: number;
}
