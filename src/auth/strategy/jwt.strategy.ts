import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT } from "../constants";
import { UserId } from "src/user/types";
import { AccessJwtPayload } from "../types";
import { UserDAO } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT.secret
        });
    };

    async validate(payload: AccessJwtPayload): Promise<UserDAO> {
        const id: UserId = payload.sub;
        return this.userService.findById(id);
    }
}