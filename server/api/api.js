let router = require('express').Router();
const passport = require('passport');

// Mount other routers
router.use('/users',passport.authenticate('jwt', {session: false}), require('./user/userRoutes'))
router.use('/merchant',passport.authenticate('jwt', {session: false}), require('./merchant/merchantRoutes'))
router.use('/order',passport.authenticate('jwt', {session: false}), require('./orders/orderRoutes'))
router.use('/category',passport.authenticate('jwt', {session: false}), require('./category/categoryRoutes'))
router.use('/product',passport.authenticate('jwt', {session: false}), require('./products/productRoutes'))

module.exports = router;