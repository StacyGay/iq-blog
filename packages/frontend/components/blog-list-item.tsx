import { Blog } from '@iq-blog/blog';
import Link from 'next/link';
import { ReactElement } from 'react';

export interface BlogListItemProps {
    blog: Blog;
}

export function BlogListItem({ blog }: BlogListItemProps): ReactElement {
    return (
        <li>
            <Link className='link link-accent' href={`blog/${blog.blogId}`}>{blog.title}</Link>
        </li>
    );
}
