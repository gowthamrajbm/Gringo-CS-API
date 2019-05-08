const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const OrderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  customerId :String,
  customer:{
      type: String,
      ref: 'users'
  },
  merchantId: String,
  productId: String,
  product: {
      type: String,
      ref: 'product'
  },
  orderId: String,
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

module.exports = mongoose.model('order', OrderSchema)