import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class UpdateDepartmentDto {
    @ApiPropertyOptional({
        description: 'Bo\'lim nomi',
        example: 'Kardiologiya bo\'limi',
        default: 'Umumiy bo\'lim'
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        description: 'Bo\'lim tavsifi',
        example: 'Yurak va qon tomir kasalliklari bo\'limi',
        default: 'Umumiy tibbiy bo\'lim'
    })
    @IsOptional()
    @IsString()
    description?: string;
}
