import { CommentService, BlogComment, User, BlogService } from '@iq-blog/blog';
import { Controller, Get, UseGuards, Param, Post, Req, Body } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        private readonly blogService: BlogService
    ) {}

    @ApiParam({
        name: 'blogId',
        description: 'Query comments by this blogId',
        required: true,
        type: Number,
    })
    @Get(':blogId')
    public getUserBlogs(@Param('blogId') blogId: string): Promise<BlogComment[]> {
        return this.commentService.getBlogComments(+blogId);
    }

    @ApiParam({
        name: 'blogId',
        description: 'Post comment to this blogId',
        required: true,
        type: Number,
    })
    @Post(':blogId')
    @UseGuards(JwtAuthGuard)
    public async getAccountBlogs(
        @Req() req: Request,
        @Param('blogId') blogId: string,
        @Body() comment: BlogComment,
    ): Promise<void> {
        if (!comment) throw new Error('Cannot post an empty comment');
        
        const user = req.user as User;
        if (!user) throw new Error('You must be logged in to post comments');

        const blog = await this.blogService.getBlog(+blogId);
        if (!blog) throw new Error('Cannot post a comment to a blog that does not exist');

        comment.author = user.username;
        comment.blogId = blog.blogId;

        return this.commentService.addComment(comment);
    }
}
