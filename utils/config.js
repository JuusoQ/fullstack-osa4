if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let PORT = process.env.PORT 
let mongoUrl = process.env.MONGO_URI 

if(process.env.NODE_ENV === 'test') {
    PORT = process.env.TEST_PORT
    mongoUrl = process.env.MONGO_URI
}

module.exports = {
    PORT,
    mongoUrl
}