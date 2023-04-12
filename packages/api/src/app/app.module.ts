import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Blog, BlogModule, BlogComment, User } from '@iq-blog/blog';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { BlogController } from './blog/blog.controller';
import { AuthModule } from './auth/auth.module';
import { AdminSetupModule } from './admin/admin-setup.module';
import { CommentController } from './blog/comment.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            // host: 'localhost',
            // port: 3306,
            // username: 'root',
            // password: 'root',
            database: 'blog',
            entities: [User, Blog, BlogComment],
            synchronize: true, // TODO: remove for prod env
        }),
        BlogModule,
        AuthModule,
        AdminSetupModule,
    ],
    controllers: [
        AppController, // TODO: remove AppController and AppService, set swagger to api root
        UserController,
        BlogController,
        CommentController,
    ], 
    providers: [AppService],
})
export class AppModule {}
