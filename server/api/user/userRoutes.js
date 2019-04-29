const router = require('express').Router(),
  controller = require('./userController')

router.route('/')
  .get(controller.findAll)
  .post(controller.create)

router.route('/:id')
  .get(controller.findOne)
  .put(controller.update)
  .delete(controller.delete)

router.get('/current',  (req, res) =>{
      res.json({
          id: req.user.id,
          name: req.user.name,
          email: req.user.email
      })
})

module.exports = router
