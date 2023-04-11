import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';

const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
};

const authenticate = async (email: string, password: string) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};

@Module({
    imports: [
        AdminModule.createAdminAsync({
            useFactory: () => ({
                adminJsOptions: {
                    rootPath: '/api/admin',
                    resources: [],
                },
                auth: {
                    authenticate,
                    rootPath: '/api/admin/login',
                    cookieName: 'adminjs',
                    cookiePassword: 'secret',
                },
                sessionOptions: {
                    resave: true,
                    saveUninitialized: true,
                    secret: 'secret',
                },
            }),
        }),
    ],
})
export class AdminSetupModule {}
