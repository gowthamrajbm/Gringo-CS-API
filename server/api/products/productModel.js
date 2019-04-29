const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String
  },
  slug: String,
  categoryId: String,
  category: {},
  description: String,
  shortDescription:String,
  image: String,
  tags: [{
      type: String
  }],
  // timestamps
  createdOn: Date,
  updatedOn:{
    type:Date,
    default:Date.now
  },
  // user details
  createdBy:String,
  updatedBy:String
})

module.exports = mongoose.model('product', ProductSchema)