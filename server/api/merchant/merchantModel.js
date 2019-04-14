const mongoose = require('mongoose'),
    Schema = mongoose.Schema

// merchant or restaurant
const MerchantSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  merchantType: {
    type: String,
    enum: ["Restaurant", "Shop", "Medical"]
  },
  address: [{
    type: String,
    enum: ["Home", "Shop","Other"],
    street: String,
    province: String,
    city: String,
    state: String,
    country: String,
    pin: Number
  }],
  ratings: [{
    type: Number
  }],
  reviews: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  // timestamps
  createdOn: Date,
  updatedOn:{
    type:Date,
    default:Date.now
  },
  // userAccount details
  createdBy:String,
  updatedBy:String,
  status:{
    type:String,
    enum:['active','inactive','deleted'],
    required:true,
    default:'active'
  }
})

module.exports = mongoose.model('merchant', MerchantSchema)