const Joi = require('joi')
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

const validateGenre = genre => {
  const schema = Joi.object({
    name: Joi.string().required(),
  })

  const result = schema.validate(genre)

  return result
}

module.exports = {
  Genre,
  validate: validateGenre,
}
