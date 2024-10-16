import { ForbiddenException, Injectable } from "@nestjs/common";
import { UserId } from "src/user/types";
import { RefreshToken } from "./types";
import { InjectRepository } from "@nestjs/typeorm";
import { RefreshTokenDAO } from "./refreshToken.entity";
import { Repository } from "typeorm";

@Injectable()
export class TokenService {
    
    constructor(
        @InjectRepository(RefreshTokenDAO)
        private repository: Repository<RefreshTokenDAO>
    ) { }

    public async createToken(userId: UserId): Promise<RefreshTokenDAO> {
        this.forget(userId);
        const newToken = this.generateToken(userId);
        let dao: RefreshTokenDAO = {
            refreshToken: newToken,
            userId: userId
        };
        dao = this.repository.create(dao);
        dao = await this.repository.save(dao);
        return dao;
    }

    public async forget(userId: UserId): Promise<boolean> {
        const dao: RefreshTokenDAO = await this.findTokenByUser(userId);
        if (dao) {
            this.repository.remove(dao);
            return true;
        } else {
            return false;
        }
    }

    public async refresh(oldToken: RefreshToken): Promise<RefreshTokenDAO> {
        const dao: RefreshTokenDAO = await this.repository.findOneBy({ refreshToken: oldToken });
        if (!dao) {
            throw new ForbiddenException('Refresh token is not valid');
        }
        const newDao: RefreshTokenDAO = await this.createToken(dao.userId);
        return newDao;
    }

    private async findTokenByUser(userId: UserId): Promise<RefreshTokenDAO> {
        return await this.repository.findOneBy({ userId });
    }

    private generateToken(userId: UserId): RefreshToken {
        return (new Date().getUTCMilliseconds().toString()); // TODO generator
    }

}