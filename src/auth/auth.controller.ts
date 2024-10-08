import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/user/types';
import { AuthResponse, LoginResponse, RefreshRequestDto } from './types';
import { UserService } from 'src/user/user.service';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req): Promise<LoginResponse> {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto): Promise<LoginResponse> {
        return this.authService.register(registerUserDto);
    }

    @Post('refresh')
    async refresh(@Body() refreshRequestDto: RefreshRequestDto): Promise<AuthResponse> {
        return this.authService.refresh(refreshRequestDto.refreshToken);
    }

    @UseGuards(JwtGuard)
    @Post('logout')
    async logout(@Request() req): Promise<void> {
        return this.authService.forgetSession(req.user);
    }

}
