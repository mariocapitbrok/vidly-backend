const mongoose = require('mongoose')
const { genreSchema } = require('./genre')

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = {
  Movie,
}
