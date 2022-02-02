const bcrypt = require('bcrypt')
const blogsRouter = require('express').Router()
const User = require('../models/user')

// gets all users
blogsRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { author: 1, title: 1, likes: 1, url: 1, date: 1, id: 1 })
    res.json(users)
    // res.send('hello father')
})

blogsRouter.post('/', async (req, res) => {
    const body = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()
    res.json(savedUser)
})

module.exports = blogsRouter