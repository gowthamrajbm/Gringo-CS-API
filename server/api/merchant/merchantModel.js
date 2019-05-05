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
  slug: String,
  mobile: {
    type: Number,
    required: true
  },
  merchantType: {
    type: [String],
    enum: ["Restaurant", "Veg", "Non Veg", "Snacks", "Drinks"]
  },
  offer: String,
  address: [{
    branchName: String,
    address: String,
    city: String,
    state: String,
    country: String,
    pin: Number
  }],
  openTime : { 
    type: Number,
    default: (new Date()).getTime() 
  },
  closeTime : { 
    type: Number, 
    default: (new Date()).getTime() 
  },
  rating: {
    type: Number
  },
  reviews: [{
    type: String
  }],
  cuisines: [{
    type: String
  }],
  // timestamps
  createdOn: {
    type:Date,
    default:Date.now
  },
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