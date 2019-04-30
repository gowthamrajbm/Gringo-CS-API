const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CouponSchema = new Schema({
    userId:String,
    code:String,//sparse indexing
    type:{
        type:String,
        enum:['cashback','discount','both']
    },
    discount:{
        type: {
            type:String,
            enum:['flat','percentage']
        },
        amount: Number
    },
    cashback: {
        type: {
            type:String,
            enum:['flat','percentage']
        },
        amount: Number
    },
    maxDiscount:Number,
    minOrder: Number,
    validFrom:Date,
    validTo:Date,
    termsAndCondition:String,
    description: String,
    items: [],
    createdOn:{type:Date,default:Date.now()}, //sparse indexing
    createdBy: String,
    updatedBy: String,
    updatedOn: Date,
    status: {
        type:String,
        enum:["active", "inactive"],
        required:true,
        default:"active"
    }
});

CouponSchema.pre('save', function(next){
    var coupon = this;
    Coupon.findOne({coupanCode:coupon.coupanCode,userId:coupon.userId,status:'active'})
    .then((coup) =>{
        console.log(coup);
        if(coup){
            next(new Error('Coupan Code already exist'));
        }
        next();
    })
});

var Coupon = mongoose.model('Coupon', CouponSchema);
module.exports = {Coupon};