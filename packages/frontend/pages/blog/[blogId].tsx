import { ReactElement, useEffect, useState } from 'react';
import { Blog } from '@iq-blog/blog';
import { useRouter } from 'next/router';
import { blogService } from '../../services/blog.service';
import { Layout } from '../../components/layout';
import { Comment } from '../../components/comment';
import { AddComment } from '../../components/add-comment';
import { commentService } from '../../services/comment.service';
import { CommentWithChildren } from '../../types/api-types';

export default function BlogPost(): ReactElement {
    const router = useRouter();
    const { blogId } = router.query;

    const [blogPost, setBlogPost] = useState<Blog | null>(null);
    const [comments, setComments] = useState<CommentWithChildren[]>([]);

    const getBlog = async () => {
        const result = await blogService.getBlog(+blogId);
        setBlogPost(result);
        if (!result?.blogId) return;
        const blogComments = await commentService.getBlogComments(result.blogId);
        setComments(blogComments);
    };

    useEffect(() => {
        getBlog();
    }, [blogId]);

    return (
        <Layout>
            <h3>{blogPost?.title}</h3>
            <h4>{blogPost?.author} - {blogPost?.timestamp?.toString()}</h4>
            <p>{blogPost?.content}</p>
            <div>
                {comments.map((c, i) => (
                    <Comment comment={c} key={i} onAddComment={() => getBlog()} />
                ))}
                <div className="">
                    <AddComment blogId={+blogId} onAddComment={() => getBlog()} />
                </div>
            </div>
        </Layout>
    );
}
