import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleDAO } from './article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleDAO])
  ],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
