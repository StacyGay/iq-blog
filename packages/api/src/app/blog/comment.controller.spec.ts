import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { BlogComment, BlogService, CommentService } from '@iq-blog/blog';

describe('CommentController', () => {
    let app: TestingModule;
    const testComment = new BlogComment();
    testComment.commentId = 1;
    testComment.blogId = 1;
    testComment.author = 'test author';

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [CommentController],
        }).useMocker((token) => {
            console.log(token);
            if (token === CommentService) {
                return { getBlogComments: () => [testComment] };
            }
            if (token == BlogService) {
                return {}; // TODO: Fill out any needed mocked methods
            }
        }).compile();
    });

    describe('getBlogs', () => {
        it('should call blog service', async () => {
            const service = app.get(CommentService);
            const controller = app.get(CommentController);
            const getBlogMock = jest.spyOn(service, 'getBlogComments');
            const comments = await controller.getBlogComments("1");
            expect(getBlogMock).toBeCalled();
            expect(comments).toBeDefined();
            expect(comments[0]?.author).toEqual(testComment.author);
        });
    })
});
