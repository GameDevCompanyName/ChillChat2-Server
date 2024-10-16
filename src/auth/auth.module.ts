import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenDAO } from './refreshToken.entity';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT.secret,
      signOptions: { expiresIn: '240s' }
    }),
    TypeOrmModule.forFeature([RefreshTokenDAO])
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
