const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: String,
    password: String, // hashed password
    name: String,
    adult: Boolean,
    blogs: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
})

userSchema.statics.format = (user) => {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        adult: user.adult,
        blogs: user.blogs
    }
}

const User = mongoose.model('User',userSchema)

module.exports = User