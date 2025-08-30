import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum UserRole {
    ADMIN = 'admin',
    DOCTOR = 'doctor',
    STAFF = 'staff',
    PATIENT = 'patient'
}

export class RegisterDto {
    @ApiProperty({
        description: 'Foydalanuvchi ismi',
        example: 'Dilshod',
        default: 'Dilshod'
    })
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty({
        description: 'Foydalanuvchi familiyasi',
        example: 'Umarov',
        default: 'Umarov'
    })
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty({
        description: 'Foydalanuvchi email manzili',
        example: 'dilshod.umarov@gmail.com',
        default: 'foydalanuvchi@gmail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Foydalanuvchi hisobi uchun parol',
        example: 'parol123',
        default: 'parol123',
        minLength: 6
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: 'Foydalanuvchi telefon raqami',
        example: '+998901234567',
        default: '+998901234567'
    })
    @IsNotEmpty()
    @IsString()
    phone_number: string;

    @ApiProperty({
        description: 'Foydalanuvchi roli',
        enum: UserRole,
        example: UserRole.PATIENT,
        default: UserRole.PATIENT
    })
    @IsEnum(UserRole)
    role: UserRole;

    @ApiPropertyOptional({
        description: 'Super admin ekanligini ko\'rsatish (faqat admin roli uchun)',
        example: false,
        default: false
    })
    @IsOptional()
    @IsBoolean()
    is_super_admin?: boolean;

    @ApiPropertyOptional({
        description: 'Shifokor mutaxassisligi (shifokor roli uchun majburiy)',
        example: 'Kardiolog',
        default: 'Umumiy amaliyot shifokori'
    })
    @IsOptional()
    @IsString()
    specialization?: string;

    @ApiPropertyOptional({
        description: 'Doctor license number (required for doctor role)',
        example: 'MD-12345',
        default: 'MD-00001'
    })
    @IsOptional()
    @IsString()
    license_number?: string;

    @ApiPropertyOptional({
        description: 'Years of experience (for doctor role)',
        example: 5,
        default: 1
    })
    @IsOptional()
    experience?: number;

    @ApiPropertyOptional({
        description: 'Working hours (for doctor role)',
        example: '9:00-17:00',
        default: '9:00-17:00'
    })
    @IsOptional()
    @IsString()
    working_hours?: string;
}
