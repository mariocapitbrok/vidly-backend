const express = require('express')
const { Movie, validate } = require('../models/movie')
const { Genre } = require('../models/genre')

const router = express.Router()

router.get('/', async (req, res) => {
  const movie = await Movie.find({}).sort('name')
  res.send(movie)
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre

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

router.put('/:id', async (req, res) => {
  // Todo: validation

  const { title, genre, numberInStock, dailyRentalRate } = req.body

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title,
        genre: {
          name: genre.name,
        },
        numberInStock,
        dailyRentalRate,
      },
    },
    { new: true }
  )

  res.send(movie)
})

router.delete('/:id', async (req, res) => {
  // Todo: validation

  const movie = await Movie.findByIdAndRemove(req.params.id)

  res.send(movie)
})

module.exports = router
