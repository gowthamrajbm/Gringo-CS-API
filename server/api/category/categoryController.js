const Category = require('./categoryModel');

module.exports = {
    findAll: async(req, res) => {
        try{
          const category = await Category.find({}).select('-password');
          res.status(200).json(category)
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving category."});
        }
    },
    findOne: async(req, res) => {
      const {id} = req.params
      try{
          const category = await Category.findById(id);
          res.status(201).json(category)
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "category not found with id " + id;
          return "Error retrieving category with id " + id;
      }
    },
    update: async(req, res) => {
      const {id} = req.params
      const obj = req.body
      try{
          const category = await Category.findByIdAndUpdate(id, obj);
          res.status(200).json({success: true, category})
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "category not found with id " + id;
          return "Error retrieving category with id " + id;
      }
    },
    create: async(req, res)=>{
      console.log(req.body);
      try{
          const newCategory = new Category(req.body)
          const category = await newCategory.save();
          res.status(201).json(category)
      }catch(err){
          console.log(err);
          res.status(500).send({message: "Problem in sending data"});
      }
    },
    delete: async(req, res)=>{
      const {id} = req.params
      try{
          const category = await Category.findByIdAndDelete(id);
          res.send({message: "Product deleted successfully with id"})
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "category not found with id " + id;
          return "Error retrieving category with id " + id;
      }
    }
}