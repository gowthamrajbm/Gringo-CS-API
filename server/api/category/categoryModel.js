const mongoose = require('mongoose'),
    Schema = mongoose.Schema

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true  
  },

  categoryType: {
    type: String,
    enum: []
  }
})

module.exports = mongoose.model('category', CategorySchema)