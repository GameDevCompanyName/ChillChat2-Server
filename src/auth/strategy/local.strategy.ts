import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UserDAO } from "src/user/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<UserDAO> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('User not found or pass is wrong');
        }
        return user;
    }
}