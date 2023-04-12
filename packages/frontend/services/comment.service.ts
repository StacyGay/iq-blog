import axios from 'axios';
import { BlogComment } from '@iq-blog/blog';
import { CommentDto, CommentWithChildren } from '../types/api-types';

class CommentService {
    public async getBlogComments(blogId: number): Promise<CommentWithChildren[]> {
        try {
            const { data } = await axios.get<BlogComment[]>(
                `/api/comment/${blogId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            );
    
            return this.parseComments(data);
        } catch(e) { 
            // todo add logging
            console.log('error pulling blog comments', e);
        }
        
        return [];
    }

    private parseComments(allComments: BlogComment[]): CommentWithChildren[] {
        const parsedComments = allComments.map<CommentWithChildren>((c) => {
            return {
                commentId: c.commentId,
                blogId: c.blogId,
                parentId: c.parentId,
                author: c.author,
                content: c.content,
                children: []
            }
        });
        const map = new Map(parsedComments.map((c) => [c.commentId, c]));
        for (const c of parsedComments) {
            if (!c.parentId || !map.has(c.parentId)) continue;
            map.get(c.parentId).children.push(c);
        }
        const rootComments = parsedComments.filter((c) => !c.parentId);
        return rootComments;
    }

    public async postComment(blogId: number, comment: CommentDto): Promise<void> {
        try {
            await axios.post(
                `/api/comment/${blogId}`,
                comment,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            )
        } catch (e) {
            console.log('error adding comment');
            throw new Error('you must be logged in to post comments');
        }
    }
}

export const commentService = new CommentService();