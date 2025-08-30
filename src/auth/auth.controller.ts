import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({
        summary: 'Register new user',
        description: 'Create a new user account with specified role (admin, doctor, staff, patient)'
    })
    @ApiResponse({
        status: 201,
        description: 'User successfully registered',
        schema: {
            example: {
                statusCode: 201,
                message: 'Success',
                data: {
                    user: {
                        id: 1,
                        first_name: 'John',
                        last_name: 'Doe',
                        email: 'john.doe@example.com',
                        role: 'patient'
                    },
                    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    @ApiResponse({ status: 409, description: 'Email already exists' })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('create-first-admin')
    @ApiOperation({
        summary: 'Create first super admin',
        description: 'Create the first super admin when no admins exist in the system'
    })
    @ApiResponse({
        status: 201,
        description: 'First super admin created successfully',
        schema: {
            example: {
                statusCode: 201,
                message: 'Birinchi super admin muvaffaqiyatli yaratildi',
                data: {
                    user: {
                        id: 1,
                        first_name: 'Jasur',
                        last_name: 'Karimov',
                        email: 'admin@gmail.com',
                        role: 'admin',
                        is_super_admin: true
                    },
                    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    @ApiResponse({ status: 409, description: 'Admin already exists' })
    createFirstAdmin(@Body() registerDto: RegisterDto) {
        return this.authService.createFirstAdmin(registerDto);
    }

    @Post('login')
    @ApiOperation({
        summary: 'User login',
        description: 'Authenticate user and get access tokens'
    })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        schema: {
            example: {
                statusCode: 200,
                message: 'Success',
                data: {
                    user: {
                        id: 1,
                        first_name: 'John',
                        last_name: 'Doe',
                        email: 'john.doe@example.com',
                        role: 'patient'
                    },
                    access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    @ApiOperation({
        summary: 'Refresh access token',
        description: 'Get new access token using refresh token'
    })
    @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
    @ApiResponse({ status: 401, description: 'Invalid refresh token' })
    refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshTokens(refreshTokenDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'User logout',
        description: 'Logout user and invalidate refresh token'
    })
    @ApiResponse({ status: 200, description: 'Logout successful' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    logout(@GetUser('id') userId: number) {
        return this.authService.logout(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({
        summary: 'Get user profile',
        description: 'Get current authenticated user profile information'
    })
    @ApiResponse({
        status: 200,
        description: 'Profile retrieved successfully',
        schema: {
            example: {
                user: {
                    id: 1,
                    email: 'john.doe@example.com',
                    role: 'patient',
                    related_id: 5
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    getProfile(@GetUser() user: any) {
        return { user };
    }
}
