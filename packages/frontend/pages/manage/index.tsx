import { Blog } from '@iq-blog/blog';
import { Layout } from '../../components/layout';
import { ReactElement, useEffect, useState } from 'react';
import { blogService } from '../../services/blog.service';
import { BlogListItem } from '../../components/blog-list-item';
import Link from 'next/link';
import { AuthGuard } from '../../components/auth-guard';

export default function ManageBlogLlist(): ReactElement {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
        const getBlogs = async () => {
            const blogs = await blogService.getListByAccount();
            setBlogs(blogs);
        };
        getBlogs();
    }, []);

    return (
        <AuthGuard>
            <Layout>
                <div className="overflow-x-auto">
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
                                        <Link 
                                            className="btn btn-outline btn-danger mx-4" 
                                            href={`manage/delete/${b.blogId}`}
                                        >
                                            Delete
                                        </Link>
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
