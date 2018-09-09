const supertest = require('supertest')
const {app, server} = require('../index')
const User = require('../models/blog')
const api = supertest(app)


describe('New user can be added', () => {

    beforeAll(async () => {
        await User.remove({})
    })

    test('User is added', async () => {
        const newUser = {
            username: 'Juuso 7',
            name:'Juuso',
            password:'1234567',
            adult: true
        }
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
    })

    test('We can get users from the API', async () => {
        await api
            .get('/api/users')
            .expect(200)    
    })
})


afterAll(()=>{
    server.close()
})