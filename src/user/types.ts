import { UserDAO } from "./user.entity";

export type UserId = number;

export type UserDTO = Omit<UserDAO, 'password'>;

export class RegisterUserDto {
    name: string;
    password: string;
}
