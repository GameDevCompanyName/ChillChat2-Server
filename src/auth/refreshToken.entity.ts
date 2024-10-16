import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RefreshToken } from "./types";
import { UserId } from "src/user/types";
import { UserDAO } from "src/user/user.entity";

@Entity()
export class RefreshTokenDAO {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    refreshToken: RefreshToken;
    @OneToOne(() => UserDAO)
    userId: UserId;
}