import { ReactElement } from 'react';
import { AddComment } from './add-comment';
import { CommentWithChildren } from '../types/api-types';

interface CommentProps {
    comment: CommentWithChildren;
    onAddComment?: () => void;
}

export function Comment({ comment, onAddComment }: CommentProps): ReactElement {
    return (
        <div className="ml-2 mt-2">
            <div className="badge badge-accent badge-outline">{comment.author}</div>
            <div className="chat chat-start my-4">
                <div className="chat-bubble">{comment.content}</div>
            </div>
            <div className="mb-2">
                <AddComment
                    blogId={comment.blogId}
                    parentId={comment.commentId}
                    onAddComment={onAddComment}
                >
                    Reply
                </AddComment>
            </div>
            <div className="ml-16 mb-2">
                {(comment?.children || []).map((c, i) => (
                    <Comment comment={c} onAddComment={onAddComment} key={i} />
                ))}
            </div>
        </div>
    );
}
