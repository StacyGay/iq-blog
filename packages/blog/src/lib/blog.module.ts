import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { BlogService } from './blog.service';
import { User, Blog } from '../entities';


@Module({
    imports: [
        // TypeOrmModule.forRoot({
        //     type: 'sqlite',
        //     // host: 'localhost',
        //     // port: 3306,
        //     // username: 'root',
        //     // password: 'root',
        //     database: 'blog',
        //     entities: [User, Blog],
        //     synchronize: true, // TODO: remove for prod env
        // }),
        TypeOrmModule.forFeature([User, Blog])
    ],
    controllers: [],
    providers: [UserService, BlogService],
    exports: [UserService, BlogService],
})
export class BlogModule {}
