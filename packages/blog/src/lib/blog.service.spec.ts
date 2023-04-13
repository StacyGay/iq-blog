import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { DataSource, Repository } from 'typeorm';
import { Blog } from '../entities';

const testTitle = 'test title';
const testContent = 'test content';
const testAuthor = 'test author';

describe('BlogService', () => {
    let app: TestingModule;
    let datasource: DataSource;
    let blogRepo: Repository<Blog>;
    const testBlog = {
        userId: 1,
        title: testTitle,
        content: testContent,
        author: testAuthor,
    };

    beforeAll(async () => {
        datasource = await new DataSource({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [Blog],
            synchronize: true,
            logging: false,
        }).initialize();

        blogRepo = datasource.getRepository(Blog);

        app = await Test.createTestingModule({
            controllers: [],
            providers: [
                { 
                    provide: BlogService, 
                    useFactory: () => new BlogService(blogRepo) 
                }
            ],
        }).compile();
    });

    beforeEach(async () => {
        await blogRepo.clear();
        await blogRepo.insert(testBlog);
    });

    describe('getBlogs', () => {
        it('should find blog in repo', async () => {
            const findMock = jest.spyOn(blogRepo, 'find');
            const blogService = app.get(BlogService);
            const blogs = await blogService.getBlogs();
            expect(findMock).toBeCalled();
            expect(blogs.length).toEqual(1);
            expect(blogs[0].title).toEqual(testTitle);
        });
    });

    describe('getUserBlogs', () => {
        it('should return empty on missing userId', async () => {
            const findByMock = jest.spyOn(blogRepo, 'findBy');
            const blogService = app.get(BlogService);
            const blogs = await blogService.getUserBlogs(0);
            expect(findByMock).toBeCalled();
            expect(blogs.length).toEqual(0);
        });

        it('should return blogs for userId', async () => {
            const findByMock = jest.spyOn(blogRepo, 'findBy');
            const blogService = app.get(BlogService);
            const blogs = await blogService.getUserBlogs(testBlog.userId);
            expect(blogs.length).toEqual(1);
            expect(blogs[0].title).toEqual(testBlog.title);
        })
    });

    describe('getBlog', () => {
        it('should return empty on missing blogId', async () => {
            const findOneByMock = jest.spyOn(blogRepo, 'findOneBy');
            const blogService = app.get(BlogService);
            const blog = await blogService.getBlog(0);
            expect(findOneByMock).toBeCalled();
            expect(blog).toBeNull();
        });

        it('should return blog with correct blogId', async () => {
            const blogService = app.get(BlogService);
            const blog = await blogService.getBlog(1);
            expect(blog?.title).toEqual(testBlog.title);
        });
    });

    describe('addBlog', () => {
        it('should throw on missing blog', async () => {
            const blogService = app.get(BlogService);
            expect(blogService.addBlog(null)).rejects.toThrow('Cannot insert missing or empty blog');
        });

        it('should insert a given blog', async () => {
            const insertMock = jest.spyOn(blogRepo, 'insert');
            const blogService = app.get(BlogService);
            const newBlog = new Blog();
            newBlog.userId = 2;
            newBlog.author = 'new author';
            newBlog.title = 'new title';
            newBlog.content = 'new content';

            await blogService.addBlog(newBlog);
            expect(insertMock).toBeCalled();
            expect(newBlog.blogId).toEqual(2);
            const insertedBlog = await blogRepo.findOneBy({ blogId: newBlog.blogId });
            expect(insertedBlog).not.toBeNull();
            expect(insertedBlog.title).toEqual(newBlog.title);
        })
    });

    describe('updateBlog', () => {
        it('should throw on missing blog value', async () => {
            const blogService = app.get(BlogService);
            expect(blogService.updateBlog(0, null)).rejects.toThrow('Cannot update missing or empty blog');
        });

        it('should throw on blogId not in database', async () => {
            const blogService = app.get(BlogService);
            expect(blogService.updateBlog(2, new Blog())).rejects.toThrow('Cannot update blog that does not exist');
        });

        it('should update blog title', async () => {
            const updateMock = jest.spyOn(blogRepo, 'update');
            const existingBlog = await blogRepo.findOneBy({ blogId: 1 });
            existingBlog.title = 'updated';
            const blogService = app.get(BlogService);
            await blogService.updateBlog(existingBlog.blogId, existingBlog);
            expect(updateMock).toBeCalled();
            const updatedBlog = await blogRepo.findOneBy({ blogId: 1});
            expect(updatedBlog.title).not.toEqual(testBlog.title);
        })
    });
});
