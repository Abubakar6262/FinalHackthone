const express = require('express')
const router = express.Router()
const { AddProduct,GetProduct } = require('../controller/productController')


router.post('/', AddProduct)
router.get('/getproduct', GetProduct)

module.exports = router