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

    public getUserBlogs(userId: number): Promise<Blog[]> {
        return this.blogRepo.findBy({ userId: userId });
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

    public async updateBlog(id: number, blog: Blog): Promise<void> {
        if (!id || !blog) {
            throw new Error('Cannot update missing or empty blog');
        }

        try {
            await this.blogRepo.update({ blogId: id}, blog);
        } catch (e) {
            // TODO: log error handling here
            console.log(`Error updating blogId: ${blog.blogId}`);
            throw new Error(`Error updating blog ${e}`);
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
