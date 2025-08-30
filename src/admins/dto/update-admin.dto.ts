import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateAdminDto {
    @ApiPropertyOptional({
        description: 'Administrator ismi',
        example: 'Jasur',
        default: 'Jasur'
    })
    @IsOptional()
    @IsString()
    first_name?: string;

    @ApiPropertyOptional({
        description: 'Administrator familiyasi',
        example: 'Abdullayev',
        default: 'Abdullayev'
    })
    @IsOptional()
    @IsString()
    last_name?: string;

    @ApiPropertyOptional({
        description: 'Administrator email manzili',
        example: 'jasur.abdullayev@gmail.com',
        default: 'admin@gmail.com'
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({
        description: 'Xashirlangan parol',
        example: 123456,
        default: 123456
    })
    @IsOptional()
    @IsNumber()
    hashed_password?: number;

    @ApiPropertyOptional({
        description: 'Administrator telefon raqami',
        example: '+998901234567',
        default: '+998901234567'
    })
    @IsOptional()
    @IsString()
    phone_number?: string;

    @ApiPropertyOptional({
        description: 'Administrator turi',
        example: 'admin',
        default: 'admin',
        enum: ['admin', 'super_admin']
    })
    @IsOptional()
    @IsEnum(['admin', 'super_admin'])
    admin_type?: string;
}
