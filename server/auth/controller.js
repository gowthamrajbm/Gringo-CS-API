const uuidv4 = require('uuid/v4'),
	gravatar = require('gravatar'),
	bcrypt = require('bcryptjs'),
	config = require('../config/config'),
  jwt = require('jsonwebtoken'),
  User = require('../api/user/userModel');

module.exports = {
    register: async (req, res, next) => {
      if(!req.body.name && !req.body.email){
        return res.status(400).json({ message: 'Name or Email not found'})
      }
      let us = await User.find()
      const id = us[0]._id
      console.log(id)
      const obj = {
        email: req.body.email,
        name: req.body.name
      }
      let referralCode = `${req.body.name.toUpperCase().split(' ').join('').substring(0, 4)}${uuidv4().substring(0, 4).toUpperCase()}`
      const avatar = gravatar.url(obj.email,{
        s:'200',  //size
        r: 'pg', //Rating
        d:'mm'  //Default
      })
      obj.avatar = avatar
      obj.referralCode = referralCode
      console.log(obj)

      try {
        let user = await User.findByIdAndUpdate(id, obj)
        console.log(user)
        if(user){
          res.status(200).json({success: true})
        }
      } catch (error) {
        console.log(error)
        next(error) 
      }
    },
    location: async(req, res, next) => {
      let us = await User.find()
      const id = us[0]._id
      console.log(id)
      const address = req.body.address
      try {
        let user = await User.findByIdAndUpdate(id, address)
        if(user){
          res.status(200).json({success: true})
        }
      } catch (error) {
        next(error)
      }
    },
    login: async(req, res, next) => {
      const email= req.body.email, 
          password = req.body.password;

      const user =  await User.findOne({email: email})
      if(!user){
        return res.status(HttpStatus.BAD_REQUEST).json('mobile not found')
      }
      bcrypt.compare(password,user.password)
      .then(isMatch => {
        if(isMatch){
          //user matched
          const payload = {id: user.id, name: user.name, avatar: user.avatar}
          //sign token
          jwt.sign(
            payload, 
            config.secretOrKey, 
            {expiresIn: 3600}, (err, token)=>{
              res.json({
                success: true,
                token: 'Bearer ' + token,
                user: user
              })
          }); //after ah hour
        } else {
          return res.status(400).json({"message": "Password Incorrect"})
        }
      }).catch(err => next(err))
    },
    account: (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      })
    },
    sendOTP: async(req, res, next) => {
        if(!req.body.mobile){
          return res.status(400).json({ message: 'Mobile Number is not found'})
        }
        try {
          let user = await User.find({mobile: req.body.mobile})
          if(user && user.length){
            return res.status(400).json({message: "Already registered with Gringo"})
          }
          const {mobile, userType} = req.body
          var tempData = "generate otp"
          const userObj = new User({mobile, userType})
          const userDetail = await userObj.save()
          res.json({ message: `We have sent an otp on mobile ${userDetail.mobile}`, verifyToken: tempData });
        } catch (error) {
          next(error) 
        }
    }
}