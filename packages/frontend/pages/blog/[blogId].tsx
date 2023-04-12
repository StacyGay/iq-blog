import { ReactElement, useEffect, useState } from 'react';
import { Blog } from '@iq-blog/blog';
import { useRouter } from 'next/router';
import { blogService } from '../../services/blog.service';
import { Layout } from '../../components/layout';

export default function BlogPost(): ReactElement {
    const router = useRouter();
    const { blogId } = router.query;

    const [blogPost, setBlogPost] = useState<Blog | null>(null);
    useEffect(() => {
        const getBlog = async () => {
            const result = await blogService.getBlog(+blogId);
            setBlogPost(result);
        };
        getBlog();
    }, [blogId]);

    return (
        <Layout>
            <h3>{blogPost?.title}</h3>
            <h4>{blogPost?.userId}</h4>
            <p>
                {blogPost?.content}
            </p>
        </Layout>
    );
}
