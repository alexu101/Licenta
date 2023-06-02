import React from 'react'
import "./CheckoutForm.css"
import { useState, useEffect } from 'react'
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useBasketContext } from '../hooks/useBasketContext'
import { v4 as uuidv4 } from 'uuid';

function CheckoutForm({ homeDelivery, pickupDelivery, firstName, lastName, address, phone, email, productsFromBasket }) {

    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const { basket, dispatch, basketProducts } = useBasketContext()

    const handleSubmit = async (e) => {


        e.preventDefault()

        if (!stripe || !elements)
            return

        setIsProcessing(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/paymentCompleted`
            },
            redirect: "if_required"
        })

        if (error) {
            console.log(error.message)
            setMessage(error.message)
        }
        else if (paymentIntent && paymentIntent.status === 'succeeded') {

            console.log("MEGATARE");
            setMessage("Payment status: " + paymentIntent.status)
            //post the order to the database

            await fetch('http://localhost:5000/api/order/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "products": productsFromBasket.map(product => product._id),
                    "totalPrice": productsFromBasket.reduce((a, b) => a + b.currentPrice, 0),
                    "customerName": firstName + " " + lastName,
                    "status": "Pending",
                    "date": new Date().toLocaleDateString('en-GB'),
                    "description": "Order placed",
                    "address": address,
                    "phone": phone,
                    "email": email,
                    "pickupMethod": pickupDelivery ? "Pickup" : "Home delivery",
                    "orderFriendlyId": uuidv4()
                }),
            }).catch((error) => {
                console.error('Error:', error);
            }
            ).then((response) => {

                const res = response.json();
                res.then(async (order) => {
                    const token = JSON.parse(localStorage.getItem('user'))['token'];
                    await fetch(`http://localhost:5000/api/user/order/${order._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }).catch((error) => {
                        console.error('Error:', error);
                    }
                    ).then((response) => {
                        console.log('Success:', response);
                        window.location.href = "http://localhost:3000/"
                    }
                    );

                })
                console.log('Success:', response);
            }
            );
        }
        else setMessage("Unexpected state")

        setIsProcessing(false);
    }

    return (
        <div>
            {
                <form id="paymentForm" onSubmit={handleSubmit}>
                    <PaymentElement />
                    <button disabled={isProcessing} id="submitPayment">
                        <span className="paymentButtonText">
                            {isProcessing ? "Processing ..." : "Pay now"}
                        </span>
                    </button>
                </form>
            }
        </div>

    )
}

export default CheckoutForm