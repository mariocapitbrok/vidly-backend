const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
  title: String,
  genre: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
  },
  numberInStock: Number,
  dailyRentalRate: Number,
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = {
  Movie,
}
