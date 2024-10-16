import { UserSafeDto } from "src/user/types";

export class AccessJwtPayload {
    username: string;
    sub: number;
    created: number;
}

export type AccessToken = string;
export type RefreshToken = string;

export class AuthResponse {
    accessToken: AccessToken;
    refreshToken: RefreshToken;
}

export class RefreshTokenRequestDto {
    refreshToken: RefreshToken;
}