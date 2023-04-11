import { User, UserService } from '@iq-blog/blog';
import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    public getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    public getUser(@Param('id') id: string): Promise<User> {
        return this.userService.getUser(+id);
    }

    @Post()
    public newUser(@Body() user: User): Promise<User> {
        return this.userService.addUser(user);
    }

    @Patch(':id')
    public async updateUser(@Param('id') id: string, @Body() user: User): Promise<void> {
        await this.userService.updateUser(+id, user);
    }
}
