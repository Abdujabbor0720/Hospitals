import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBonusDto {
    @ApiPropertyOptional({
        description: 'Bonus miqdori',
        example: 500000,
        default: 500000
    })
    @IsOptional()
    @IsNumber()
    amount?: number;

    @ApiPropertyOptional({
        description: 'Bonus turi',
        example: 'Ish samaradorligi uchun',
        default: 'Ish samaradorligi uchun'
    })
    @IsOptional()
    @IsString()
    bonus_type?: string;

    @ApiPropertyOptional({
        description: 'Shifokor ID raqami',
        example: 1,
        default: 1
    })
    @IsOptional()
    @IsNumber()
    doctor_id?: number;
}
