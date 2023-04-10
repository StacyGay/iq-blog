import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../entities';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>,
    ) {}

    public getBlogs(): Promise<Blog[]> {
        return this.blogRepo.find();
    }

    public getBlog(id: number): Promise<Blog | null> {
        return this.blogRepo.findOneBy({ blogId: id });
    }

    public async addBlog(blog: Blog): Promise<void> {
        if (!blog || !blog.title || !blog.content) {
            throw new Error('Cannot insert missing or empty blog');
        }

        try {
            await this.blogRepo.insert(blog);
        } catch (e) {
            // TODO: log error handling here
            console.log(`Error inserting new blog: ${blog.title}`);
            throw new Error(`Error inserting new blog: ${e}`);
        }
    }

    public async removeBlog(id: number): Promise<void> {
        try {
            await this.blogRepo.delete(id);
        } catch (e) {
            // TODO: log error handling here
            console.log(`Error removing blog id: ${id}`);
            throw new Error(`Error removing blog: ${e}`);
        }
    }
}
