const Joi = require('joi')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
})

const Genre = mongoose.model('Genre', genreSchema)

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.send(genres)
})

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(Number(req.params.id))

  if (!genre) return res.status(404).send('Genre with given ID was not found')

  res.send(genre)
})

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  let genre = new Genre({
    name: req.body.name,
  })

  genre = await genre.save()

  res.send(genre)
})

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
      },
    },
    { new: true }
  )

  if (!genre) return res.status(404).send('Genre was not found')

  res.send(genre)
})

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)

  if (!genre) return res.status(404).send('Genre was not found')

  res.send(genre)
})

const validateGenre = genre => {
  const schema = Joi.object({
    name: Joi.string().required(),
  })

  const result = schema.validate(genre)

  return result
}

module.exports = router
