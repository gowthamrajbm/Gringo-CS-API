const mongoose = require('mongoose'),
    Schema = mongoose.Schema

// merchant or restaurant
const MerchantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
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
  }]
})

module.exports = mongoose.model('merchant', MerchantSchema)