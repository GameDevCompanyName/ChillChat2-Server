import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto, UserId } from 'src/user/types';
import { UserService } from 'src/user/user.service';
import { AccessJwtPayload, AuthResponse, RefreshToken } from './types';
import { TokenService } from './token.service';
import { UserDAO } from 'src/user/user.entity';
import { RefreshTokenDAO } from './refreshToken.entity';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService
  ) {}

  public async validateUser(username: string, pass: string): Promise<UserDAO | null> {
    const user = await this.userService.findByName(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  public async login(user: UserDAO): Promise<AuthResponse> {
    const tokenDao: RefreshTokenDAO = await this.tokenService.createToken(user.id);
    return {
      refreshToken: tokenDao.refreshToken,
      accessToken: this.jwtService.sign(this.createJwtPayload(user))
    };
  }

  public async register(dto: RegisterUserDto): Promise<AuthResponse> {
    const user: UserDAO = await this.userService.createUser(dto);
    return this.login(user);
  }

  public async refresh(oldToken: RefreshToken): Promise<AuthResponse> {
    const tokenDao: RefreshTokenDAO = await this.tokenService.refresh(oldToken);
    const userDao: UserDAO = await this.userService.findById(tokenDao.userId);
    return {
      refreshToken: tokenDao.refreshToken,
      accessToken: this.jwtService.sign(this.createJwtPayload(userDao))
    };
  }

  public async forgetSession(userId: UserId): Promise<void> {
    this.tokenService.forget(userId);
  }

  private createJwtPayload(user: UserDAO): AccessJwtPayload {
    return {
      sub: user.id
    };
  }

}
