import React from 'react'
import search from '../assets/search.png'
import { useState } from 'react'
import { useProductsContext } from '../hooks/useProductsContext'
import "./SearchBar.css"
import { Link } from 'react-router-dom'

function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('')
    const { products } = useProductsContext()
    const [filteredProducts, setFilteredProducts] = useState([])

    console.log("the prodacts:", products)

    const searchForProduct = (searchTerm) => {
        //search through all products
        //if product name contains searchTerm, add to array
        const filteredProducts = products?.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
        console.log(filteredProducts)
        return filteredProducts
    }

    const handleSearch = (e) => {

        setSearchTerm(e.target.value)

        if (searchTerm) {
            setFilteredProducts(searchForProduct(searchTerm))
        }
    }

    return (
        <div className="searchbar">
            <div className='searchBarContent'>
                <input type="text" placeholder="Search" className='searchInput' onChange={handleSearch} />
                <img src={search} alt="search" className="searchIcon" />
            </div>
            <div className="searchResults">
                {
                    searchTerm && filteredProducts.map(product => {
                        return (
                            <Link to={`/product/${product._id}`} className='searchResult'>
                                <img src={`http://localhost:9993/${product.serialCode}.png`} alt="" />
                                {product.title}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SearchBar