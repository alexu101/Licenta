import React from 'react'
import Navbar from './Navbar'
import "./Home.css"
import Filters from './Filters'
import ProuctCard from './ProuctCard'
import Products from './Products'

function Home() {
    return (
        <div className="home">
            <Navbar />
            <div className="mainContainer">
                <div className="leftContainer">
                    <Filters />
                </div>
                <div className="rightContainer">
                    <Products />
                </div>
            </div>
        </div>
    )
}

export default Home