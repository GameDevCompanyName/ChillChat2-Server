import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT } from "../constants";
import { UserSafeDto } from "src/user/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT.secret
        });
    };

    async validate(payload: any): Promise<UserSafeDto> {
        return { id: payload.sub, name: payload.username };
    }
}