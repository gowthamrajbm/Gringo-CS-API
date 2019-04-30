const Coupon = require('./couponModel');


module.exports = {
    findAll: async(req, res) => {
        try{
          const coupon = await Coupon.find({}).select('-password');
          res.status(200).json(coupon)
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving coupon."});
        }
    },
    findOne: async(req, res) => {
      const {id} = req.params
      try{
          const coupon = await Coupon.findById(id);
          res.status(201).json(coupon)
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "coupon not found with id " + id;
          return "Error retrieving coupon with id " + id;
      }
    },
    update: async(req, res) => {
      const {id} = req.params
      const obj = req.body
      try{
          const coupon = await Coupon.findByIdAndUpdate(id, obj);
          res.status(200).json({success: true, coupon})
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "coupon not found with id " + id;
          return "Error retrieving coupon with id " + id;
      }
    },
    create: async(req, res)=>{
      console.log(req.body);
      try{
          const newCoupon = new Coupon(req.body)
          const coupon = await newCoupon.save();
          res.status(201).json(coupon)
      }catch(err){
          console.log(err);
          res.status(500).send({message: "Problem in sending data"});
      }
    },
    delete: async(req, res)=>{
      const {id} = req.params
      try{
          const coupon = await Coupon.findByIdAndDelete(id);
          res.send({message: "coupon deleted successfully with id"})
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "coupon not found with id " + id;
          return "Error retrieving coupon with id " + id;
      }
    }
}