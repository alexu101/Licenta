import React from 'react'
import "./Payment.css"
import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'

function Payment({ homeDelivery, pickupDelivery, firstName, lastName, address, phone, email, productsFromBasket }) {

    const [stripePromise, setStripePromise] = useState(null)
    const [clientSecret, setClientSecret] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/api/stripe/config').then(async (res) => {
            const { publishableKey } = await res.json()

            setStripePromise((publishableKey))
        })
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/api/stripe/charge', {
            method: 'POST',
            body: JSON.stringify({

            })
        }).then(async (res) => {
            const { clientSecret } = await res.json()

            setClientSecret(clientSecret)
        })
    }, [])

    return (
        <>
            {stripePromise && clientSecret && (
                <Elements stripe={loadStripe(stripePromise)} options={{ clientSecret }}>
                    <CheckoutForm homeDelivery={homeDelivery} pickupDelivery={pickupDelivery} firstName={firstName}
                        lastName={lastName} address={address} phone={phone} email={email} productsFromBasket={productsFromBasket} />
                </Elements>
            )}
        </>
    )
}

export default Payment