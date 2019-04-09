const Category = require('./categoryModel'),
  _ = require('lodash'),
  logger = require('../../util/logger');

exports.params = function(req, res, next, id){
  Category.findById(id)
    .exec()
    .then(function(user){
      if(!user){
        next(new Error('No user with that id'))
      } else {
        req.user = user
        next()
      }
    }, function(err){
      next(err)
    })
}

exports.get = function(req, res, next){
  Category.find({})
    .exec()
    .then(function(users){
      res.json(users.map(function(user){
        return user.toJson()
      }))
    }, function(err){
      next(err)
    })
}

exports.getOne = function(req, res, next){
  var user = req.user.toJson()
  res.json(user.toJson())
}

exports.put = (req, res, next) => {
  var user = req.user
  var update = req.body
  _.merge(user, update)

  user.save((err, saved) => {
    if(err){
      next(err)
    } else {
      res.json(saved.toJson())
    }
  })
}

exports.post = function(req, res, next){
  var newCategory = new Category(req.body)
  newCategory.save(function(err, user){
    if(err) {
      return next(err)
    }
    res.json({user: user})
  })
}

exports.delete = (req, res, next) => {
  req.user.remove((err, removed) => {
    if(err){
      next(err)
    } else {
      res.json(removed.toJson())
    }
  })
}