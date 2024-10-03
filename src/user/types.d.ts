export type UserId = number;

export class UserDto extends UserSafeDto {
    password: string;
}

export class UserSafeDto {   
    id: UserId;
    name: string;
}