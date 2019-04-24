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
      let newUser = await User.aggregate([
        {$project: {mobile: 1, token: 1, _id: 1, created_at: 1}},
			  {$sort : { created_at : 1}}
      ])
      console.log("checked recent save user ", newUser)
      const obj = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password 
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
        let newRegister = await User.findByIdAndUpdate(newUser[0]._id, obj)
        res.status(200).json(newRegister)
      } catch (error) {
        console.log(error)
        next(error) 
      }
    },
    location: async(req, res, next) => {
      let newUserLogin = await User.aggregate([
        {$project: {mobile: 1, token: 1, _id: 1, created_at: 1}},
			  {$sort : { created_at : 1}}
      ])
      const id = newUserLogin[0]._id
      console.log(id)
      const obj = {
        address: req.body.address
      }
      console.log(obj.address)
      try {
        let user = await User.findByIdAndUpdate(id, obj)
        res.status(200).json({user: user})
      } catch (error) {
        next(error)
      }
    },
    verifyMobile: async(req,res) => {
      if(!req.body.mobile && !req.body.type){
        return res.status(400).json({ message: 'Mobile Number & User type is not found'})
      }
      var company = "Gringo"
      try {
        let user = await User.find({mobile: req.body.mobile})
        if(user && user.length){
          return res.status(400).json({ message: 'User already there'})
        }else{
          let vmobile = '' + req.body.mobile;
          let key = company.trim().toLowerCase().split(' ').map(un => un.charAt(0)).join('') + '-' + vmobile.substring(0, 4);
          var data = {
            mobile: req.body.mobile,
            token: key,
            userType: req.body.type
          }
          const userObj = new User(data)
          const mobileVerification = await userObj.save()
          res.json({message: `Verify the token key`, success: true, mobileVerification: mobileVerification})
        }
      } catch (error) {
        
      }
    },
    verifyOTP: async(req, res, next) => {
        if(!req.body.token){
          return res.status(400).json({ message: 'Token Key is not found'})
        }
        try {
          let user = await User.find({token: req.body.token})
          console.log(user)
          if(user && user[0].email){
            return res.status(200).json({message: "Already Registered", success: true, user: user})
          }else if(user && user.length){
            return res.status(200).json({ message: 'Token Found', token: user.token})
          }else{
            return res.status(400).json({ message: 'Token Error'})
          }
        } catch (error) {
          next(error) 
        }
    }
}