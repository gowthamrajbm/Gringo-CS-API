const mongoose = require('mongoose'),
    Schema = mongoose.Schema

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
  products: {
    type: String,
    ref: 'product'
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
    enum:['open','close'],
    required:true,
    default:'open'
  }
})

module.exports = mongoose.model('merchant', MerchantSchema)