import { useRouter } from "next/router";
import { blogService } from "../../../services/blog.service";
import { ReactElement, useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import { Blog } from "@iq-blog/blog";
import { ErrorAlert } from "../../../components/error-alert";
import { EditBlogDto } from "../../../types/api-types";

export default function EditBlog(): ReactElement {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const { blogId } = router.query;

    let blog: Blog | null;

    useEffect(() => {
        const getBlog = async () => {
            blog = await blogService.getBlog(+blogId);
            if (!blog) return;
            setTitle(blog.title);
            setContent(blog.content);
        }
        
        getBlog();
    }, [blogId]);

    const updateBlog = async () => {
        const dto: EditBlogDto = {
            blogId: +blogId,
            title,
            content,
        };

        try {
            await blogService.updateBlog(dto)
        } catch (e) {
            setError(e.toString());
            return;
        }
        
        router.push('/manage');
    };

    return (
        <Layout>
            <div className="p-2">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="title"
                        className="input input-bordered"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Blog Content</span>
                    </label>
                    <textarea
                        className="textarea textarea-primary"
                        placeholder="blog content"
                        onChange={(e) => setContent(e.target.value)}
                        rows={8}
                        cols={80}
                        value={content}
                    />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary" onClick={() => updateBlog()}>
                        Update blog post
                    </button>
                </div>
                <div className="mt-4">
                    {error ? <ErrorAlert>{error.toString()}</ErrorAlert> : ''}
                </div>
            </div>
        </Layout>
    )
}