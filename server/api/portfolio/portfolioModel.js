const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const PortfolioSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('portfolio', PortfolioSchema)