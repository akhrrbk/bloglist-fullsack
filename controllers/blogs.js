const personRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// GET ALL
personRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { name: 1, username: 1, id: 1 })
    res.json(blogs.map(per => per.toJSON()))
})

// GET with an ID
personRouter.get('/:id', async (req, res) => {
    const result = await Blog.findById(req.params.id)
    if(result){
        res.json(result.toJSON())
    } else {
        res.status(400).end()
    }
})

// POST
personRouter.post('/', async (req, res) => {
    const body = req.body

    if((body.author === undefined) || (body.title === undefined) || (body.url === undefined) || (body.userid === undefined)){
        return res.status(400).json({ error: 'content missing' })
    }

    const user = await User.findById(body.userid)

    const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        date: new Date(),
        user: body.userid
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    console.log('contacat created!')
    res.json(savedBlog)
})

// DELETE
personRouter.delete('/:id', async (req, res) => {
    const result = await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

// PUT
personRouter.put('/:id', async (req, res) => {
    const body = req.body
    const blog = {
        likes: body.likes
    }

    const updatedPhonebook = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedPhonebook)
})

module.exports = personRouter