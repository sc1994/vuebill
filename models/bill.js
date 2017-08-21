var Mongoose = require('mongoose')

var billModel = new Mongoose.Schema({
  amount: {
    type: Number
  },
  type: {
    type: String
  },
  createAt: {
    type: Date,
    defaule: new Date()
  },
  name: {
    type: String
  }
})

module.exports = Mongoose.model('Bill', billModel)
