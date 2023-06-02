import React from 'react'
import { TableVirtuoso } from 'react-virtuoso';
import "./AdminBoard.css"
import { ToggleButtonGroup, Button, ToggleButton, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, InputLabel, Select, MenuItem, Modal, TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import { useProductsContext } from '../hooks/useProductsContext';
import OrderCardAdmin from './OrderCardAdmin';
import FileSaver from 'file-saver';



export default function AdminBoard() {

    const [viewMode, setViewMode] = useState('products');

    const handleChange = (event) => {
        setViewMode(event.target.value);
    };

    const { products, dispatch } = useProductsContext()

    const [orders, setOrders] = useState(null)

    useEffect(() => {
        fetch("http://localhost:5000/api/order/").then(
            async (response) => {
                const json = await response.json()
                if (response.ok) {
                    setOrders(json)
                }
            }
        )
    }, [])

    const allOrders = orders ? orders.map(order => {
        return { ...order, editable: false }
    }) : null

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


    const allProducts = products ? products.map(product => {
        return { ...product, editable: false }
    }) : null


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedProducts = allProducts?.slice(startIndex, endIndex);







    const [pageOrders, setPageOrders] = useState(0);
    const [rowsPerPageOrders, setRowsPerPageOrders] = useState(10);
    const handleChangePageOrders = (event, newPage) => {
        setPageOrders(newPage);
    };

    const handleChangeRowsPerPageOrders = (event) => {
        setRowsPerPageOrders(parseInt(event.target.value, 10));
        setPageOrders(0);
    };
    const startIndexOrders = pageOrders * rowsPerPageOrders;
    const endIndexOrders = startIndexOrders + rowsPerPageOrders;
    const paginatedOrders = allOrders?.slice(startIndexOrders, endIndexOrders);



    const ProductCardAdmin = ({ product }) => {

        const [editable, setEditable] = useState(false)
        const [title, setTitle] = useState(product.title)
        const [inStock, setInStock] = useState(product.inStock.toString())
        const [serialCode, setSerialCode] = useState(product.serialCode)
        const [producer, setProducer] = useState(product.producer)
        const [autonomy, setAutonomy] = useState(product.autonomy)
        const [range, setRange] = useState(product.range)
        const [load, setLoad] = useState(product.load)
        const [currentPrice, setCurrentPrice] = useState(product.currentPrice)
        const [oldPrice, setOldPrice] = useState(product.oldPrice ? product.oldPrice : "none")

        const handleEditable = (e) => {
            e.preventDefault()
            if (editable) {
                //if oldPrice is none, set it to null
                if (oldPrice === "none") {
                    setOldPrice(null)
                }
                //send a put request to update the product
                const bodySent = {
                    title,
                    inStock,
                    serialCode,
                    producer,
                    autonomy,
                    range,
                    load,
                    currentPrice,
                    oldPrice
                }
                console.log(bodySent)
                const updateProduct = async () => {
                    const response = await fetch(`http://localhost:5000/api/product/${product._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title,
                            inStock,
                            serialCode,
                            producer,
                            autonomy,
                            range,
                            load,
                            currentPrice,
                            oldPrice
                        })
                    })
                    if (response.ok) {
                        const json = await response.json()
                        console.log(json)
                        setTitle(json.title)
                        setInStock(json.inStock.toString())
                        setSerialCode(json.serialCode)
                        setProducer(json.producer)
                        setAutonomy(json.autonomy)
                        setRange(json.range)
                        setLoad(json.load)
                        setCurrentPrice(json.currentPrice)
                        setOldPrice(json.oldPrice ? json.oldPrice : "none")
                    }
                }
                updateProduct()
            }
            setEditable(!editable)
        }

        const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false)

        const handleDelete = () => {
            setDeleteProductModalOpen(false)
            const deleteProduct = async () => {
                const response = await fetch(`http://localhost:5000/api/product/${product._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    const json = await response.json()
                    console.log(json)
                    dispatch({ type: 'DELETE_PRODUCT', payload: json })
                }
            }
            deleteProduct()
        }

        return (

            <TableRow key={product.serialCode}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                    <img src={`http://localhost:9993/${product.serialCode}.png`} alt="product_pic" id='cardImageAdmin' />
                </TableCell>
                <TableCell align="right">{
                    editable ?
                        <input className='editableInput' type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} /> :
                        title
                }</TableCell>
                <TableCell align="right">{
                    editable ?
                        <div>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={inStock}
                                onChange={(e) => { setInStock(e.target.value.toString()) }}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div> :
                        inStock
                }</TableCell>
                <TableCell align="right">{
                    editable ?
                        <input className='editableInput' type="text" value={serialCode} onChange={(e) => { setSerialCode(e.target.value) }} /> :
                        serialCode
                }</TableCell>
                <TableCell align="right">{
                    editable ?
                        <input className='editableInput' type="text" value={producer} onChange={(e) => { setProducer(e.target.value) }} /> :
                        producer
                }</TableCell>
                <TableCell align="right">{
                    editable ?
                        <input className='editableInput' type="text" value={autonomy} onChange={(e) => { setAutonomy(e.target.value) }} /> :
                        autonomy
                }</TableCell>
                <TableCell align="right">{
                    editable ?
                        <input className='editableInput' type="text" value={range} onChange={(e) => { setRange(e.target.value) }} /> :
                        range
                }</TableCell>
                <TableCell align="right">{
                    editable ?
                        <input className='editableInput' type="text" value={load} onChange={(e) => { setLoad(e.target.value) }} /> :
                        load
                }</TableCell>
                <TableCell align="right">{
                    editable ?
                        <input className='editableInput' type="text" value={currentPrice} onChange={(e) => { setCurrentPrice(e.target.value) }} /> :
                        currentPrice
                }</TableCell>
                <TableCell align="right">{
                    editable ?
                        <input className='editableInput' type="text" value={oldPrice} onChange={(e) => { setOldPrice(e.target.value) }} /> :
                        oldPrice
                }</TableCell>
                <TableCell align="right">
                    <div className="actions">
                        <Button variant='contained' className='actionEditBtn' onClick={(e) => { handleEditable(e) }}>{editable ? 'APPLY' : 'EDIT'}</Button>
                        {!editable && <Button variant='contained' className='actionDeleteBtn' onClick={(e) => { setDeleteProductModalOpen(true) }}>DELETE</Button>
                        }
                        <Modal
                            open={deleteProductModalOpen}
                            onClose={() => { setDeleteProductModalOpen(false) }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <div className="modal">
                                <h2 id="modal-modal-title">Are you sure you want to delete this product?</h2>
                                <div className="modalBtns">
                                    <Button variant='contained' className='modalBtn' onClick={() => { setDeleteProductModalOpen(false) }}>NO</Button>
                                    <Button variant='contained' className='modalBtn' onClick={() => { handleDelete() }}>YES</Button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </TableCell>

            </TableRow>

        )
    }


    const EditableProductCard = ({ product }) => {
        return (
            <></>
        )
    }

    const [newEntryTitle, setNewEntryTitle] = useState('')
    const [newEntryInStock, setNewEntryInStock] = useState('')
    const [newEntrySerialCode, setNewEntrySerialCode] = useState('')
    const [newEntryProducer, setNewEntryProducer] = useState('')
    const [newEntryAutonomy, setNewEntryAutonomy] = useState('')
    const [newEntryRange, setNewEntryRange] = useState('')
    const [newEntryLoad, setNewEntryLoad] = useState('')
    const [newEntryCurrentPrice, setNewEntryCurrentPrice] = useState('')
    const [newEntryOldPrice, setNewEntryOldPrice] = useState('')

    const handleAddNewProduct = (e) => {

        const bodySent = {
            title: newEntryTitle,
            inStock: newEntryInStock,
            serialCode: newEntrySerialCode,
            producer: newEntryProducer,
            autonomy: newEntryAutonomy,
            range: newEntryRange,
            load: newEntryLoad,
            currentPrice: newEntryCurrentPrice,
            oldPrice: isNaN(newEntryOldPrice) ? null : newEntryOldPrice
        }
        const addNewEntry = async () => {
            const response = await fetch('http://localhost:5000/api/product/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodySent)
            })
            if (response.ok) {
                const json = await response.json()
                console.log(json)
            }
        }
        addNewEntry()

        //refresh page
        window.location.reload()
    }

    //when clicked ont button  all products will be converted to csv and downloaded
    const handleDownloadAllProducts = () => {
        // export all products from allProducts array to csv

        const products = allProducts.map((product) => {
            return {
                title: product.title,
                inStock: product.inStock,
                serialCode: product.serialCode,
                producer: product.producer,
                autonomy: product.autonomy,
                range: product.range,
                load: product.load,
                currentPrice: product.currentPrice,
                oldPrice: product.oldPrice
            }
        })

        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(products[0])
        let csv = products.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        csv.unshift(header.join(','))
        csv = csv.join('\r\n')

        //download csv file
        const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const csvURL = window.URL.createObjectURL(csvData)
        const tempLink = document.createElement('a')
        tempLink.href = csvURL
        tempLink.setAttribute('download', 'products.csv')
        tempLink.click()
    }


    //add multiple products from csv
    const [file, setFile] = useState();

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const csvFileToJSON = (csvOutput) => {

    }


    const handleOnSubmit = (e) => {
        //the json has the following structure:
        // {
        //     "title": "product title",
        //     "inStock": "product inStock",
        //     "serialCode": "product serialCode",
        //     "producer": "product producer",
        //     "autonomy": "product autonomy",
        //     "range": "product range",
        //     "load": "product load",
        //     "currentPrice": "product currentPrice",
        //     "oldPrice": "product oldPrice"

        // }

        //oldPrice can be empty

        e.preventDefault();

        fileReader.readAsText(file);

        fileReader.onloadend = () => {
            const csvOutput = fileReader.result;
            const lines = csvOutput.split('\n');
            const result = [];
            const headers = lines[0].split(',');

            for (let i = 1; i < lines.length; i++) {
                const obj = {};
                const currentline = lines[i].split(',');

                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }

                result.push(obj);
            }

            console.log(result)

            /*convert csv to json(import functionality)

            for(let product in result){
                const bodySent = {
                    title: product.title,
                    inStock: product.inStock,
                    serialCode: product.serialCode,
                    producer: product.producer,
                    autonomy: product.autonomy,
                    range: product.range,
                    load: product.load,
                    currentPrice: product.currentPrice,
                    oldPrice: product.oldPrice
                }
                const addNewEntry = async () => {
                    const response = await fetch('http://localhost:5000/api/product/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bodySent)
                    })
                    if (response.ok) {
                        const json = await response.json()
                        console.log(json)
                    }
                }
                addNewEntry()
            }*/


        }
    };

    return (
        <div className="adminBoard">
            <div className="adminNavbar">
                <div className="adminBoardTitle">
                    Welcome back, Admin!
                </div>
                <form className='importForm'>
                    <input type="file" name="file" id="file" className="inputfile" onChange={handleOnChange} />
                    <label htmlFor="file" onChange={handleOnChange}>Choose a file</label >
                    <button onClick={(e) => {
                        handleOnSubmit(e);
                    }}>IMPORT CSV</button>
                </form>
                <button onClick={handleDownloadAllProducts} className='exportButton'>Export File Info</button>
                <ToggleButtonGroup
                    color="primary"
                    value={viewMode}
                    exclusive
                    onChange={handleChange}
                    aria-label="viewMode"
                    id='viewMode'
                    sx={{ border: 0 }}
                >
                    <ToggleButton className='toggleBtn' sx={{ borderRadius: '20px 0px 0px 20px', borderRight: '0 !important' }} value="orders">Orders</ToggleButton>
                    <ToggleButton className='toggleBtn' sx={{ borderRadius: '0px 20px 20px 0px' }} value="products">Products</ToggleButton>
                </ToggleButtonGroup>
            </div>

            {
                viewMode === 'orders' ?
                    <div className="products">
                        <Paper style={{ width: '90%', alignItems: 'center', justifyContent: 'center' }}>
                            <TableContainer component={Paper} >
                                <TableHead >
                                    <TableRow>
                                        <TableCell >Orders</TableCell>
                                        <TableCell align="right">Products</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                        <TableCell align="right">Customer Name</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">Description</TableCell>
                                        <TableCell align="right">Address</TableCell>
                                        <TableCell align="right">Phone</TableCell>
                                        <TableCell align="right">Email</TableCell>
                                        <TableCell align="right">Pickup Method</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedOrders?.map(order => {
                                        return order.editable === false ? <OrderCardAdmin order={order} /> : <EditableProductCard order={order} />
                                    })}
                                </TableBody>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={allOrders?.length}
                                rowsPerPage={rowsPerPageOrders}
                                page={pageOrders}
                                onPageChange={handleChangePageOrders}
                                onRowsPerPageChange={handleChangeRowsPerPageOrders}
                            />
                        </Paper>
                    </div>
                    :
                    <div className="products">
                        <Paper style={{ width: '90%', alignItems: 'center', justifyContent: 'center' }}>
                            <TableContainer component={Paper} >
                                <TableHead >
                                    <TableRow>
                                        <TableCell >Product</TableCell>
                                        <TableCell align="right">Title</TableCell>
                                        <TableCell align="right">In Stock</TableCell>
                                        <TableCell align="right">Serial Code</TableCell>
                                        <TableCell align="right">Producer</TableCell>
                                        <TableCell align="right">Autonomy</TableCell>
                                        <TableCell align="right">Range</TableCell>
                                        <TableCell align="right">Load</TableCell>
                                        <TableCell align="right">Current Price</TableCell>
                                        <TableCell align="right">Old Price</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell >Add data:</TableCell>
                                        {/* add inputs to create a new product */}
                                        <TableCell align="right"><input className='editableInput' type="text" value={newEntryTitle} onChange={(e) => { setNewEntryTitle(e.target.value) }} /></TableCell>
                                        <TableCell align="right">
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={newEntryInStock}
                                                onChange={(e) => { setNewEntryInStock(e.target.value.toString()) }}
                                            >
                                                <MenuItem value={true}>True</MenuItem>
                                                <MenuItem value={false}>False</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell align="right"><input className='editableInput' type="text" value={newEntrySerialCode} onChange={(e) => { setNewEntrySerialCode(e.target.value) }} /></TableCell>
                                        <TableCell align="right"><input className='editableInput' type="text" value={newEntryProducer} onChange={(e) => { setNewEntryProducer(e.target.value) }} /></TableCell>
                                        <TableCell align="right"><input className='editableInput' type="text" value={newEntryAutonomy} onChange={(e) => { setNewEntryAutonomy(e.target.value) }} /></TableCell>
                                        <TableCell align="right"><input className='editableInput' type="text" value={newEntryRange} onChange={(e) => { setNewEntryRange(e.target.value) }} /></TableCell>
                                        <TableCell align="right"><input className='editableInput' type="text" value={newEntryLoad} onChange={(e) => { setNewEntryLoad(e.target.value) }} /></TableCell>
                                        <TableCell align="right"><input className='editableInput' type="text" value={newEntryCurrentPrice} onChange={(e) => { setNewEntryCurrentPrice(e.target.value) }} /></TableCell>
                                        <TableCell align="right"><input className='editableInput' type="text" value={newEntryOldPrice} onChange={(e) => { setNewEntryOldPrice(e.target.value) }} /></TableCell>
                                        <TableCell align="right">
                                            <Button variant='contained' className='actionEditBtn' onClick={(e) => { handleAddNewProduct(e) }}>ADD NEW PRODUCT</Button>
                                        </TableCell>
                                    </TableRow>
                                    {paginatedProducts?.map(product => {
                                        return product.editable === false ? <ProductCardAdmin product={product} /> : <EditableProductCard product={product} />
                                    })}
                                </TableBody>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={allProducts?.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
            }
        </div>
    );
}