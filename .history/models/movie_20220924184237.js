const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
  },
  numberInStock: Number,
  dailyRentalRate: Number,
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = {
  Movie,
}
