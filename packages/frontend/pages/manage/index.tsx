import { Blog } from '@iq-blog/blog';
import { Layout } from '../../components/layout';
import { ReactElement, useEffect, useState } from 'react';
import { blogService } from '../../services/blog.service';
import Link from 'next/link';
import { AuthGuard } from '../../components/auth-guard';

export default function ManageBlogLlist(): ReactElement {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const getBlogs = async () => {
        const blogs = await blogService.getListByAccount();
        setBlogs(blogs);
    };

    const removeBlog = async (blogId: number) => {
        await blogService.removeBlog(blogId);
        getBlogs();
    }

    useEffect(() => {
        getBlogs();
    }, []);

    return (
        <AuthGuard>
            <Layout>
                <div className="overflow-x-auto">
                    <Link className="btn btn-success" href="manage/add">
                        + Add new blog
                    </Link>
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((b) => 
                                <tr key={b.blogId}>
                                    <th>{b.blogId}</th>
                                    <td>{b.title}</td>
                                    <td></td>
                                    <td>
                                        <Link 
                                            className="btn btn-outline btn-warning mx-4" 
                                            href={`manage/edit/${b.blogId}`}
                                        >
                                            Edit
                                        </Link>
                                        <a 
                                            className="btn btn-outline btn-danger mx-4" 
                                            onClick={() => removeBlog(b.blogId)}
                                        >
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </AuthGuard>
    );
}
