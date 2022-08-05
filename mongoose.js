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
