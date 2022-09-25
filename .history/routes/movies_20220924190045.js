const express = require('express')
const Movie = require('../models/movie')

const router = express.Router()

router.get('/', async (req, res) => {
  // Todo: validation

  const movie = await Movie.find({}).sort('name')
  res.send(movie)
})

router.post('/', (req, res) => {
  // Todo: validation
})

router.get('/:id', (req, res) => {
  // Todo: validation
})

router.put('/:id', (req, res) => {
  // Todo: validation
})

router.delete('/:id', (req, res) => {
  // Todo: validation
})

module.exports = router
