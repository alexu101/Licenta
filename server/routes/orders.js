const express = require('express')

const {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder,
    getLoggedUserOrders
} = require('../controllers/orderController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all order routes

// router.use(requireAuth)

//GET all orders
router.get('/', getOrders)

//GET logged user orders
router.get('/logged', getLoggedUserOrders)

//GET a single order
router.get('/:id', getOrder)

//POST a new order
router.post('/', createOrder)

//DELETE a order
router.delete('/:id', deleteOrder)

//UPDATE a order
router.patch('/:id', updateOrder)

module.exports = router