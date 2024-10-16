import { ForbiddenException, Injectable } from "@nestjs/common";
import { UserId } from "src/user/types";
import { RefreshToken } from "./types";

@Injectable()
export class TokenService {
    private tokenMap: Record<RefreshToken, UserId> = {};

    public createToken(userId: UserId): RefreshToken {
        this.forget(userId);
        const newToken = this.generateToken(userId);
        this.tokenMap[newToken] = userId;
        return newToken;
    }

    public forget(userId: UserId): boolean {
        const token = this.findTokenByUser(userId);
        if (token) {
            this.tokenMap[token] = undefined;
            return true;
        }
        return false;
    }

    public refresh(oldToken: RefreshToken): {
        userId: UserId,
        refreshToken: RefreshToken
    } {
        const userId: UserId = this.tokenMap[oldToken];
        if (!userId) {
            throw new ForbiddenException('Refresh token is not valid');
        }
        const newToken: RefreshToken = this.createToken(userId);
        return {
            userId: userId,
            refreshToken: newToken
        };
    }

    private findTokenByUser(userId: UserId): RefreshToken | undefined {
        return Object.keys(this.tokenMap).find(key => this.tokenMap[key] === userId);
    }

    private generateToken(userId: UserId): RefreshToken {
        return (new Date().getUTCMilliseconds().toString()); // TODO generator
    }

}