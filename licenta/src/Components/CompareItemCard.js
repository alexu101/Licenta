import React from 'react'
import "./CompareItemCard.css"

function CompareItemCard({ product }) {
    return (
        <div className="compareItemCard">
            <img src={`http://localhost:9993/${product.serialCode}.png`} alt="product" />
            <div className="compareItemCardTitle">
                {product.title}
            </div>
            <div className="compareItemCardPrice">
                {product.currentPrice} Lei
            </div>
        </div>

    )
}

export default CompareItemCard