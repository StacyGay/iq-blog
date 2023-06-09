import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog extends BaseEntity {
    @PrimaryGeneratedColumn()
    blogId: number;

    @Column()
    userId: number;

    @Column({ default: 'admin' })
    author: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ default: () => "CURRENT_TIMESTAMP"})
    timestamp: Date
}
