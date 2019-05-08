let router = require('express').Router();
const passport = require('passport');

// Mount other routers
router.use('/users',passport.authenticate('jwt', {session: false}), require('./user/userRoutes'))
router.use('/merchants',passport.authenticate('jwt', {session: false}), require('./merchant/merchantRoutes'))
router.use('/orders',passport.authenticate('jwt', {session: false}), require('./orders/orderRoutes'))
router.use('/category',passport.authenticate('jwt', {session: false}), require('./category/categoryRoutes'))
router.use('/products',passport.authenticate('jwt', {session: false}), require('./products/productRoutes'))

module.exports = router;