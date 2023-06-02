import React from 'react'
import "./ProductCard.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { CardActions, Button, Snackbar } from '@mui/material';
import { useState } from 'react';
import { Link } from "react-router-dom"
import { Rating } from '@mui/material';

function ProuctCard({ product }) {

    // const { title, currentPrice, oldPrice, inStock, serialCode, autonomy, load, range, producer }



    // const imageLink = "http://localhost:9993/" + serialCode + ".png"

    // const oldPrice = 1000
    // const price = 2900
    // const inStock = true
    // const producator = "Autel Robotics"
    // const codArticol = "DRN-0001"

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.['token'];
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')


    const addProductToBasket = async (productId, token) => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/basket/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const updatedUser = await response.json();
                console.log(updatedUser);
                setSnackbarMessage('Product added to basket')
                setSnackbarOpen(true)

            } else {
                const error = await response.json();
                console.log(error.error);
                setSnackbarMessage(error.error)
                setSnackbarOpen(true)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddToBasket = () => {
        if (!token) {
            setSnackbarMessage('Not logged in')
            setSnackbarOpen(true)
        }
        else {
            addProductToBasket(product._id, token);
        }
    }


    const ratingAverage = (product) => {
        let sum = 0;
        //product. ratings is an array of object {user: rating}
        product.rating.forEach(rating => {
            sum += rating.rating;
        });
        return sum / product.rating.length;

    }


    return (
        token &&
        <Card className="productCard">
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }} id='link' className='productCardLink'>
                <img src={`http://localhost:9993/${product.serialCode}.png`} alt="product_pic" id='cardImage' />
            </Link>
            <CardContent>
                <span className="productTitle">
                    {product.title}
                </span>
                <div className="productPrice">
                    {product.oldPrice &&
                        <div className='oldPriceContainer'>
                            <span className="newPrice">{product.currentPrice} Lei</span>
                            <span className="oldPrice">{product.oldPrice} Lei</span>
                        </div>
                    }
                    {
                        !product.oldPrice && <span className="currentPrice">{product.currentPrice} Lei</span>

                    }

                </div>
                {
                    product.inStock ?
                        <div className='inStock'>
                            <CheckCircleOutlineRoundedIcon sx={{ width: 15, paddingRight: 0.5 }} />
                            <span>In Stoc</span>
                        </div>
                        : <span className="outOfStock">Stoc Epuizat</span>
                }
                <div className="producator">{`Producator: ${product.producer}`}</div>
                <div className="codArticol">{`Cod Articol: ${product.serialCode}`}</div>
                <Rating name="size-medium" readOnly defaultValue={ratingAverage(product)} />
            </CardContent>
            <CardActions className='cardActions'>
                <Button variant='contained' className='addToBasket' type='button' onClick={handleAddToBasket}>Cumpara</Button>
            </CardActions>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={(e, reason) => { if (reason !== 'clickaway') setSnackbarOpen(false) }}
                message={snackbarMessage}
            />
        </Card >
    )
}

export default ProuctCard