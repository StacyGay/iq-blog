import { User, UserService } from "@iq-blog/blog";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    public async validateUser(userName: string, password: string): Promise<User | null> {
        const user = await this.userService.getUserByName(userName);
        if (user && user.password === password) {
            return user;
        }

        return null;
    } 
}