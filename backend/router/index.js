const express = require('express')
const userRouter = require('../routes/user')
const StoreRouter = require('../routes/store')
const ProductRouterOnline = require('../routes/products-online')
const ProductRouterOffline = require('../routes/products-offline')

const router=express.Router();

router.use('/user',userRouter);
router.use('/stores',StoreRouter);
router.use('/online-products',ProductRouterOnline);
router.use('/offline-products',ProductRouterOffline);

module.exports = router;