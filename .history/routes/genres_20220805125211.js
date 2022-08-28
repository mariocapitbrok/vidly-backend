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

/* let genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Thriller' },
] */

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.send(genres)
})

router.get('/:id', async (req, res) => {
  //const genre = genres.find(g => String(g.id) === req.params.id)
  //const genre = await Genre.find({ _id: req.params.id })
  const genre = await Genre.findById(req.params.id)

  if (!genre) return res.status(404).send('Genre with given ID was not found')

  res.send(genre)
})

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  let genre = new Genre({
    //id: genres.length + 1,
    name: req.body.name,
  })

  //genres = [...genres, genre]
  genre = await genre.save()

  res.send(genre)
})

router.put('/:id', async (req, res) => {
  // Update first approach.
  const { error } = validateGenre(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  //const genre = genres.find(g => String(g.id) === req.params.id)
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

  //genre.name = req.body.name

  res.send(genre)
})

router.delete('/:id', async (req, res) => {
  // Delete first approach
  const genre = await Genre.findByIdAndRemove(req.params.id)

  //const genre = genres.find(g => String(g.id) === req.params.id)
  //const genre = await Genre.find({ _id: req.params.id })

  if (!genre) return res.status(404).send('Genre was not found')

  /* const index = genres.indexOf(genre)
  genres.splice(index, 1) */

  //genres = genres.filter(g => String(g.id) !== req.params.id)

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
