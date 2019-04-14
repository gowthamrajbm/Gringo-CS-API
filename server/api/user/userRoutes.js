const router = require('express').Router(),
  controller = require('./userController'),
  auth = require('../../auth/auth'),
  checkUser = [auth.decodeToken(), auth.getFreshUser()]

router.route('/')
  .get(controller.findAll)
  .post(controller.create)

router.route('/:id')
  .get(controller.findOne)
  .put(checkUser, controller.update)
  .delete(checkUser, controller.delete)

module.exports = router
