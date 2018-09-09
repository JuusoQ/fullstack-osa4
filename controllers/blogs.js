const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFromRequest = (request) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate()
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(request.body.title)
  try {
    console.log(body)
    const token = getTokenFromRequest(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log(decodedToken)
    if (!token ||  !decodedToken.id) {
      response.status(401).send({
        error: 'Token missing or invalid'
      })
    }

    if (body.title === undefined) {
      response.status(400).send({
        error: 'Title is missing'
      })
    }

    const user = await User.findById(decodedToken.id)

    const blogToAdd = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? false :  body.likes,
      user: user._id
    })

    // const blog = new Blog(body)

    const result = await blogToAdd.save()

    user.blogs = user.blogs.concat(result)
    response.status(201).json(result)
  } catch (e) {
    if (e === 'JsonWebTokenError') {
      response.status(401).json({
        error: 'Problem with web token'
      })
    } else {
      console.log(e)
      response.sendStatus(500).json({
        error: 'Infernal server error'
      })
    }
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    console.log(request.body)
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (e) {
    response.status(400).send({
      error: 'Problem with ID'
    })
  }
})

module.exports = blogRouter