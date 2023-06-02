import React from 'react'
import { useOrdersContext } from '../hooks/useOrdersContext'
import { useEffect } from 'react';
import Order from './Order';
import './Orders.css'
import { Paper } from '@mui/material';

function Orders() {

    const token = JSON.parse(localStorage.getItem('user'))['token'];

    const { orders, dispatch } = useOrdersContext()

    useEffect(() => {
        const getOrders = async () => {
            let orders
            const response = await fetch('http://localhost:5000/api/order/logged', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_ORDERS', payload: json })
            }

            return orders

        }
        getOrders()
    }, [dispatch])


    console.log(orders);

    return (
        //test if uer is logged in

        <div className='orders'>
            <div className="ordersTitle">
                Your Orders ...
            </div>
            {token ? (
                orders &&
                <div className="ordersContainer">

                    {orders.map(order => (
                        order !== null &&
                        < Order key={order._id} order={order} >
                        </Order>
                    ))
                    }
                    {orders.map(order => (
                        order !== null &&
                        < Order key={order._id} order={order} >
                        </Order>
                    ))
                    }
                    {orders.map(order => (
                        order !== null &&
                        < Order key={order._id} order={order} >
                        </Order>
                    ))
                    }
                    {orders.map(order => (
                        order !== null &&
                        < Order key={order._id} order={order} >
                        </Order>
                    ))
                    }
                </div>


            ) : (
                <div>
                    <h1>You are not logged in</h1>
                </div>
            )
            }
        </div >
    )
}

export default Orders