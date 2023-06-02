require("dotenv").config()
const express = require("express")
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/products')
const ordersRoutes = require('./routes/orders')
const cors = require("cors")


//express app
const app = express()

const stripe = require("stripe")(process.env.STRIPE_SECRET)

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(cors())

//routes
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', ordersRoutes)

//stripe routes
app.get("/api/stripe/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLIC
    })
})

app.post("/api/stripe/charge", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099,
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.json({ clientSecret: paymentIntent.client_secret })
    }
    catch (e) {
        return res.status(400).send({
            error: {
                message: e
            }
        })
    }
})

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(err => console.log(err))

