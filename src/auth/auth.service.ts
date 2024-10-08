import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto, UserDto, UserId, UserSafeDto } from 'src/user/types';
import { UserService } from 'src/user/user.service';
import { AuthResponse, LoginResponse, RefreshToken } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  private userByRTMap: Record<RefreshToken, UserId> = {};
  private RTByUserMap: Record<UserId, RefreshToken> = {};

  public async validateUser(username: string, pass: string): Promise<UserSafeDto | null> {
    const user = await this.userService.findByName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async login(user: UserSafeDto): Promise<LoginResponse> {
    const payload = {
      username: user.name,
      sub: user.id,
      created: user.created
    };
    const refreshToken: RefreshToken = this.createToken(user.id);
    return {
      user,
      refreshToken,
      accessToken: this.jwtService.sign(payload)
    }
  }

  public async register(dto: RegisterUserDto): Promise<LoginResponse> {
    const user: UserDto = await this.userService.createUser(dto);
    return this.login(user);
  }

  public async refresh(refreshToken: RefreshToken): Promise<AuthResponse> {
    const userId = this.userByRTMap[refreshToken];
    if (!userId) {
      throw new ForbiddenException('Refresh token is not valid');
    }
    const userById = await this.userService.getById(userId);
    if (!userById) {
      throw new InternalServerErrorException('Bro what the fuck is wrong with me');
    }
    const {user, ...response} = await this.login(userById);
    return response;
  }

  public async forgetSession(user: UserSafeDto): Promise<void> {
    const token = this.RTByUserMap[user.id];
    if (!token) {
      throw new ForbiddenException('No session found');
    }
    this.RTByUserMap[user.id] = undefined;
    this.userByRTMap[token] = undefined;
  }

  private createToken(id: UserId): RefreshToken {
    this.removeTokenIfPresent(id);
    const token = this.generateToken(id);
    this.RTByUserMap[id] = token;
    this.userByRTMap[token] = id;
    return token;
  }
  
  private removeTokenIfPresent(id: UserId): void {
    const rt: RefreshToken = this.RTByUserMap[id];
    if (rt) {
      this.RTByUserMap[id] = undefined;
      this.userByRTMap[rt] = undefined;
    }
  }

  private generateToken(id: UserId): RefreshToken {
    return 'asdasdasd'; // TODO
  }

}
