const Product = require('./productModel'),
    Merchant = require('../merchant/merchantModel'),
    joinFun = require('../join/joinFunction');

module.exports = {
    findAll: async(req, res) => {
        try{
          const product = await Product.find({}).select('-password');
          res.status(200).json(product)
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving products."});
        }
    },
    findOne: async(req, res) => {
      const {id} = req.params
      try{
          const product = await Product.findById(id);
          res.status(201).json(product)
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "Product not found with id " + id;
          return "Error retrieving product with id " + id;
      }
    },
    update: async(req, res) => {
      const {id} = req.params
      const obj = req.body
      try{
          const product = await Product.findByIdAndUpdate(id, obj);
          res.status(200).json({success: true, product})
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "Product not found with id " + id;
          return "Error retrieving product with id " + id;
      }
    },
    create: async(req, res, next)=>{
      console.log(req.body);
      let obj = req.body
      let newMerchant = await Merchant.aggregate([
        {$project: {mobile: 1,email:1, _id: 1, merchantType: 1,created_at: 1}}
      ])
      if(newMerchant){
            if (obj.categoryId) {
                let joinCat = await joinFun.joinCategory(obj.categoryId, next)
                obj.category = joinCat;
            }
            try{
                const newProduct = new Product(obj)
                const product = await newProduct.save();
                res.status(201).json(product)
            }catch(err){
                console.log(err);
                res.status(500).send({message: "Problem in sending data"});
            }
        }
    },
    delete: async(req, res)=>{
      const {id} = req.params
      try{
          const product = await Product.findByIdAndDelete(id);
          res.send({message: "Product deleted successfully with id"})
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "Product not found with id " + id;
          return "Error retrieving product with id " + id;
      }
    }
}