const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    currentPrice: {
        type: Number,
        required: True
    },
    oldPrice: {
        type: Number,
        required: false
    },
    inStock: {
        type: String,
        required: true
    },
    serialCode: {
        type: String,
        required: true
    },
    producer: {
        type: String,
        required: true
    },
    autonomy: {
        type: [Number],
        required: true
    },
    range: {
        type: [Number],
        required: true
    },
    load: {
        type: [Number],
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)