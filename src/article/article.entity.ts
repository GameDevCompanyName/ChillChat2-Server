import { UserId } from "src/user/types";
import { UserDAO } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArticleDAO {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ default: '' })
    rawBody: string;
    @Column({ default: 'Default title' })
    title: string;
    // @ManyToOne(() => UserDAO)
    // authorId: UserId;
}