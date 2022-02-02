const infoRouter = require('express').Router()
const Blog = require('../models/blog')

infoRouter.get('/info', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(`database has ${blogs.length} contacts`)
})

module.exports = infoRouter