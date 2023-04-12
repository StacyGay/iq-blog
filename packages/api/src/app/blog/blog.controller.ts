import { Blog, BlogService, User } from "@iq-blog/blog";
import { Body, Controller, Get, Post, Param, Put, Req, UseGuards, Delete } from "@nestjs/common";
import { ApiParam } from "@nestjs/swagger";
import { Request } from 'express';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    public async postNewBlog(@Body() blog: Blog, @Req() request: Request): Promise<void> {
        const user = request.user as User;
        if (!user) throw new Error('user not found');
        blog.userId = user.userId;
        blog.author = user.username;
        await this.blogService.addBlog(blog);
    }

    @Get('all')
    public getBlogs(): Promise<Blog[]> {
        return this.blogService.getBlogs();
    }

    @ApiParam({
        name: 'blogId',
        description: 'Query blogs by this blogId',
        required: true,
        type: Number
    })
    @Get('all/:blogId')
    public getBlog(@Param('blogId') blogId: string): Promise<Blog> {
        return this.blogService.getBlog(+blogId);
    }

    @Get('account')
    @UseGuards(JwtAuthGuard)
    public getAccountBlogs(@Req() req: Request): Promise<Blog[]> {
        return this.blogService.getUserBlogs((req.user as User).userId);
    }

    @ApiParam({
        name: 'userId',
        description: 'Query blogs by this userId',
        required: true,
        type: Number
    })
    @Get(':userId')
    public getUserBlogs(@Param('userId') userId: string): Promise<Blog[]> {
        return this.blogService.getUserBlogs(+userId);
    }

    @Get(':userId/:blogId')
    public getUserBlog(@Param('userId') userId: string, @Param() blogId: string): Promise<Blog> {
        return this.blogService.getBlog(+blogId);
    }

    @Post(':userId')
    public async addUserBlog(@Param('userId') userId: string, @Body() blog: Blog): Promise<boolean> {
        try {
            await this.blogService.addBlog(blog);
            return true;
        } catch (e) {
            // TODO: Add logging
            console.log(`Error adding blog ${e}`);
            return false;
        }
    }

    @Put(':blogId')
    @UseGuards(JwtAuthGuard)
    public async updateBlog(
        @Param('blogId') blogId, 
        @Body() blog: Blog,
    ): Promise<boolean> {
        try {
            await this.blogService.updateBlog(blogId, blog);
            return true;
        } catch (e) {
            // TODO: Add logging
            console.log(`Error updating blog ${blogId}: ${e}`);
            return false;
        }
    }

    @Delete(':blogId')
    @UseGuards(JwtAuthGuard)
    public async deleteBlog(@Param('blogId') blogId: string): Promise<void> {
        await this.blogService.removeBlog(+blogId);
    }
}