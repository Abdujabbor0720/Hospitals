import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateStaffDto {
    @ApiPropertyOptional({
        description: 'Xodim ismi',
        example: 'Aziz',
        default: 'Aziz'
    })
    @IsOptional()
    @IsString()
    first_name?: string;

    @ApiPropertyOptional({
        description: 'Xodim familiyasi',
        example: 'Rahmonov',
        default: 'Rahmonov'
    })
    @IsOptional()
    @IsString()
    last_name?: string;

    @ApiPropertyOptional({
        description: 'Xodim yoshi',
        example: 30,
        default: 25
    })
    @IsOptional()
    @IsNumber()
    age?: number;

    @ApiPropertyOptional({
        description: 'Xodim kodi',
        example: 'ST001',
        default: 'ST001'
    })
    @IsOptional()
    @IsString()
    staff_code?: string;

    @ApiPropertyOptional({
        description: 'Ish turi',
        example: 'To\'liq vaqtli',
        default: 'To\'liq vaqtli'
    })
    @IsOptional()
    @IsString()
    employment_type?: string;

    @ApiPropertyOptional({
        description: 'Faol xodim ekanligini ko\'rsatish',
        example: true,
        default: true
    })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @ApiPropertyOptional({
        description: 'Xodim telefon raqami',
        example: '+998901234567',
        default: '+998901234567'
    })
    @IsOptional()
    @IsString()
    phone_number?: string;

    @ApiPropertyOptional({
        description: 'Xodim email manzili',
        example: 'aziz.rahmonov@gmail.com',
        default: 'xodim@gmail.com'
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({
        description: 'Ishga qabul qilingan sana',
        example: '2024-01-01T00:00:00.000Z',
        default: '2024-01-01T00:00:00.000Z'
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    hire_date?: Date;
}
