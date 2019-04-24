const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  validator = require('validator');

const UserSchema = new Schema({
  name: {
    type: String
  },
  bio: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String,
    lowercase: true,
		trim:true,
		validate:{
			isAsync:true,
			validator:validator.isEmail,
			message:'{VALUE} is not a valid email'
		}
  },
  userType: {
    type: String,
    enum: ['user', 'admin', 'merchant','delivery']
  },
  token: String,
  mobile: {
    type: Number,
    required: true
  },
  address: String,
  cardDetails: [],
  // referral Code
	referralCode:{
    type:String,
    uppercase:true
  },
  referredBy:{
      userProfile: String,
      referralCode:{
        type:String,
        uppercase:true
      }
  },
  socialMediaAccounts:[{
    accountType:{
      type:String,
      enum:['Twitter','Facebook','Instagram','LinkedIn','Youtube']
    },
    url:String
  }],
  googleId:String,
  facebookId:String,
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

UserSchema.pre('save', function(next){
  if(!this.isModified('password'))
    return next()
  this.password = this.encryptPassword(this.password)
  next()
})

UserSchema.methods = {
  authenticate: function(plainTextPword){
    return bcrypt.compareSync(plainTextPword, this.password)
  },
  encryptPassword: function(plainTextPword){
    if(!plainTextPword){
      return ''
    } else {
      var salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(plainTextPword, salt)
    }
  },
  toJson: function(){
    var obj = this.toObject()
    delete obj.password
    return obj
  }
}

module.exports = mongoose.model('user', UserSchema)