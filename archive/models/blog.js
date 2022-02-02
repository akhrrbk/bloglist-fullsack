const config = require('../utils/config')
const mongoose = require('mongoose')

const url = config.MONGODB_URI
console.log(`model-blog: connecting to ${url}`)

mongoose.connect(url)
    .then(res => {
        console.log('connected to mongoDB')
    })
    .catch((error) => {
        console.log(`cannot connect to mongoDB: ${error.message}`)
    })

const blogSchema = new mongoose.Schema({
    author: String,
    title: String,
    url: String,
    likes: Number,
    date: Date,
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)