const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderFriendlyId: {
        type: String,
        required: true
    },
    products: {
        type: [String],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    pickupMethod: {
        type: String,
        required: false
    },
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
