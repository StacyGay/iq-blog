import { Blog } from '@iq-blog/blog';
import axios from 'axios';
import { EditBlogDto, NewBlogDto } from '../types/api-types';

class BlogService {
    public async getList(): Promise<Blog[]> {
        const { data } = await axios.get<Blog[]>(
            '/api/blog/all',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        );

        return data;
    }

    public async getListByUser(userId?: number): Promise<Blog[]> {
        const { data } = await axios.get<Blog[]>(
            `/api/blog/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        );

        return data;
    }

    public async getListByAccount(): Promise<Blog[]> {
        try {
            const { data } = await axios.get<Blog[]>(
                '/api/blog/account',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            );
    
            return data;
        } catch(e) { 
            // todo add logging
            console.log('error pulling account blogs', e);
        }
        
        return [];
    }

    public async getBlog(blogId: number): Promise<Blog> {
        if (!blogId || isNaN(blogId))
            return null;

        const { data } = await axios.get<Blog>(
            `/api/blog/all/${blogId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        );

        return data;
    }

    public async postBlog(blog: NewBlogDto): Promise<void> {
        if (!blog) throw new Error('Cannot create empty blog post');

        await axios.post(
            `/api/blog`,
            blog,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        );
    }

    public async updateBlog(blog: EditBlogDto): Promise<void> {
        if (!blog || !blog.blogId) throw new Error('cannot update empty blog post');

        await axios.put(
            `/api/blog/${blog.blogId}`,
            blog,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        )
    }

    public async removeBlog(blogId: number): Promise<void> {
        if (!blogId) throw new Error('cannot remove blog without a blogId');
        await axios.delete(`/api/blog/${blogId}`);
    }
}

export const blogService = new BlogService();