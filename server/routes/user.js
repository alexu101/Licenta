const express = require('express')

//controller functions
const { signupUser, loginUser, getUsers, getUser, updateUser, addProductToBasket, getUserBasket, removeProductFromBasket, addOrderToUser } = require('../controllers/userController')

const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//get user by id
router.get('/logged', getUser)

//get all users
router.get('/', getUsers)

//update user
router.patch('/:id', updateUser)

//add product to basket(product id)
router.patch('/basket/:id', addProductToBasket)

//get user basket
router.get('/basket', getUserBasket)

//remove product from basket(product id)
router.delete('/basket/remove/:id', removeProductFromBasket)

//add order to user
router.patch('/order/:id', addOrderToUser)

module.exports = router