const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogRouter.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  blogRouter.delete('/api/blog/:id', async (request,response) => {
    let blogId = request.params.id
    try {
      await Blog.findByIdAndRemove(id)
      response.status(204).end()
    } catch(e) {
      console.log(e)
      response.status(400).send({error:'Problem with ID'})
    }
  })

  module.exports = blogRouter