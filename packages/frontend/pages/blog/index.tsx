import { ReactElement, useEffect, useState } from 'react';
import { Layout } from '../../components/layout';
import { Blog } from '@iq-blog/blog';
import { blogService } from '../../services/blog.service';
import { BlogListItem } from '../../components/blog-list-item';

export default function BlogIndex(): ReactElement {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const getBlogs = async () => {
            const blogs = await blogService.getList();
            setBlogs(blogs);
        };

        getBlogs();
    }, []);

    return (
        <Layout>
            <h2>Blog Posts</h2>
            <ul>
                {blogs.map((b) => <BlogListItem blog={b} key={b.blogId}></BlogListItem>)}
            </ul>
        </Layout>
    );
}
