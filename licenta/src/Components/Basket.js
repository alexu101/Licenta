import React from 'react'
import "./Basket.css"
import { useBasketContext } from '../hooks/useBasketContext'
import { useEffect } from 'react'
import { Button } from '@mui/material'
import { Paper } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Basket() {

    const { basket, dispatch, basketProducts } = useBasketContext()
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.['token'];

    const [basketLoaded, setBasketLoaded] = useState(false)

    useEffect(() => {
        console.log("basket loaded", basketLoaded)
        if (!basketLoaded) {
            const getBasket = async () => {
                const response = await fetch('http://localhost:5000/api/user/basket',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                const data = await response.json()
                dispatch({ type: 'SET_BASKET', payload: data })
                setBasketLoaded(true)
            }

            getBasket()
        }

        const handleUnload = () => {
            setBasketLoaded(false)
        }

        window.addEventListener('beforeunload', handleUnload)

        return () => {
            window.removeEventListener('beforeunload', handleUnload)
        }

    }, [basket, dispatch, token, basketLoaded])

    useEffect(() => {
        const getBasketItems = async () => {
            const response = await fetch('http://localhost:5000/api/product/multiple',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ids: basket })
                }
            )
            const data = await response.json()
            dispatch({ type: 'SET_BASKET_PRODUCTS', payload: data })
        }

        getBasketItems()
    }, [basket, dispatch])

    const handleRemove = async (e, id) => {
        const response = await fetch(`http://localhost:5000/api/user/basket/remove/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        const data = await response.json()
        console.log("data", data)
        dispatch({ type: 'REMOVE_FROM_BASKET', payload: id })
        setBasketLoaded(false)
    }


    return (
        <div className='basketContainer'>
            <Navbar />
            <div className="basketTitle">
                Your Basket ...
            </div>
            {(token === undefined || basketProducts?.length === 0) ?
                ((token === undefined) ?
                    <Link to="/login" className='loginLink'>➡️ Log in to see your basket!</Link> :
                    <div className='emptyBasket'>
                        <h1>Empty Basket ...</h1>
                        <img src={"http://localhost:9993/emptyBasket.png"} alt="empty_basket" />
                    </div>
                )
                :
                <Paper className='basket' elevation={5}>
                    {basketProducts?.map(product => (
                        <div className='basketItem' key={product._id}>
                            <img className='basketItemImg' src={`http://localhost:9993/${product.serialCode}.png`} alt={product.name} />
                            <div className="basketItemInfo">
                                <div className='basketItemName'>{`${product.title}`}</div>
                                <div className="basketItemPrice">{`${product.currentPrice} RON`}</div>
                            </div>
                            <Button variant='contained' className='deleteBasketItem' type='submit' onClick={(e) => handleRemove(e, product._id)}>REMOVE</Button>
                        </div>
                    ))}
                    <Link className='proceedToCheckout' to="/checkout">➡️Proceed to Chekout!</Link>
                </Paper>
            }
        </div>
    )
}
