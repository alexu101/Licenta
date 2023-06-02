import { useEffect } from "react"
import { useProductsContext } from "../hooks/useProductsContext"
import ProductCard from "./ProuctCard"
import Grid from '@mui/material/Grid';
import "./Products.css"
import { useFiltersContext } from "../hooks/useFiltersContext"
import SortIcon from '@mui/icons-material/Sort';
import { Button } from "@mui/material";
import { useState } from "react";
import { Checkbox } from "@mui/material";
import CompareItemCard from "./CompareItemCard";

const Products = () => {

    // get the filters from context

    const [comparingProducts, setComparingProducts] = useState([])
    const [compareOpen, setCompareOpen] = useState(false)

    const user = JSON.parse(localStorage.getItem('user'))
    const logged = user ? true : false

    const { filters } = useFiltersContext()

    const filterProducts = (products) => {

        if (filters) {
            const maxPrice = 20000
            const { sliderValue, checkboxValue, autonomy, distance, load, inStock } = filters
            if (sliderValue) {
                products = products.filter(product => product.currentPrice >= sliderValue[0] / 100 * maxPrice && product.currentPrice <= sliderValue[1] / 100 * maxPrice)
            }
            if (checkboxValue) {
                const brands = Object.keys(checkboxValue).filter(brand => checkboxValue[brand])
                if (brands.length > 0) {
                    products = products.filter(product => brands.includes(product.producer.toLowerCase()))
                }
            }
            if (autonomy !== 'none') {
                const autonomyArray = autonomy.split(',')
                products = products.filter(product => product.autonomy >= autonomyArray[0] && product.autonomy <= autonomyArray[1])
            }
            if (distance !== 'none') {
                const distanceArray = distance.split(',')
                products = products.filter(product => product.range >= distanceArray[0] && product.range <= distanceArray[1])
            }
            if (load !== 'none') {
                const loadArray = load.split(',')
                products = products.filter(product => product.load >= loadArray[0] && product.load <= loadArray[1])
            }
            console.log("IN STOCK: ", inStock)
            if (inStock) {
                products = products.filter(product => product.inStock)
            }
        }
        return products
    }

    const { products, dispatch } = useProductsContext()

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:5000/api/product/')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_PRODUCTS', payload: json })
            }
        }

        fetchProducts()
    }, [dispatch])

    const [sortByPrice, setSortByPrice] = useState(false)
    const [sortByRating, setSortByRating] = useState(false)

    const handleSortByPrice = () => {

        setSortByPrice(!sortByPrice)

        if (sortByPrice) {
            products.sort((a, b) => a.currentPrice - b.currentPrice)
        }
        else {
            products.sort((a, b) => b.currentPrice - a.currentPrice)
        }

        dispatch({ type: 'SET_PRODUCTS', payload: products })

    }

    const handleSortByRating = () => {

        setSortByRating(!sortByRating)

        if (sortByRating) {
            products.sort((a, b) => {
                const ratingA = a.rating.reduce((a, b) => a + b, 0) / a.rating.length
                const ratingB = b.rating.reduce((a, b) => a + b, 0) / b.rating.length
                return ratingA - ratingB
            })
        }
        else {
            products.sort((a, b) => {
                const ratingA = a.rating.reduce((a, b) => a + b, 0) / a.rating.length
                const ratingB = b.rating.reduce((a, b) => a + b, 0) / b.rating.length
                return ratingB - ratingA
            })

            dispatch({ type: 'SET_PRODUCTS', payload: products })

        }
    }

    const handleCheck = (e, product) => {
        if (e.target.checked) {
            setComparingProducts([...comparingProducts, product])
        }
        else {
            setComparingProducts(comparingProducts.filter(item => item._id !== product._id))
        }
    }

    const handleCompareItems = () => {
        setCompareOpen(!compareOpen)

        if (compareOpen) {
            setComparingProducts([])
        }
    }

    return (
        logged === true ?
            <div className="products">
                <div className="sort">
                    <span>Sort Items:</span>
                    <Button variant="outlined" startIcon={<SortIcon />} onClick={handleSortByPrice} className="sortButton">Price</Button>
                    <Button variant="outlined" startIcon={<SortIcon />} onClick={handleSortByRating} className="sortButton">Rating</Button>
                </div>
                <Button variant="outlined" onClick={handleCompareItems} className="compareButton">Compare Items</Button>
                {
                    comparingProducts.length > 0 &&
                    <div className="comparingProducts">
                        <h3>Comparing:</h3>
                        <div className="comparingProductsImages" style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                            {comparingProducts.map(product => (
                                <img src={`http://localhost:9993/${product.serialCode}.png`} alt="product" />
                            ))}
                        </div>
                        <div className="comparePropsTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Property</th>
                                        {comparingProducts.map(product => (
                                            <th key={product._id}>{product.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        {comparingProducts.map(product => (
                                            <td key={product._id}>{product.title}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Price</td>
                                        {comparingProducts.map(product => (
                                            <td key={product._id}>{product.currentPrice}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Rating</td>
                                        {comparingProducts.map(product => (
                                            <td key={product._id}>{(product.rating.reduce((a, b) => a + b, 0) / product.rating.length).toFixed(1)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Autonomy</td>
                                        {comparingProducts.map(product => (
                                            <td key={product._id}>{product.autonomy}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Distance</td>
                                        {comparingProducts.map(product => (
                                            <td key={product._id}>{product.range}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Load</td>
                                        {comparingProducts.map(product => (
                                            <td key={product._id}>{product.load}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Producer</td>
                                        {comparingProducts.map(product => (
                                            <td key={product._id}>{product.producer}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Model</td>
                                        {comparingProducts.map(product => (
                                            <td key={product._id}>{product.model}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>In Stock</td>
                                        {comparingProducts.map(product => (
                                            <td key={product._id}>{product.inStock ? 'Yes' : 'No'}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                }
                <div className="productsGrid">
                    {products && filterProducts(products).map(product => (
                        <div key={product._id} className="productGridItem">
                            <ProductCard product={product} key={product._id} />
                            {compareOpen && <Checkbox onClick={(e) => { handleCheck(e, product) }} />}
                        </div>
                    ))}
                </div>
            </div> :
            <div className="products">
                You must be logged in!
            </div>
    )
}

export default Products