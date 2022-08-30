const Joi = require('joi')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
})

const Customer = mongoose.model('Customer', customerSchema)

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name')
  res.send(customers)
})

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (!customer)
    return res.status(404).send('Customer with given ID was not found')

  res.send(customer)
})

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  let customer = new Customer({
    name: req.body.name,
  })

  customer = await customer.save()

  res.send(customer)
})

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body)
  if (error) return res.status(400).send(`Error:${error.details[0].message}`)

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
      },
    },
    { new: true }
  )

  if (!customer) return res.status(404).send('Customer was not found')

  res.send(customer)
})

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id)

  if (!customer) return res.status(404).send('Customer was not found')

  res.send(customer)
})

const validateCustomer = customer => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  })

  const result = schema.validate(customer)

  return result
}

module.exports = router
