import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto, UserDto, UserId, UserSafeDto } from 'src/user/types';
import { UserService } from 'src/user/user.service';
import { AccessJwtPayload, AuthResponse, RefreshToken } from './types';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService
  ) {}

  public async validateUser(username: string, pass: string): Promise<UserSafeDto | null> {
    const user = await this.userService.findByName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async login(user: UserSafeDto): Promise<AuthResponse> {
    const refreshToken: RefreshToken = this.tokenService.createToken(user.id);
    return {
      refreshToken,
      accessToken: this.jwtService.sign(this.createJwtPayload(user))
    }
  }

  public async register(dto: RegisterUserDto): Promise<AuthResponse> {
    const user: UserDto = await this.userService.createUser(dto);
    return this.login(user);
  }

  public async refresh(oldToken: RefreshToken): Promise<AuthResponse> {
    const {userId, refreshToken} = this.tokenService.refresh(oldToken);
    const userById = await this.userService.getById(userId);
    return {
      refreshToken,
      accessToken: this.jwtService.sign(this.createJwtPayload(userById))
    }
  }

  public async forgetSession(userId: UserId): Promise<void> {
    this.tokenService.forget(userId);
  }

  private createJwtPayload(user: UserSafeDto): AccessJwtPayload {
    return {
      username: user.name,
      sub: user.id,
      created: user.created
    };
  }

}
