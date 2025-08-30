import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
    @ApiProperty({
        description: 'Administrator ismi',
        example: 'Jasur',
        default: 'Jasur'
    })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({
        description: 'Administrator familiyasi',
        example: 'Abdullayev',
        default: 'Abdullayev'
    })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({
        description: 'Administrator email manzili',
        example: 'jasur.abdullayev@gmail.com',
        default: 'admin@gmail.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Xashirlangan parol',
        example: 123456,
        default: 123456
    })
    @IsNumber()
    @IsNotEmpty()
    hashed_password: number;

    @ApiProperty({
        description: 'Administrator telefon raqami',
        example: '+998901234567',
        default: '+998901234567'
    })
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({
        description: 'Administrator turi',
        example: 'admin',
        default: 'admin',
        enum: ['admin', 'super_admin']
    })
    @IsEnum(['admin', 'super_admin'])
    @IsNotEmpty()
    role: string;
}
