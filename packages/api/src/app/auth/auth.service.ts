import { User, UserService } from '@iq-blog/blog';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    public async validateUser(
        username: string,
        password: string,
    ): Promise<User | null> {
        const user = await this.userService.getUserByName(username);
        if (user && user.password === password) {
            return user;
        }

        return null;
    }

    public async login(user: User) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
