import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { User } from "@iq-blog/blog";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    public async validate(userName: string, password: string): Promise<User | null> {
        const user = await this.authService.validateUser(userName, password);
        if (!user) {
            // TODO: log auth failure
            throw new UnauthorizedException();
        }

        return user;
    }
}