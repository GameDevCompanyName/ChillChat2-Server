import { Injectable } from '@nestjs/common';
import { ArticleDAO } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(ArticleDAO)
        private repository: Repository<ArticleDAO>
    ) { }

    public async getAllArticles(): Promise<ArticleDAO[]> {
        return this.repository.find();
    }

    public async create(): Promise<ArticleDAO> {
        const newArticle: Partial<ArticleDAO> = {};
        let newDao = this.repository.create(newArticle);
        newDao = await this.repository.save(newDao);
        return newDao;
    }

}
