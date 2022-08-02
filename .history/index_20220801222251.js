require('dotenv').config()
const express = require('express')
const Joi = require('joi')
const app = express()

app.use(express.json())

let genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Thriller' },
]

app.get('/', (req, res) => {
  res.send('Hello Mario!!!')
})

app.get('/api/genres', (req, res) => {
  res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => String(g.id) === req.params.id)

  if (!genre) return res.status(404).send('Genre was not found')

  res.send(genre)
})

app.post('/api/genres', (req, res) => {
  const error = validateGenre(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  const newGenre = {
    id: genres.length + 1,
    name: req.body.name,
  }

  genres = [...genres, newGenre]

  res.send(newGenre)
})

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => String(g.id) === req.params.id)

  if (!genre) return res.status(404).send('Genre was not found')

  const error = validateGenre(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  genre.name = req.body.name

  res.send(genre)
})

const validateGenre = genre => {
  const schema = Joi.object({
    name: Joi.string().required(),
  })

  const { error } = schema.validate(genre)

  return error
}

const PORT = process.env.PORT || 3050

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
