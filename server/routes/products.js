const express = require('express')

const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    getMultipleProducts,
    getRating
} = require('../controllers/productController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all product routes

// router.use(requireAuth)

//GET all products
router.get('/', getProducts)

//GET a single product
router.get('/:id', getProduct)

//POST a new product
router.post('/', createProduct)

//DELETE a product
router.delete('/:id', deleteProduct)

//UPDATE a product
router.patch('/:id', updateProduct)

//GET multiple products
router.post('/multiple', getMultipleProducts)

//GET rating
router.get('/rating/:id', getRating)

module.exports = router