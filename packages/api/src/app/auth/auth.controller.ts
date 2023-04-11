import { User } from '@iq-blog/blog';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Login } from './login';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: Login })
    @Post('login')
    public login(@Req() req: Request): Promise<{ access_token: string }> {
        return this.authService.login(req.user as User);
    }

    @UseGuards(JwtAuthGuard)
    @ApiHeader({
        name: "Authorization",
        description: "Bearer token"
    })
    @Get('profile')
    getProfile(@Req() req: Request): User {
        return req.user as User;
    }
}
