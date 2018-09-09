const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    console.log("usersRouter running")
    console.log(request.body === undefined)
    console.log(request.body)
    try {
        const body = request.body  
        const existingUsername = await User.find({username:body.username})
        // 4.16 - tee vielä testit
        if(existingUsername.leng > 0) {
            response.status(400).send({error:'Username exists'})
        }
        if(body.username === undefined) {
            response.status(400).send({error:'Username missing'})
        }
        if(body.password.length < 3) {
            response.status(400).send({error:'Password too short'})
        }

       // console.log(body)

        const saltRounds = 10

        const passwordHash = await bcrypt.hash(body.password,saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            adult: body.adult,
            password: passwordHash
        })

        const savedUser = await user.save()
        response.send(User.format(savedUser))
        
    } catch(e) {
        console.log(e)
        response.status(500).json({error:'Something went wrong'})

    }
})

usersRouter.get('/', async (request,response) => {
    const users = await User.find({})
    response.json(users.map(User.format))
})

module.exports = usersRouter