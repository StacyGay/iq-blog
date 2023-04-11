import { User } from "@iq-blog/blog";
import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login(@Req() req: Request): Promise<User> {
        return req.user as User;
    }
}