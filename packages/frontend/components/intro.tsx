import { Blog } from '@iq-blog/blog';
import { ReactElement, useEffect, useState } from 'react';
import { blogService } from '../services/blog.service';
import { BlogListItem } from './blog-list-item';
import Link from 'next/link';

export function Intro(): ReactElement {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
        const getBlogs = async () => {
            const result = await blogService.getList();
            setBlogs(result || []);
        };
        getBlogs();
    }, []);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">
                        Welcome to the over-engineered demo blog platform:   <br /> <i>IQ-Blog</i>!
                    </p>
                    <h3>Top Blog Posts</h3>
                    <hr className="my-4" />
                    <ul className="my-4">
                        {blogs.map((b) => <BlogListItem blog={b} key={b.blogId} />)}
                    </ul>
                    <Link href="/blog" className="btn btn-primary">Browse All Posts</Link>
                </div>
            </div>
        </div>
    );
}
