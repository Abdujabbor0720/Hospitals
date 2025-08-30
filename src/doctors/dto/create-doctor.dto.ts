import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
    @ApiProperty({
        description: 'Shifokor ismi',
        example: 'Abdujabbor',
        default: 'Abdujabbor'
    })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({
        description: 'Shifokor familiyasi',
        example: 'Toshmatov',
        default: 'Toshmatov'
    })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({
        description: 'Shifokor email manzili',
        example: 'abdujabbor.toshmatov@gmail.com',
        default: 'shifokor@gmail.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Asosiy telefon raqami',
        example: '+998901234567',
        default: '+998901234567'
    })
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({
        description: 'Tibbiy mutaxassislik',
        example: 'Kardiolog',
        default: 'Umumiy amaliyot shifokori'
    })
    @IsString()
    @IsNotEmpty()
    specialization: string;

    @ApiProperty({
        description: 'Qo\'shimcha telefon raqami',
        example: '+998907654321',
        default: '+998907654321'
    })
    @IsString()
    @IsNotEmpty()
    phone_number_2: string;

    @ApiProperty({
        description: 'Tibbiy litsenziya raqami',
        example: 'LIC-123456',
        default: 'LIC-000001'
    })
    @IsString()
    @IsNotEmpty()
    license_number: string;

    @ApiProperty({
        description: 'Ish tajribasi (yillarda)',
        example: 5,
        default: 1
    })
    @IsNumber()
    @IsNotEmpty()
    experience: number;

    @ApiProperty({
        description: 'Ish vaqti jadvali',
        example: '09:00-17:00',
        default: '09:00-17:00'
    })
    @IsString()
    @IsNotEmpty()
    working_hours: string;
}
