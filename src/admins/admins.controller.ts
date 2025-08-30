import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/auth-user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Admins')
@Controller('admins')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    create(@Body() createAdminDto: CreateAdminDto, @GetUser() user: any) {
        if (user.role !== 'admin' || user.is_super_admin !== true) {
            throw new ForbiddenException('Only super admin can create new admins');
        }
        return this.adminsService.create(createAdminDto);
    }

    @Get()
    @Roles(UserRole.ADMIN)
    findAll() {
        return this.adminsService.findAll();
    }

    @Get(':id')
    @Roles(UserRole.ADMIN)
    findOne(@Param('id') id: string) {
        return this.adminsService.findOne(+id);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN)
    update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto, @GetUser() user: any) {
        return this.adminsService.update(+id, updateAdminDto, user);
    }

    @Patch(':id/promote-to-super-admin')
    @Roles(UserRole.ADMIN)
    @ApiOperation({
        summary: 'Adminni super admin qilish',
        description: 'Oddiy adminni super admin darajasiga ko\'tarish. Faqat super admin bajarishi mumkin.'
    })
    @ApiResponse({ status: 200, description: 'Admin muvaffaqiyatli super admin qilindi' })
    @ApiResponse({ status: 403, description: 'Faqat super admin boshqa adminni super admin qila oladi' })
    @ApiResponse({ status: 404, description: 'Admin topilmadi' })
    promoteToSuperAdmin(@Param('id') id: string, @GetUser() user: any) {
        if (user.role !== 'admin' || user.is_super_admin !== true) {
            throw new ForbiddenException('Only super admin can promote other admins to super admin');
        }
        return this.adminsService.promoteToSuperAdmin(+id);
    }

    @Patch(':id/demote-from-super-admin')
    @Roles(UserRole.ADMIN)
    @ApiOperation({
        summary: 'Super adminni oddiy admin qilish',
        description: 'Super adminni oddiy admin darajasiga tushirish. Faqat super admin bajarishi mumkin.'
    })
    @ApiResponse({ status: 200, description: 'Super admin muvaffaqiyatli oddiy admin qilindi' })
    @ApiResponse({ status: 403, description: 'Faqat super admin boshqa super adminni demote qila oladi' })
    @ApiResponse({ status: 404, description: 'Admin topilmadi' })
    demoteFromSuperAdmin(@Param('id') id: string, @GetUser() user: any) {
        if (user.role !== 'admin' || user.is_super_admin !== true) {
            throw new ForbiddenException('Only super admin can demote other super admins');
        }
        return this.adminsService.demoteFromSuperAdmin(+id);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string, @GetUser() user: any) {
        return this.adminsService.remove(+id, user);
    }
}
