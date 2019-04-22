const router = require('express').Router(),
  controller = require('./userController')

router.route('/')
  .get(controller.findAll)
  .post(controller.create)

router.route('/:id')
  .get(controller.findOne)
  .put(controller.update)
  .delete(controller.delete)

module.exports = router
