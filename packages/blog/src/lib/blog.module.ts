import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { BlogService } from './blog.service';
import { User, Blog, BlogComment } from '../entities';
import { CommentService } from './comment.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([User, Blog, BlogComment])
    ],
    controllers: [],
    providers: [UserService, BlogService, CommentService],
    exports: [UserService, BlogService, CommentService],
})
export class BlogModule {}
