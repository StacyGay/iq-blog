import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ unique: true })
    userName: string;

    @Column()
    displayName: string;

    @Column({ nullable: true })
    password: string;
}
