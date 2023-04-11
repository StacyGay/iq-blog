import { Inject, Module } from '@nestjs/common';
import { AdminModule, AdminModuleOptions } from '@adminjs/nestjs';
import { Blog, BlogModule, User } from '@iq-blog/blog';
import { Database, Resource } from '@adminjs/typeorm'
import AdminJS from 'adminjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

AdminJS.registerAdapter({ Database, Resource });

export function adminModuleOptionsFactory(
    authService: AuthService
): AdminModuleOptions | Promise<AdminModuleOptions> {
    const authenticate = async (email: string, password: string) => {
        const user = await authService.validateUser(email, password);
        if (!user) return null;
        return {
            email: user.userName,
            password: user.password,
        };
    }

    return  {
        adminJsOptions: {
            rootPath: '/api/admin',
            loginPath: '/api/admin/login',
            logoutPath: '/api/admin/logout',
            resources: [User, Blog],
        },
        auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'secret',
        },
        sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
        },
    };
}

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Blog]),
        BlogModule,
        AuthModule,
        AdminModule.createAdminAsync({
            imports: [AuthModule],
            useFactory: adminModuleOptionsFactory,
            inject: [AuthService]
        }),
    ],
})
export class AdminSetupModule {}
