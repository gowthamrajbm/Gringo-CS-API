const User = require('./userModel');

module.exports = {
  findAll: async(req, res) => {
      try{
        const user = await User.find({}).select('-password');
        res.status(200).json(user)
      }catch(err){
          console.log(err);
          res.status(500).send({message: "Some error occurred while retrieving users."});
      }
  },
  findOne: async(req, res) => {
    const {id} = req.params
    try{
        const user = await User.findById(id);
        res.status(201).json(user)
    }catch(err){
        if(err) 
            if(err.kind === 'ObjectId') return "User not found with id " + id;
        return "Error retrieving user with id " + id;
    }
  },
  update: async(req, res) => {
    const {id} = req.params
    const obj = req.body
    try{
        const user = await User.findByIdAndUpdate(id, obj);
        res.status(200).json({success: true})
    }catch(err){
        if(err) 
            if(err.kind === 'ObjectId') return "User not found with id " + id;
        return "Error retrieving user with id " + id;
    }
  },
  create: async(req, res)=>{
    // Create and Save a new Note
    console.log(req.body);
    try{
        const newUser = new User(req.body)
        const user = await newUser.save();
        res.status(201).json(user)
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Problem in sending data"});
    }
  },
  delete: async(req, res)=>{
    const {id} = req.params
    try{
        const user = await User.findByIdAndDelete(id);
        res.send({message: "User deleted successfully with id" + user.id})
    }catch(err){
        if(err) 
            if(err.kind === 'ObjectId') return "User not found with id " + id;
        return "Error retrieving user with id " + id;
    }
  }
}