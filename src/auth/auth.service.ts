import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { AuthUser, UserRole } from './entities/auth-user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { resSuccess } from '../utils/resSuccess';
import { handleError } from '../utils/handleError';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthUser)
        private authUserRepository: Repository<AuthUser>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async register(registerDto: RegisterDto) {
        try {
            const existingUser = await this.authUserRepository.findOne({
                where: { email: registerDto.email }
            });

            if (existingUser) {
                throw new ConflictException('Email already exists');
            }

            const authUser = this.authUserRepository.create({
                first_name: registerDto.first_name,
                last_name: registerDto.last_name,
                email: registerDto.email,
                password: registerDto.password,
                phone_number: registerDto.phone_number,
                role: registerDto.role,
                is_super_admin: registerDto.is_super_admin || false,
                specialization: registerDto.specialization,
                license_number: registerDto.license_number,
                experience: registerDto.experience,
                working_hours: registerDto.working_hours,
            });

            const savedAuthUser = await this.authUserRepository.save(authUser);

            const tokens = await this.generateTokens(savedAuthUser);

            await this.updateRefreshToken(savedAuthUser.id, tokens.refresh_token);

            const { password, refresh_token, ...userResult } = savedAuthUser;

            return resSuccess({
                user: userResult,
                ...tokens
            }, 201);
        } catch (error) {
            handleError(error);
        }
    }

    async login(loginDto: LoginDto) {
        try {
            const user = await this.authUserRepository.findOne({
                where: { email: loginDto.email }
            });

            if (!user || !await user.validatePassword(loginDto.password)) {
                throw new UnauthorizedException('Invalid credentials');
            }

            if (!user.is_active) {
                throw new UnauthorizedException('Account is deactivated');
            }

            const tokens = await this.generateTokens(user);
            await this.updateRefreshToken(user.id, tokens.refresh_token);

            const { password, refresh_token, ...userResult } = user;

            return resSuccess({
                user: userResult,
                ...tokens
            });
        } catch (error) {
            handleError(error);
        }
    }

    async createFirstAdmin(registerDto: RegisterDto) {
        try {
            const existingAdmin = await this.authUserRepository.findOne({
                where: [
                    { role: UserRole.ADMIN },
                    { is_super_admin: true }
                ]
            });

            if (existingAdmin) {
                throw new ConflictException('Admin allaqachon mavjud. Faqat birinchi admin yaratish uchun ishlatiladi.');
            }

            const existingUser = await this.authUserRepository.findOne({
                where: { email: registerDto.email }
            });

            if (existingUser) {
                throw new ConflictException('Email allaqachon mavjud');
            }

            const authUser = new AuthUser();
            authUser.first_name = registerDto.first_name;
            authUser.last_name = registerDto.last_name;
            authUser.email = registerDto.email;
            authUser.password = registerDto.password;
            authUser.phone_number = registerDto.phone_number;
            authUser.role = UserRole.ADMIN;
            authUser.is_super_admin = true;
            authUser.is_active = true;

            const savedAuthUser = await this.authUserRepository.save(authUser);

            const tokens = await this.generateTokens(savedAuthUser);
            await this.updateRefreshToken(savedAuthUser.id, tokens.refresh_token);

            const { password, refresh_token, ...userResult } = savedAuthUser;

            return resSuccess({
                user: userResult,
                ...tokens
            }, 201);

        } catch (error) {
            handleError(error);
        }
    }

    async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        try {
            const payload = this.jwtService.verify(refreshTokenDto.refresh_token, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });

            const user = await this.authUserRepository.findOne({
                where: { id: payload.sub }
            });

            if (!user || !user.refresh_token) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const refreshTokenMatches = await bcrypt.compare(
                refreshTokenDto.refresh_token,
                user.refresh_token,
            );

            if (!refreshTokenMatches) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const tokens = await this.generateTokens(user);
            await this.updateRefreshToken(user.id, tokens.refresh_token);

            return resSuccess(tokens);
        } catch (error) {
            handleError(error);
        }
    }

    async logout(userId: number) {
        try {
            await this.authUserRepository.update(userId, { refresh_token: undefined });
            return resSuccess({ message: 'Logged out successfully' });
        } catch (error) {
            handleError(error);
        }
    }

    async validateUserById(userId: number): Promise<AuthUser | null> {
        return this.authUserRepository.findOne({
            where: { id: userId, is_active: true }
        });
    }

    private async generateTokens(user: AuthUser) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            related_id: user.related_id,
        };

        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
            }),
        ]);

        return {
            access_token,
            refresh_token,
        };
    }

    private async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
        await this.authUserRepository.update(userId, {
            refresh_token: hashedRefreshToken,
        });
    }
}
