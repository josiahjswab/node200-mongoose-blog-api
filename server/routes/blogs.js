const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog')

router.get('/', (req, res) => {
  Blog
    .find()
    .then(blogs => res.status(200).json(blogs))
    .catch(err => res.status(500).send(err))
})

router.get('/featured', (req, res) => {
  Blog
    .where({featured: true})
    .then(blogs => res.status(200).json(blogs))
    .catch(err => res.status(500).send(err))
})

router.get('/:id', (req, res) => {
  Blog
    .findById(req.params.id)
    .then(blogs => {
      if(blogs === null) {
        res.status(404).send('NOT FOUND')
      } else {
        res.status(200).json(blogs)
      }   
    })
    .catch(err => res.status(500).send(err))
})

router.post('/', (req, res) => {
  const {title, article, published, featured, author} = req.body
  Blog
    .create(
      {
        title: title,
        article: article,
        published: published,
        featured: featured,
        author: author
      }
    )
    .then(blogs => res.status(201).json(blogs))
    .catch(err => res.status(500).send(err))
})

router.put('/:id', (req, res) => {
  const { title, article, published, featured, author } = req.body;
  Blog
    .findOneAndUpdate({_id: req.params.id}, {$set: {
      title,
      article,
      published,
      featured,
      author
    }})
    .then(blogs => res.status(204).json(blogs))
    .catch(err => res.status(500).send(err))
})

router.delete('/:id', (req, res) => {
  Blog
  .findOneAndRemove({_id: req.params.id})
  .then(blogs => {
    res.status(200).json(blogs)
  })
  .catch(err => res.status(500).send(err))
})

module.exports = router;
