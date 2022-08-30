require('dotenv').config()
const express = require('express')
const genres = require('./routes/genres')
const app = express()
const mongoose = require('mongoose')

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

app.get('/', (req, res) => {
  res.send('Hello Mario!!!')
})

const PORT = process.env.PORT || 3050

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
