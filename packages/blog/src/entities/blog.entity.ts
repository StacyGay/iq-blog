import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog extends BaseEntity {
    @PrimaryGeneratedColumn()
    blogId: number;

    @Column()
    userId: number;

    @Column()
    title: string;

    @Column()
    content: string;
}
