const supertest = require('supertest')
const {app, server} = require('../index')
const Blog = require('../models/blog')
const api = supertest(app)

const {listOfMultipleBlogs,nonExistingBlog,blogsInDB} = require('./test_helper')

describe('GET /api/blogs works as expected', () => {

    beforeAll(async () => {
        await Blog.remove({})
        
        const blogs = listOfMultipleBlogs.map(b => new Blog(b))
        await Promise.all(blogs.map(blog => blog.save()))
        
    })

    test('GET /api/blogs size of returned data is = 1', async () => {
        let response = await api.get('/api/blogs')

        expect(response.body.length).toBe(listOfMultipleBlogs.length)
    })
    test('GET /api/blogs are returned as json', async ()=> {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type',/application\/json/)
    })
})

describe('POST is working', () => {
    test('A new blog is added with status 201', async () => {
        const newBlog = {
            _id: '5a422aa71b54a676234d17f1',
            title: 'Great blog about something',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            user: '5b7f064e67e394b2d7101084'
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    test('DB has +1 blogs after new insert', async () => {
        let response = await api.get('/api/blogs')
        expect(response.body.length).toBe(listOfMultipleBlogs.length + 1)
    })
})
// tehtävä 4.13 (tsekkaa 4.12 ja 4.14 vielä)
describe('DELETE works as expected', () => {

    test('Delete with malformatted ID returns HTTP status code 400', async () => {
        await api // 5a422ba71b54a676234d17cc
            .delete('/api/blogs/0987')
            .expect(400)
    })

})


afterAll(() => {
    server.close()
})