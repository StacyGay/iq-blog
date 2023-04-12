export interface SignupDto {
    username: string;
    password: string;
}

export interface NewBlogDto {
    title: string;
    content: string;
}

export interface EditBlogDto extends NewBlogDto {
    blogId: number;
}

export interface CommentDto {
    blogId?: number;
    parentId?: number;
    author?: string;
    content: string;
}

export interface CommentWithChildren extends CommentDto {
    commentId: number;
    children: CommentWithChildren[];
}