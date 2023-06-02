import React from 'react'
import "./Order.css"

function Order({ order }) {
    return (
        <div className="orderContainer">
            <div className="orderTitle">
                <span>Order</span>
                <span className='orderFriendlyId'>{order.orderFriendlyId}</span>
            </div>
            <div className="orderDetails">
                <div className="orderMessage">
                    {order.description}
                </div>
                <div className="orderCustomerName">
                    {`Customer Name: ${order.customerName}`}
                </div>
                <div className="orderAddress">
                    {`Address: ${order.address}`}
                </div>
                <div className="orderDate">
                    {`Date: ${order.date}`}
                </div>
                <div className="orderContactPhone">
                    {`Phone: ${order.phone}`}
                </div>
                <div className="orderTotal">
                    {`Total: ${order.totalPrice} RON`}
                </div>
                <div className="orderStatus">
                    {`Status: ${order.status}`}
                </div>
            </div>
        </div>
    )
}

export default Order