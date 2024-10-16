import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDAO } from './user/user.entity';
import { ArticleModule } from './article/article.module';
import { RefreshTokenDAO } from './auth/refreshToken.entity';
import { ArticleDAO } from './article/article.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'testdb.sqlite',
      entities: [UserDAO, RefreshTokenDAO, ArticleDAO],
      synchronize: true
    }),
    ArticleModule
  ]
})
export class AppModule {}
