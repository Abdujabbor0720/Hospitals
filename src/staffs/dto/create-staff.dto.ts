import { IsBoolean, IsDate, IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateStaffDto {
    @ApiProperty({
        description: 'Xodim ismi',
        example: 'Aziz',
        default: 'Aziz'
    })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({
        description: 'Xodim familiyasi',
        example: 'Rahmonov',
        default: 'Rahmonov'
    })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({
        description: 'Xodim yoshi',
        example: 30,
        default: 25
    })
    @IsNumber()
    @IsNotEmpty()
    age: number;

    @ApiProperty({
        description: 'Xodim kodi',
        example: 'ST001',
        default: 'ST001'
    })
    @IsString()
    @IsNotEmpty()
    staff_code: string;

    @ApiProperty({
        description: 'Ish turi',
        example: 'To\'liq vaqtli',
        default: 'To\'liq vaqtli'
    })
    @IsString()
    @IsNotEmpty()
    employment_type: string;

    @ApiProperty({
        description: 'Faol xodim ekanligini ko\'rsatish',
        example: true,
        default: true
    })
    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean;

    @ApiProperty({
        description: 'Xodim telefon raqami',
        example: '+998901234567',
        default: '+998901234567'
    })
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({
        description: 'Xodim email manzili',
        example: 'aziz.rahmonov@gmail.com',
        default: 'xodim@gmail.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Ishga qabul qilingan sana',
        example: '2024-01-01T00:00:00.000Z',
        default: '2024-01-01T00:00:00.000Z'
    })
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    hire_date: Date;
}
