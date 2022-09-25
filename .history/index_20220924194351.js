require('dotenv').config()
const express = require('express')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
//const movies = require('./routes/movies')
const mongoose = require('mongoose')

const app = express()

const url = process.env.MONGODB_LOCAL_URI

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB...')
  })
  .catch(error => console.error('Could not connect to MongoDB...', error))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
//app.use('/api/movies', movies)

app.get('/', (req, res) => {
  res.send('Hello Mario!!!')
})

const PORT = process.env.PORT || 3050

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
