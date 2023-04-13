import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from './blog.controller';
import { Blog, BlogService } from '@iq-blog/blog';

describe('BlogController', () => {
    let app: TestingModule;
    const testBlog = new Blog();
    testBlog.blogId = 1;
    testBlog.title = 'test blog';

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [BlogController],
        }).useMocker((token) => {
            if (token === BlogService) {
                return { getBlog: () => testBlog };
            }
        }).compile();
    });

    describe('getBlogs', () => {
        it('should call blog service', async () => {
            const service = app.get(BlogService);
            const controller = app.get(BlogController);
            const getBlogMock = jest.spyOn(service, 'getBlog');
            const blog = await controller.getBlog("1");
            expect(getBlogMock).toBeCalled();
            expect(blog.title).toEqual(testBlog.title);
        });
    })
});
