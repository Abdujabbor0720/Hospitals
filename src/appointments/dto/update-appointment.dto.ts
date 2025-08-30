import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAppointmentDto {
    @ApiPropertyOptional({
        description: 'Uchrashish holati',
        example: 'tugallangan',
        default: 'rejalashtirilgan',
        enum: ['rejalashtirilgan', 'tugallangan', 'bekor_qilingan']
    })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiPropertyOptional({
        description: 'Rejalashtirilgan uchrashish sanasi va vaqti',
        example: '2024-12-31T10:00:00.000Z',
        default: '2024-12-31T10:00:00.000Z'
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    scheduled_at?: Date;

    @ApiPropertyOptional({
        description: 'Uchrashish uchun qo\'shimcha eslatmalar',
        example: 'Muntazam tekshiruv',
        default: 'Muntazam tekshiruv'
    })
    @IsOptional()
    @IsString()
    notes?: string;

    @ApiPropertyOptional({
        description: 'Shifokor ID raqami',
        example: 1,
        default: 1
    })
    @IsOptional()
    @IsNumber()
    doctor_id?: number;

    @ApiPropertyOptional({
        description: 'Bemor ID raqami',
        example: 1,
        default: 1
    })
    @IsOptional()
    @IsNumber()
    patient_id?: number;
}
