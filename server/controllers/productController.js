const Product = require('../models/productModel')
const mongoose = require('mongoose')

//get all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 })

    res.status(200).json(products)
}

//get a single product
const getProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' })
    }

    const product = await Product.findById(id)

    if (!product) {
        return res.status(400).json({ error: 'No such product' })
    }

    res.status(200).json(product)
}

//create new product
const createProduct = async (res, req) => {
    const { title, category, currentPrice, inStock, serialCode, producer, autonomy, range, load } = req.body

    let emptyFields = []

    if (!title)
        emptyFields.push('title')

    if (!category)
        emptyFields.push('category')

    if (!currentPrice)
        emptyFields.push('currentPrice')

    if (!inStock)
        emptyFields.push('inStock')

    if (!serialCode)
        emptyFields.push('serialCode')

    if (!producer)
        emptyFields.push('producer')

    if (!autonomy)
        emptyFields.push('autonomy')

    if (!range)
        emptyFields.push('range')

    if (!load)
        emptyFields.push('load')

    if (emptyFields.length > 0)
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })

    //add product to db
    try {
        const product = await Product.create({ title, category, currentPrice, inStock, serialCode, producer })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a product
const deleteProduct = async (res, req) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'No such product' })

    const product = await Product.findOneAndDelete({ _id: id })

    if (!product)
        return res.status(400).json({ error: 'No such product' })

    res.status(200).json(product)
}

//update a product
const updateProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: 'No such product' })

    const product = await Product.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!product) {
        return res.status(400).json({ error: 'No such product' })
    }

    res.status(200).json(product)
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}