import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { UserSafeDto } from './types';

@Controller('user')
export class UserController {

    @UseGuards(JwtGuard)
    @Get("me")
    async getUser(@Request() request): Promise<UserSafeDto> {
        return request.user;
    }

}
