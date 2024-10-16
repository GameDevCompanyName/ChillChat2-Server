import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDTO } from './types';
import { ArticleDAO } from './article.entity';

@Controller('article')
export class ArticleController {

    constructor(private service: ArticleService) { }

    @Get('list')
    public async getAllArticles(): Promise<ArticleDTO[]> {
        const daos: ArticleDAO[] = await this.service.getAllArticles();
        return daos.map(this.createDTO);
    }

    @Get('create')
    public async create(): Promise<ArticleDTO> {
        const dao = await this.service.create();
        return this.createDTO(dao);
    }

    private createDTO(dao: ArticleDAO): ArticleDTO {
        return {
            id: dao.id,
            body: dao.rawBody,
            title: dao.title
        };
    }

}
