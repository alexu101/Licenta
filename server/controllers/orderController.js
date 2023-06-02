const Order = require('../models/ordersModel');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth')
const User = require('../models/userModel')

//get all orders
const getOrders = async (req, res) => {
    const orders = await Order.find({}).sort({ createdAt: -1 })

    res.status(200).json(orders)
}

//get a single order
const getOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such order' })
    }

    const order = await Order.findById(id)

    if (!order) {
        return res.status(400).json({ error: 'No such order' })
    }

    res.status(200).json(order)
}

//get logged user orders
const getLoggedUserOrders = async (req, res) => {
    try {
        // Use the requireAuth middleware to extract the user ID from the JWT token
        await requireAuth(req, res, async () => {
            const userId = req.user._id;

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            let orders = [];

            for (let order of user.orders) {
                let orderData = await Order.findById(order);
                // if it's not null
                if (orderData)
                    orders.push(orderData);
            }

            res.json(orders);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving user' });
    }

}

//create new order
const createOrder = async (req, res) => {
    const { products, totalPrice, customerName, status, date, description, address, phone, email, orderFriendlyId, pickupMethod } = req.body

    let emptyFields = []

    if (!orderFriendlyId)
        emptyFields.push('orderFriendlyId')

    if (!products)
        emptyFields.push('products')

    if (!totalPrice)
        emptyFields.push('totalPrice')

    if (!customerName)
        emptyFields.push('customerName')

    if (!status)
        emptyFields.push('status')

    if (!date)
        emptyFields.push('date')

    if (!address)
        emptyFields.push('address')

    if (!phone)
        emptyFields.push('phone')

    if (!description)
        emptyFields.push('description')

    if (!email)
        emptyFields.push('email')

    if (!pickupMethod)
        emptyFields.push('pickupMethod')

    if (emptyFields.length > 0)
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })

    try {
        const order = await Order.create({ orderFriendlyId, products, totalPrice, customerName, status, date, description, address, phone, pickupMethod, email })
        res.status(200).json(order)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//delete a order
const deleteOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'No such order' })

    const order = await Order.findOneAndDelete({ _id: id })

    if (!order)
        return res.status(400).json({ error: 'No such order' })

    res.status(200).json(order)
}

//update an order
const updateOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'No such order' })

    const order = await Order.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

    console.log(order)

    if (!order) {
        return res.status(400).json({ error: 'No such order' })
    }

    res.status(200).json(order)
}

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder,
    getLoggedUserOrders
}