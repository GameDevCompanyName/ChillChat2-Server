import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserSafeDto } from 'src/user/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  public async validateUser(username: string, pass: string): Promise<UserSafeDto | null> {
    const user = await this.userService.findByName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async login(user: UserSafeDto) {
    const payload = {
      username: user.name,
      sub: user.id
    };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

}
