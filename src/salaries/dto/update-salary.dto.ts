import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateSalaryDto {
    @ApiPropertyOptional({
        description: 'Xodim ID raqami (xodim maoshi uchun)',
        example: 1,
        default: null
    })
    @IsOptional()
    @IsNumber()
    staff_id?: number;

    @ApiPropertyOptional({
        description: 'Asosiy maosh miqdori',
        example: 5000000,
        default: 5000000
    })
    @IsOptional()
    @IsNumber()
    base_salary?: number;

    @ApiPropertyOptional({
        description: 'Umumiy maosh miqdori (asosiy + bonuslar)',
        example: 6000000,
        default: 6000000
    })
    @IsOptional()
    @IsNumber()
    total_salary?: number;

    @ApiPropertyOptional({
        description: 'Shifokor ID raqami (shifokor maoshi uchun)',
        example: 1,
        default: 1
    })
    @IsOptional()
    @IsNumber()
    doctor_id?: number;
}
