const express = require('express')
const Movie = require('../models/movie')

const router = express.Router()

router.get('/', async (req, res) => {
  // Todo: validation

  const movie = await Movie.find({}).sort('name')
  res.send(movie)
})

router.post('/', async (req, res) => {
  // Todo: validation

  const { title, genre, numberInStock, dailyRentalRate } = req.body

  let movie = new Movie({
    title,
    genre: {
      name: genre.name,
    },
    numberInStock,
    dailyRentalRate,
  })

  movie = await movie.save()

  res.send(movie)
})

router.get('/:id', async (req, res) => {
  // Todo: validation

  const movie = await Movie.findById(rea.params.id)

  res.send(movie)
})

router.put('/:id', (req, res) => {
  // Todo: validation
})

router.delete('/:id', (req, res) => {
  // Todo: validation
})

module.exports = router
