import { PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateDoctorDto {
    @ApiPropertyOptional({
        description: 'Shifokor ismi',
        example: 'Abdujabbor',
        default: 'Abdujabbor'
    })
    @IsOptional()
    @IsString()
    first_name?: string;

    @ApiPropertyOptional({
        description: 'Shifokor familiyasi',
        example: 'Toshmatov',
        default: 'Toshmatov'
    })
    @IsOptional()
    @IsString()
    last_name?: string;

    @ApiPropertyOptional({
        description: 'Shifokor email manzili',
        example: 'abdujabbor.toshmatov@gmail.com',
        default: 'shifokor@gmail.com'
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({
        description: 'Asosiy telefon raqami',
        example: '+998901234567',
        default: '+998901234567'
    })
    @IsOptional()
    @IsString()
    phone_number?: string;

    @ApiPropertyOptional({
        description: 'Tibbiy mutaxassislik',
        example: 'Kardiolog',
        default: 'Umumiy amaliyot shifokori'
    })
    @IsOptional()
    @IsString()
    specialization?: string;

    @ApiPropertyOptional({
        description: 'Qo\'shimcha telefon raqami',
        example: '+998907654321',
        default: '+998907654321'
    })
    @IsOptional()
    @IsString()
    phone_number_2?: string;

    @ApiPropertyOptional({
        description: 'Tibbiy litsenziya raqami',
        example: 'LIC-123456',
        default: 'LIC-000001'
    })
    @IsOptional()
    @IsString()
    license_number?: string;

    @ApiPropertyOptional({
        description: 'Ish tajribasi (yillarda)',
        example: 5,
        default: 1
    })
    @IsOptional()
    @IsNumber()
    experience?: number;

    @ApiPropertyOptional({
        description: 'Ish vaqti jadvali',
        example: '09:00-17:00',
        default: '09:00-17:00'
    })
    @IsOptional()
    @IsString()
    working_hours?: string;
}
