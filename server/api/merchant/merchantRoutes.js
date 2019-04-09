const router = require('express').Router(),
  logger = require('../../util/logger'),
  controller = require('./merchantController'),
  auth = require('../../auth/auth'),
  checkUser = [auth.decodeToken(), auth.getFreshUser()]

router.param('id', controller.params)
router.get('/me', checkUser, controller.me)

router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete)

module.exports = router
