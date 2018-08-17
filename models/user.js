const mongoose = require('mongoose')

const User = mongoose.model('User', {
    username: String,
    password: String, // hashed password
    name: String,
    adult: Boolean
})

