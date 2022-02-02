const mongoose = require('mongoose')
const config = require('../utils/config')
const uniqueValidator = require('mongoose-unique-validator')

const url = config.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
    .then(res => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('cannot connect to mongoDB', error.message)
    })

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User