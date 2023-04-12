import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BlogComment } from '../entities';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(BlogComment) private readonly commentRepo: Repository<BlogComment>,
    ) {}

    public getBlogComments(blogId: number): Promise<BlogComment[]> {
        return this.commentRepo.findBy({ blogId })
    }

    public getCommentChildren(commentId: number): Promise<BlogComment[]> {
        return this.commentRepo.findBy({ commentId });
    }

    public async addComment(comment: BlogComment): Promise<void> {
        if (!comment || !comment.content) {
            throw new Error('Cannot insert missing or empty comment');
        }

        try {
            await this.commentRepo.insert(comment);
        } catch (e) {
            // TODO: log error handling here
            console.log(`Error inserting new comment: ${comment.commentId}`);
            throw new Error(`Error inserting new comment: ${e}`);
        }
    }

    public async deleteComment(commentId: number): Promise<void> {
        await this.commentRepo.delete({ commentId });
    }
}