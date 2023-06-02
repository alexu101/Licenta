const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    oldPrice: {
        type: Number,
        required: false
    },
    inStock: {
        type: Boolean,
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
    rating: {
        type: [Object],
        required: false
    },
    description: {
        type: String,
        required: false
    },

}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)