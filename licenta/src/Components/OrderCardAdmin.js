import React, { useEffect } from 'react'
import { useState } from 'react'
import { TableRow, TableCell, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material'

function OrderCardAdmin({ order }) {


    const [orderFriendlyId, setOrderFriendlyId] = useState(order.orderFriendlyId)
    const [products, setProducts] = useState(order.products)
    const [totalPrice, setTotalPrice] = useState(order.totalPrice)
    const [customerName, setCustomerName] = useState(order.customerName)
    const [status, setStatus] = useState(order.status)
    const [date, setDate] = useState(order.date)
    const [description, setDescription] = useState(order.description)
    const [address, setAddress] = useState(order.address)
    const [phone, setPhone] = useState(order.phone)
    const [email, setEmail] = useState(order.email)
    const [pickupMethod, setPickupMethod] = useState(order.pickupMethod)
    const [editable, setEditable] = useState(false)

    useEffect(() => {
        //replace the products ids with the products names
        const getProductsNames = async () => {
            await fetch('http://localhost:5000/api/product')
                .then(res => res.json())
                .then(data => {
                    const productsNames = []
                    products.forEach(product => {
                        const productObj = data.find(p => p._id === product)
                        // push only if the product is not already in the array
                        if (productObj && !productsNames.includes(productObj.title)) {
                            productsNames.push(productObj.title)
                        }

                    })
                    setProducts(productsNames)
                })
                .catch(err => console.log(err))
        }

        getProductsNames()
    }, [])



    const handleEditable = (e) => {
        e.preventDefault()
        setEditable(!editable)

        if (editable) {
            const data = {
                friendlyId: orderFriendlyId,
                products: products,
                totalPrice: totalPrice,
                customerName: customerName,
                status: status,
                date: date,
                description: description,
                address: address,
                phone: phone,
                email: email,
                pickupMethod: pickupMethod
            }

            fetch(`http://localhost:5000//api/order/${order._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
        }
    }



    return (
        <TableRow>
            <TableCell align="right">{orderFriendlyId}</TableCell>
            <TableCell align="right">{products}</TableCell>
            <TableCell align="right">{totalPrice}</TableCell>
            <TableCell align="right">{customerName}</TableCell>
            <TableCell align="right">{
                editable ?
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value={'In asteptare'}>In asteptare</MenuItem>
                            <MenuItem value={'In curs de procesare'}>In curs de procesare</MenuItem>
                            <MenuItem value={'Finalizata'}>Finalizata</MenuItem>
                        </Select>
                    </FormControl>
                    : status
            }</TableCell>
            <TableCell align="right">{date}</TableCell>
            <TableCell align="right">{
                editable ?
                    <TextField
                        id="outlined-multiline-static"
                        label="Descriere"
                        multiline
                        rows={4}
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    : description
            }</TableCell>
            <TableCell align="right">{address}</TableCell>
            <TableCell align="right">{phone}</TableCell>
            <TableCell align="right">{email}</TableCell>
            <TableCell align="right">{pickupMethod}</TableCell>
            <TableCell align="right">
                <Button className='actionEditBtn' onClick={handleEditable} sx={{ color: "white" }}>{editable ? 'Salveaza' : 'Editeaza'}</Button>
            </TableCell>
        </TableRow>
    )
}

export default OrderCardAdmin