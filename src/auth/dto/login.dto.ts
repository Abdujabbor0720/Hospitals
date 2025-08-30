import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        description: 'Tizimga kirish uchun email manzil',
        example: 'abdujabbor.toshmatov@gmail.com',
        default: 'admin@gmail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Tizimga kirish uchun parol',
        example: 'parol123',
        default: 'admin123',
        minLength: 6
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}