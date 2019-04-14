const Order = require('./orderModel');


module.exports = {
    findAll: async(req, res) => {
        try{
          const order = await Order.find({}).select('-password');
          res.status(200).json(order)
        }catch(err){
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving orders."});
        }
    },
    findOne: async(req, res) => {
      const {id} = req.params
      try{
          const order = await Order.findById(id);
          res.status(201).json(order)
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "Order not found with id " + id;
          return "Error retrieving order with id " + id;
      }
    },
    update: async(req, res) => {
      const {id} = req.params
      const obj = req.body
      try{
          const order = await Order.findByIdAndUpdate(id, obj);
          res.status(200).json({success: true, order})
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "order not found with id " + id;
          return "Error retrieving order with id " + id;
      }
    },
    create: async(req, res)=>{
      console.log(req.body);
      try{
          const newOrder = new Order(req.body)
          const order = await newOrder.save();
          res.status(201).json(order)
      }catch(err){
          console.log(err);
          res.status(500).send({message: "Problem in sending data"});
      }
    },
    delete: async(req, res)=>{
      const {id} = req.params
      try{
          const order = await Order.findByIdAndDelete(id);
          res.send({message: "Order deleted successfully with id"})
      }catch(err){
          if(err) 
              if(err.kind === 'ObjectId') return "Order not found with id " + id;
          return "Error retrieving order with id " + id;
      }
    }
}