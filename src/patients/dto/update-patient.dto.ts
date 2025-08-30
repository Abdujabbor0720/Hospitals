import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePatientDto {
    @ApiPropertyOptional({
        description: 'Bemor ismi',
        example: 'Ahrorbek',
        default: 'Ahrorbek'
    })
    @IsOptional()
    @IsString()
    first_name?: string;

    @ApiPropertyOptional({
        description: 'Bemor familiyasi',
        example: 'Karimov',
        default: 'Karimov'
    })
    @IsOptional()
    @IsString()
    last_name?: string;

    @ApiPropertyOptional({
        description: 'Bemor tug\'ilgan sanasi',
        example: '1990-01-01T00:00:00.000Z',
        default: '1990-01-01T00:00:00.000Z'
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    birth_date?: Date;

    @ApiPropertyOptional({
        description: 'Bemor jinsi',
        example: 'erkak',
        default: 'erkak',
        enum: ['erkak', 'ayol']
    })
    @IsOptional()
    @IsString()
    gender?: string;

    @ApiPropertyOptional({
        description: 'Bemor passport ma\'lumotlari',
        example: 'AB1234567',
        default: 'AB1234567'
    })
    @IsOptional()
    @IsString()
    passport_info?: string;

    @ApiPropertyOptional({
        description: 'Bemor yoshi',
        example: 30,
        default: 25
    })
    @IsOptional()
    @IsNumber()
    age?: number;

    @ApiPropertyOptional({
        description: 'Bemor telefon raqami',
        example: '+998901234567',
        default: '+998901234567'
    })
    @IsOptional()
    @IsString()
    phone_number?: string;

    @ApiPropertyOptional({
        description: 'Bemor manzili',
        example: 'Toshkent, O\'zbekiston',
        default: 'Toshkent, O\'zbekiston'
    })
    @IsOptional()
    @IsString()
    address?: string;
}
