import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { format } from 'date-fns';

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
