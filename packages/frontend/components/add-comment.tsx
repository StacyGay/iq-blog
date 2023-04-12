import { PropsWithChildren, ReactElement, useState } from 'react';
import { commentService } from '../services/comment.service';
import { CommentDto } from '../types/api-types';
import { ErrorAlert } from './error-alert';

interface AddCommentProps extends PropsWithChildren {
    blogId: number;
    parentId?: number;
    onAddComment?: () => void;
}

export function AddComment({
    blogId,
    parentId,
    onAddComment,
    children,
}: AddCommentProps): ReactElement {
    const [content, setContent] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const postComment = async () => {
        setErrorMessage(null);
        const comment: CommentDto = {
            blogId,
            parentId,
            content,
        };

        try {
            await commentService.postComment(blogId, comment);
        } catch (e) {
            setErrorMessage(e.toString());
        }

        setContent('');
        if (onAddComment) onAddComment();
    };

    return (
        <div>
            {errorMessage ? (
                <div className="w-96 my-2">
                    <ErrorAlert>{errorMessage}</ErrorAlert>
                </div>
            ) : (
                ''
            )}
            <div>
                <textarea
                    className="textarea textarea-primary"
                    placeholder="comment"
                    onChange={(e) => setContent(e.target.value)}
                    rows={1}
                    cols={40}
                    value={content}
                />
            </div>
            <div>
                <button className="btn btn-sm btn-success" onClick={() => postComment()}>
                    {children || 'Add Comment'}
                </button>
            </div>
        </div>
    );
}
