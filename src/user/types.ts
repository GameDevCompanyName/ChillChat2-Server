import { Timestamp } from "src/types/types";

export type UserId = number;

export class UserSafeDto {   
    id: UserId;
    name: string;
    created: Timestamp;
}

export class UserDto extends UserSafeDto {
    password: string;
}

export class RegisterUserDto {
    name: string;
    password: string;
}
