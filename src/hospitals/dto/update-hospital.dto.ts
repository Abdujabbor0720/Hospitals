import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateHospitalDto {
    @ApiPropertyOptional({
        description: 'Shifoxona nomi',
        example: 'Markaziy Shahar Shifoxonasi',
        default: 'Umumiy Shifoxona'
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        description: 'Shifoxona telefon raqami',
        example: '+998712345678',
        default: '+998712345678'
    })
    @IsOptional()
    @IsString()
    phone_number?: string;

    @ApiPropertyOptional({
        description: 'Shifoxona email manzili',
        example: 'info.shifoxona@gmail.com',
        default: 'shifoxona@gmail.com'
    })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiPropertyOptional({
        description: 'Shifoxona tashkil etilgan yili',
        example: 1990,
        default: 2000
    })
    @IsOptional()
    @IsNumber()
    established_year?: number;

    @ApiPropertyOptional({
        description: 'Joylashuv ID raqami',
        example: 1,
        default: 1
    })
    @IsOptional()
    @IsNumber()
    location_id?: number;

    @ApiPropertyOptional({
        description: 'Bo\'lim ID raqami',
        example: 1,
        default: 1
    })
    @IsOptional()
    @IsNumber()
    department_id?: number;
}
