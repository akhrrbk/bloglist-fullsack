const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

console.log('app.js: connectng to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('app.js: connected to mongoDB')
    })
    .catch((error) => {
        console.error('error connecting to mongoDB', error.message)
    })

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(middleware.requestLogger)

app.use('./api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandle)

module.exports = app