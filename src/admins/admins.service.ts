import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { resSuccess } from 'src/utils/resSuccess';
import { handleError } from 'src/utils/handleError';

@Injectable()
export class AdminsService {
    constructor(
        @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    ) { }

    async create(createAdminDto: CreateAdminDto) {
        try {
            const newAdmin = this.adminRepo.create(createAdminDto);
            await this.adminRepo.save(newAdmin);
            return resSuccess(newAdmin, 201);
        } catch (error) {
            handleError(error);
        }
    }

    async findAll() {
        try {
            const admins = await this.adminRepo.find();
            return resSuccess(admins);
        } catch (error) {
            handleError(error);
        }
    }

    async findOne(id: number) {
        try {
            const admin = await this.adminRepo.findOne({ where: { id } });
            if (!admin) throw new NotFoundException('Admin not found');
            return resSuccess(admin);
        } catch (error) {
            handleError(error);
        }
    }

    async update(id: number, updateAdminDto: UpdateAdminDto, currentUser?: any) {
        try {
            const targetAdmin = await this.adminRepo.findOne({ where: { id } });
            if (!targetAdmin) throw new NotFoundException('Admin not found');

            if (currentUser &&
                currentUser.role === 'admin' &&
                currentUser.is_super_admin !== true &&
                targetAdmin.role === 'super_admin') {
                throw new ForbiddenException('Oddiy admin super adminni o\'zgartira olmaydi');
            }

            await this.adminRepo.update(id, updateAdminDto);
            const admin = await this.adminRepo.findOne({ where: { id } });
            if (!admin) throw new NotFoundException('Admin not found after update');
            return resSuccess(admin);
        } catch (error) {
            handleError(error);
        }
    }

    async promoteToSuperAdmin(id: number) {
        try {
            const admin = await this.adminRepo.findOne({ where: { id } });
            if (!admin) throw new NotFoundException('Admin not found');

            admin.role = 'super_admin';
            await this.adminRepo.save(admin);

            return resSuccess(admin, 200);
        } catch (error) {
            handleError(error);
        }
    }

    async demoteFromSuperAdmin(id: number) {
        try {
            const admin = await this.adminRepo.findOne({ where: { id } });
            if (!admin) throw new NotFoundException('Admin not found');

            admin.role = 'admin';
            await this.adminRepo.save(admin);

            return resSuccess(admin, 200);
        } catch (error) {
            handleError(error);
        }
    }

    async remove(id: number, currentUser?: any) {
        try {
            const targetAdmin = await this.adminRepo.findOne({ where: { id } });
            if (!targetAdmin) throw new NotFoundException('Admin not found');

            if (currentUser &&
                currentUser.role === 'admin' &&
                currentUser.is_super_admin !== true &&
                targetAdmin.role === 'super_admin') {
                throw new ForbiddenException('Oddiy admin super adminni o\'chira olmaydi');
            }

            if (currentUser && currentUser.id === id) {
                throw new ForbiddenException('O\'zingizni o\'chira olmaysiz');
            }

            await this.adminRepo.delete({ id });
            return resSuccess({});
        } catch (error) {
            handleError(error);
        }
    }
}
