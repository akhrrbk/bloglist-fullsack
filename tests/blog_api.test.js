const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogobject = helper.initiateblogs.map(blog => new Blog(blog))
    const promisedarray = blogobject.map(blog => blog.save())
    await Promise.all(promisedarray)
})

describe('exercise 4.9-4.12', () => {
    test('test is returned as json', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    }, 100000)

    test('4.9 id parameter is is not defined as _id', async () => {
        const res = await api.get('/api/blogs')
        const result = res.body[0]
        expect(result.id).toBeDefined()
    }, 100000)

    test('4.10 creating a new blog in the list', async () => {
        const newobject = {
            author: 'Axrorbek',
            title: 'backend development',
            url: 'akhrrbk.com',
            likes: 0,
            date: new Date()
        }
        await api.post('/api/blogs')
            .send(newobject)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const res= await api.get('/api/blogs')
        const contents = res.body.map(per => per.title)

        expect(res.body).toHaveLength(helper.initiateblogs.length + 1)
        expect(contents).toContain('backend development')
    })

    test('4.11 checking if like button misses, its going to be equal to zero', async () => {
        const newobject = {
            author: 'Axrorbek',
            title: 'backend development',
            url: 'akhrrbk.com',
            likes: 0,
            date: new Date()
        }
        await api.post('/api/blogs')
            .send(newobject)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const res= await api.get('/api/blogs')
        expect(res.body[res.body.length - 1].likes).toBe(0)
    })

})

describe('deleting a single blog', () => {
    test('4.13 testing to delete a blog with an id', async () => {
        const notesatstart = await helper.blogsindb()
        const notetodelete = notesatstart[0]
        await api.delete(`/api/blogs/${notetodelete.id}`).expect(204)

        const notesatend = await helper.blogsindb()
        expect(notesatend).toHaveLength(helper.initiateblogs.length - 1)
    })
})

describe('updating a single blog', () => {
    test('4.14 testing to update a blog', async () => {
        const newBlog = {
            author: 'Aziko',
            title: 'SAT',
            url: 'dddd',
            likes: 5,
            date: new Date()
        }

        await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/)

        const allBlogs = await helper.blogsindb()
        const blogtoupdate = allBlogs.find(per => per.title === newBlog.title)

        const updatedblog = {
            ...blogtoupdate,
            likes: blogtoupdate.likes + 1
        }

        await api.put(`/api/blogs/${blogtoupdate.id}`)
            .send(updatedblog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsatend = await helper.blogsindb()
        expect(blogsatend[blogsatend.length - 1].likes).toBe(6)
    })
})

afterAll(() => {
    mongoose.connection.close()
})