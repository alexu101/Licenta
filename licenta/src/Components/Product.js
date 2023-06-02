import React, { useEffect, useState } from 'react';
import "./Product.css"
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import { Snackbar } from '@mui/material';

function Product({ _id }) {
    console.log(_id)


    const [product, setProduct] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const token = JSON.parse(localStorage.getItem('user'))['token'];

    useEffect(() => {
        const fetchProduct = async () => {
            console.log(_id)
            const response = await fetch(`http://localhost:5000/api/product/${_id}`);
            const json = await response.json();

            if (response.ok) {
                setProduct(json);
                console.log("PRODUCT", product);
            }
        }
        fetchProduct();
    }, []);

    console.log("PRODUCT", product)

    const ratingAverage = (product) => {
        let sum = 0;
        //product. ratings is an array of object {user: rating}
        product.rating.forEach(rating => {
            sum += rating.rating;
        });
        return sum / product.rating.length;

    }



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


    const handleAddRating = async (e, product) => {
        //search in product.ratng for the user id
        const user = JSON.parse(localStorage.getItem('user'));
        const email = user.email;

        console.log("USER", email)

        console.log(product.rating)
        //update the rating. if the user already rated the product, update the rating, else add a new rating
        const newRatings = product.rating

        //check if the user already rated the product
        let found = false;
        for (let i = 0; i < newRatings.length; i++) {
            if (newRatings[i].user === email) {
                newRatings[i].rating = e.target.value;
                found = true;
                break;
            }
        }

        if (!found) {
            newRatings.push({ user: email, rating: e.target.value })
        }

        const response = await fetch(`http://localhost:5000/api/product/${product._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating: newRatings })
        });

        if (response.ok) {
            const updatedProduct = await response.json();
            console.log(updatedProduct);
            setSnackbarMessage('Rating added')
            setSnackbarOpen(true)
        }

    }

    return (
        <div className='product'>
            <Navbar style={{ justifySelf: "start" }} />
            {
                product &&
                <div className='productContainer'>
                    <div className="upperPart">
                        <img src={`http://localhost:9993/${product.serialCode}.png`} alt="productPic" id='logoPic' />
                        <div className="upperRightPart">
                            <div className="product_title">
                                {product.title}
                            </div>

                            <div className="limit" />

                            <div className="rating">
                                <Rating name="size-medium" defaultValue={ratingAverage(product)} onChange={(e) => handleAddRating(e, product)} />
                                <div className="">
                                    {`(${product.rating.length} ratings)`}
                                </div>
                            </div>

                            <div className="limit" />

                            <div className="description">
                                {product.description}
                            </div>

                            <div className="limit" />

                            <div className="price">
                                <div>Price: </div>
                                <div className="priceValue">
                                    {`${product.currentPrice} $`}
                                </div>
                            </div>

                            <div className="limit" />

                            <div className="addToCart">
                                <Button variant='contained' className='addToCartButton' type='submit' onClick={handleAddToBasket}>ADD TO BASKET</Button>
                            </div>
                        </div>
                    </div>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={(e, reason) => { if (reason !== 'clickaway') setSnackbarOpen(false) }}
                        message={snackbarMessage}
                    />
                </div>}
        </div>
    );
}

export default Product;
