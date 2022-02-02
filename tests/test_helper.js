const Blog = require('../models/blog')

const initiateblogs = [
    {
        author: 'Aziko',
        title: 'Business',
        url: 'dddd',
        likes: 100,
        date: '2022-02-01T07:23:47.287Z',
        id: '61f8e0031671d5a69f076741'
    },
    {
        author: 'Axror',
        title: 'AI',
        url: 'ai.com',
        likes: 99,
        date: '2022-02-01T07:41:05.484Z',
        id: '61f8e41174a5b308ad1f44a8'
    }
]

const nonexistingid = async () => {
    const blog = new Blog({
        author: 'Tilla',
        title: 'web dev',
        url: 'salom.com',
        likes: 12,
        date: new Date()
    })
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}

const blogsindb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initiateblogs,
    nonexistingid,
    blogsindb
}