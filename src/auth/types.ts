export class AccessJwtPayload {
    sub: number;
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