const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const saltRounds = 10

        const passwordHash = await bcrypt.hash(body.password,saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            adult: body.adult,
            password: passwordHash,
        })

        const savedUser = await user.save()
        response.send(savedUser)
        
    } catch(e) {
        console.log(e)
        response.status(500).json({error:'Something went wrong'})

    }
})

usersRouter.get('/', async () => {
    const users = await User.find({})
    
})

module.exports = usersRouter