const Joi = require('joi')
const express = require('express')
const router = express.Router()

let genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Thriller' },
]

router.get('/api/genres', (req, res) => {
  res.send(genres)
})

router.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => String(g.id) === req.params.id)

  if (!genre) return res.status(404).send('Genre with given ID was not found')

  res.send(genre)
})

router.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  const newGenre = {
    id: genres.length + 1,
    name: req.body.name,
  }

  genres = [...genres, newGenre]

  res.send(newGenre)
})

router.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => String(g.id) === req.params.id)

  if (!genre) return res.status(404).send('Genre was not found')

  const { error } = validateGenre(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  genre.name = req.body.name

  res.send(genre)
})

router.delete('/api/genres/:id', (req, res) => {
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
