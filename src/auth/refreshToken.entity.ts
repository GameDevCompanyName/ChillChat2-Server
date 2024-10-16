import { Column, Entity, OneToOne } from "typeorm";
import { RefreshToken } from "./types";
import { UserId } from "src/user/types";
import { UserDAO } from "src/user/user.entity";

@Entity()
export class RefreshTokenDAO {
    @Column()
    refreshToken: RefreshToken;
    @OneToOne(() => UserDAO)
    userId: UserId;
}