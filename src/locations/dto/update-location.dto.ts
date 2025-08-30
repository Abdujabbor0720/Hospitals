import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateLocationDto {
    @ApiPropertyOptional({
        description: 'To\'liq manzil',
        example: 'Amir Temur ko\'chasi 15-uy',
        default: 'Mustaqillik ko\'chasi 1-uy'
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({
        description: 'Mamlakat nomi',
        example: 'O\'zbekiston',
        default: 'O\'zbekiston'
    })
    @IsOptional()
    @IsString()
    country?: string;

    @ApiPropertyOptional({
        description: 'Shahar nomi',
        example: 'Toshkent',
        default: 'Toshkent'
    })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiPropertyOptional({
        description: 'Viloyat nomi',
        example: 'Toshkent viloyati',
        default: 'Toshkent viloyati'
    })
    @IsOptional()
    @IsString()
    region?: string;
}
