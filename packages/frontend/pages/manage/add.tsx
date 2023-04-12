import { NewBlogDto } from '../../types/api-types';
import { Layout } from '../../components/layout';
import { ReactElement, useState } from 'react';
import { ErrorAlert } from '../../components/error-alert';
import { blogService } from '../../services/blog.service';
import { useRouter } from 'next/router';

export default function AddNewBlog(): ReactElement {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const postBlog = async () => {
        setError('');
        const dto: NewBlogDto = {
            title,
            content
        };

        try {
            await blogService.postBlog(dto);
        } catch (e) {
            console.log('error posting blog', e);
            setError(e.toString());
            return;
        }

        router.push('/manage/');
    }

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
                    <button className="btn btn-primary" onClick={() => postBlog()}>
                        Submit New Blog
                    </button>
                </div>
                <div className="mt-4">
                    {error ? <ErrorAlert>{error.toString()}</ErrorAlert> : ''}
                </div>
            </div>
        </Layout>
    );
}
