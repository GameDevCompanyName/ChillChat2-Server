import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserId } from './types';

@Entity()
export class UserDAO {
    @PrimaryGeneratedColumn()
    id: UserId;
    @Column({ unique: true })
    name: string;
    @Column()
    password: string;
    @Column({ update: false, type: 'time' })
    created: Date;
}