const Merchant = require('./merchantModel'),
    User = require('../user/userModel');

  module.exports = {
    findAll: async(req, res) => {
        try{
          const merchant = await Merchant.find({}).select('-password');
          res.status(200).json(merchant)
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving merchant."});
        }
    },
    findOne: async(req, res) => {
      const {id} = req.params
      try{
          const merchant = await Merchant.findById(id);
          res.status(201).json(merchant)
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "merchant not found with id " + id;
          return "Error retrieving product with id " + id;
      }
    },
    update: async(req, res) => {
      const {id} = req.params
      const obj = req.body
      try{
          const merchant = await Merchant.findByIdAndUpdate(id, obj);
          res.status(200).json({success: true, merchant})
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "Merchant not found with id " + id;
          return "Error retrieving merchant with id " + id;
      }
    },
    create: async(req, res)=>{
      console.log(req.body);
      let newUser = await User.aggregate([
        {$project: {mobile: 1, _id: 1, userType: 1,created_at: 1}}
      ])
      if(newUser[0].userType == 'admin' || newUser[0].userType == 'merchant'){
        try{
            const newMerchant = new Merchant(req.body)
            const merchant = await newMerchant.save();
            res.status(201).json(merchant)
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Problem in sending data"});
        }
      }else{
        res.status(500).send({message: "You are not authorised to create merchant profile"});
      }
    },
    delete: async(req, res)=>{
      const {id} = req.params
      try{
          const merchant = await Merchant.findByIdAndDelete(id);
          res.send({message: "Product deleted successfully with id"})
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "Merchant not found with id " + id;
          return "Error retrieving merchant with id " + id;
      }
    }
}