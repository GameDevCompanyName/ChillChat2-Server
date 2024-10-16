import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDAO } from './user/user.entity';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'testdb.sqlite',
      entities: [UserDAO],
      synchronize: true
    }),
    ArticleModule
  ]
})
export class AppModule {}
