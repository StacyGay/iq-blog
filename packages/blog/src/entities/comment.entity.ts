import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlogComment extends BaseEntity {
    @PrimaryGeneratedColumn()
    commentId: number;

    @Column()
    blogId: number;

    @Column({ nullable: true })
    parentId: number;

    @Column({ default: 'admin' })
    author: string;

    @Column()
    content: string;
}
