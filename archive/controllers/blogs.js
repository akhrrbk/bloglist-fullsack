const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// get
blogsRouter.get('/', (req, res) => {
    Blog.find({})
        .then(blogs => {
            res.json(blogs.map(per => per.toJSON()))
        })
        .catch((error) => {
            console.error(error.message)
        })
})

module.exports = blogsRouter