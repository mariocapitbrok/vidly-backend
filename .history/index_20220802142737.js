require('dotenv').config()
const express = require('express')
const genres = require('./routes/genres')
const app = express()

app.use(express.json())

app.use('/api/genres', genres)

app.get('/', (req, res) => {
  res.send('Hello Mario!!!')
})

const PORT = process.env.PORT || 3050

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
