const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const requireAuth = require('../middleware/requireAuth')

const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '365d' })
}

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//signup user
const signupUser = async (req, res) => {
    console.log("AICI E REQ.BODY", req)
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 })

    res.status(200).json(users)
}

//get a single user
const getUser = async (req, res) => {
    try {
        // Use the requireAuth middleware to extract the user ID from the JWT token
        await requireAuth(req, res, async () => {
            const userId = req.user._id;

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(user);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving user' });
    }
}

//update a user
const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

    console.log(user)

    if (!user) {
        return res.status(400).json({ error: 'No such user' })
    }

    res.status(200).json(order)
}

//add order to user
const addOrderToUser = async (req, res) => {
    try {
        // Use the requireAuth middleware to extract the user ID from the JWT token
        await requireAuth(req, res, async () => {
            const userId = req.user._id;
            const orderId = req.params.id;

            // Find the user
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // add the order to the user's orders array
            const updatedUser = await User.findByIdAndUpdate(userId, { $push: { orders: orderId } }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(updatedUser);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving user' });
    }
}

//add product to user basket
const addProductToBasket = async (req, res) => {
    try {
        // Use the requireAuth middleware to extract the user ID from the JWT token
        await requireAuth(req, res, async () => {
            const userId = req.user._id;
            const productId = req.params.id;

            // Find the user
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Check if the product is already in the user's basket
            if (user.basket.includes(productId)) {
                return res.status(400).json({ error: 'Product already in basket, we do not support multiple quantities of the same product' })
            }

            // Add the product to the user's basket using User.findByIdAndUpdate
            const updatedUser = await User.findByIdAndUpdate(userId, { $push: { basket: productId } }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(updatedUser);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving user' });
    }
}

const getUserBasket = async (req, res) => {

    try {
        // Use the requireAuth middleware to extract the user ID from the JWT token
        await requireAuth(req, res, async () => {
            const userId = req.user._id;

            // Find the user
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Get the user's basket
            const basket = user.basket;

            res.json(basket);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving user' });
    }
}

const removeProductFromBasket = async (req, res) => {
    try {
        // Use the requireAuth middleware to extract the user ID from the JWT token
        await requireAuth(req, res, async () => {
            const userId = req.user._id;
            const productId = req.params.id;

            // Find the user
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Delete the product from the user's basket using User.findByIdAndUpdate
            const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { basket: productId } }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(updatedUser);

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving user' });
    }
}


module.exports = { signupUser, loginUser, getUsers, getUser, updateUser, addProductToBasket, getUserBasket, removeProductFromBasket, addOrderToUser }