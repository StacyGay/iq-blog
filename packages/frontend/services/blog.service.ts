import { Blog } from '@iq-blog/blog';
import axios from 'axios';

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
}

export const blogService = new BlogService();