let router = require('express').Router();

// Mount other routers
router.use('/users', require('./user/userRoutes'))
router.use('/portfolio', require('./portfolio/portfolioRoutes'))
router.use('/merchant', require('./merchant/merchantRoutes'))
router.use('/order', require('./orders/orderRoutes'))
router.use('/category', require('./category/categoryRoutes'))
router.use('/portfolio', require('./portfolio/portfolioRoutes'))

module.exports = router;