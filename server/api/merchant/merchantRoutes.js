const router = require('express').Router(),
  controller = require('./merchantController');

router.route('/')
  .get(controller.findAll)
  .post(controller.create)

router.route('/:id/products').get(controller.merchantProduct)
router.route('/:id/orders').get(controller.merchantOrder)
router.route('/:id/openclose').get(controller.openClose)

router.route('/:id')
  .get(controller.findOne)
  .put(controller.update)
  .delete(controller.delete)
  
module.exports = router
