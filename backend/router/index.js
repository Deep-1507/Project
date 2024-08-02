const express = require('express')
const userRouter = require('../routes/user')
const adminRouter = require('../routes/admin')
const ProductRouterOnline = require('../routes/products-online')

const router=express.Router();

router.use('/user',userRouter);
router.use('/admin',adminRouter);
router.use('/online-products',ProductRouterOnline);

module.exports = router;