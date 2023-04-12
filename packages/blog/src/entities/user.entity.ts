import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ unique: true })
    username: string;

    @Column({ nullable: true })
    password: string;
}
