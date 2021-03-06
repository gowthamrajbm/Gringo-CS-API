const mongoose = require('mongoose'),
    Schema = mongoose.Schema

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true  
  },
  categoryType: {
    type: String,
    enum: ["North Indian","Chinese","Continental", "Meals", "Starter", "Main Course"]
  },
  isFeatured: {
    type:Boolean, 
    default:false
  },
  slug: String,
  rank: Number,
  description: String,
  // timestamps
  createdOn: Date,
  updatedOn:{
    type:Date,
    default:Date.now
  },
  // userAccount details
  createdBy:String,
  updatedBy:String
})

module.exports = mongoose.model('category', CategorySchema)