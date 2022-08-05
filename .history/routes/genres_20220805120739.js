const Joi = require('joi')
const express = require('express')
const router = express.Router()
require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_LOCAL_URI

mongoose
  .connect(url)
  .then(result => {
    console.log('Connected to MongoDB...')
  })
  .catch(error => console.error('Failed connection to MongoDB...', error))

const genreSchema = mongoose.Schema({
  name: String,
})

const Genre = mongoose.model('Genre', genreSchema)

/* let genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Thriller' },
] */

router.get('/', async (req, res) => {
  const genres = await Genre.find()
  res.send(genres)
})

router.get('/:id', (req, res) => {
  const genre = genres.find(g => String(g.id) === req.params.id)

  if (!genre) return res.status(404).send('Genre with given ID was not found')

  res.send(genre)
})

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  const genre = new Genre({
    //id: genres.length + 1,
    name: req.body.name,
  })

  //genres = [...genres, genre]
  genre.save()

  res.send(genre)
})

router.put('/:id', (req, res) => {
  const genre = genres.find(g => String(g.id) === req.params.id)

  if (!genre) return res.status(404).send('Genre was not found')

  const { error } = validateGenre(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  genre.name = req.body.name

  res.send(genre)
})

router.delete('/:id', (req, res) => {
  const genre = genres.find(g => String(g.id) === req.params.id)

  if (!genre) return res.status(404).send('Genre was not found')

  /* const index = genres.indexOf(genre)
  genres.splice(index, 1) */

  genres = genres.filter(g => String(g.id) !== req.params.id)

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
