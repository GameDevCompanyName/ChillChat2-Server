import { UserSafeDto } from "src/user/types";

export type AccessToken = string;
export type RefreshToken = string;

export class AuthResponse {
    accessToken: AccessToken;
    refreshToken: RefreshToken;
}

export class LoginResponse extends AuthResponse {
    user: UserSafeDto;
}

export class RefreshRequestDto {
    refreshToken: RefreshToken;
}