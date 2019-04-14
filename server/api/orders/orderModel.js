const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const OrderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  customerId :Schema.Types.ObjectId,
  customer:{
      type: Schema.Types.ObjectId,
      ref: 'contact'
  },
  productId: Schema.Types.ObjectId,
  product: {
      type: Schema.Types.ObjectId,
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