const uuidv4 = require('uuid/v4'),
	gravatar = require('gravatar'),
	bcrypt = require('bcryptjs'),
	config = require('../config/config'),
  jwt = require('jsonwebtoken'),
  User = require('../api/user/userModel');

module.exports = {
    register:  async(req, res, next) => {
      if(!req.body.name && !req.body.email){
        return res.status(400).json({ message: 'Name or Email not found'})
      }
      var sort = {'_id': -1}
      let newUser = await User.find().sort(sort).limit(1)
      console.log("checked recent save user ", newUser)
      const obj = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password 
      }
      let referralCode = `${req.body.name.toUpperCase().split(' ').join('').substring(0, 4)}${uuidv4().substring(0, 4).toUpperCase()}`
      obj.referralCode = referralCode
   
     User.findByIdAndUpdate(newUser[0]._id, obj)
        .then((response) => {
          const payload = {id: response._id, name: response.name, email: response.email, mobile: response.mobile, userType: response.userType}
            jwt.sign(
              payload, 
              config.secretOrKey, 
              {expiresIn: 3600}, (err, token)=>{
                console.log("token" , token)
                  res.status(200).json({
                      success: true,
                      token: 'Bearer ' + token,
                      user: response
                  })
              });
            })
        .catch(err => console.log(err))
    },
    login: async(req, res, next) =>{
      const email = req.body.email,
      password = req.body.password
 
      User.findOne({email, password}).then(user => {
        console.log("user", user)
        if(!user){
            return res.status(400).json('Email not found')
        }
        const payload = {id: user._id, name: user.name, email: user.email, mobile: user.mobile, userType: user.userType}
        //sign token
        jwt.sign(
            payload, 
            config.secretOrKey, 
            {expiresIn: 3600}, (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: user
                })
            })
      }).catch(err => next(err))
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
      var company = "Gringo Delivery Company"
      try {
        let user = await User.find({mobile: req.body.mobile})
        if(user && user.length){
          return res.status(400).json({ message: 'User already there'})
        }else{
          let vmobile = '' + req.body.mobile;
          let accessToken = company.trim().toLowerCase().split(' ').map(un => un.charAt(0)).join('') + '-' + vmobile.substring(0, 4);
          var data = {
            mobile: req.body.mobile,
            accessToken: accessToken,
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
        if(!req.body.accessToken){
          return res.status(400).json({ message: 'Token Key is not found'})
        }
        try {
          let user = await User.find({accessToken: req.body.accessToken})
          console.log(user)
          if(user && user[0].email){
            const payload = {id: user[0]._id, name: user[0].name, email: user[0].email, mobile: user[0].mobile, userType: user[0].userType}
            jwt.sign(
                payload, 
                config.secretOrKey, 
                {expiresIn: 3600}, (err, token)=>{
                  console.log("token" , token)
                    res.status(200).json({
                        message: "Already Registered",
                        success: true,
                        token: 'Bearer ' + token,
                        user: user
                    })
                });
          }else if(user && user.length){
            return res.status(200).json({ message: 'Token Found', token: user})
          }else{
            return res.status(400).json({ message: 'Token Error'})
          }
        } catch (error) {
          next(error) 
        }
    }
}