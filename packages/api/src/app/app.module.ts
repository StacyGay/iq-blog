import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Blog, BlogModule, User } from '@iq-blog/blog';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            // host: 'localhost',
            // port: 3306,
            // username: 'root',
            // password: 'root',
            database: 'blog',
            entities: [User, Blog],
            synchronize: true, // TODO: remove for prod env
        }),
        BlogModule,
    ],
    controllers: [AppController, UserController], // TODO: remove AppController and AppService, set swagger to api root
    providers: [AppService],
})
export class AppModule {}
