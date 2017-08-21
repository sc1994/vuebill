var Mongoose = require('mongoose')

var userModel = new Mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  src: {
    type: String
  },
  meta: {
    updateAt: {
      type: Date,
      defaule: new Date()
    },
    createAt: {
      type: Date,
      defaule: new Date()
    }
  },
  consumeType: Array
})

module.exports = Mongoose.model('User', userModel)
