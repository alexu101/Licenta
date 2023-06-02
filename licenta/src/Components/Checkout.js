import React from 'react'
import "./Checkout.css"
import { useBasketContext } from '../hooks/useBasketContext'
import { useEffect, useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, TextField, FormControl } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import PlaceIcon from '@mui/icons-material/Place';
import { MuiTelInput } from 'mui-tel-input'
import Payment from './Payment'
import "./Navbar"

import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import Navbar from './Navbar'


function Checkout() {

    const [productsFromBasket, setProductsFromBasket] = useState([])
    const [loading, setLoading] = useState(true)
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.['token'];
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [homeDelivery, setHomeDelivery] = useState(false)
    const [pickup, setPickup] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
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
            if (response.ok) {
                return response.json()
            }
            else throw response
        }
        getBasket().then(
            data => {
                fetch("http://localhost:5000/api/product/multiple",
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ids: data })
                    }
                )
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        }
                        else throw response
                    })
                    .then(data => {
                        setProductsFromBasket(data)
                    })
                    .catch(error => {
                        console.error("Error fetching data: ", error)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            })

    }, [token])

    const handleChangeAddress = address => {
        setAddress(address);
    };

    const handleSelectAddress = address => {
        // geocodeByAddress(address)
        //     .then(results => getLatLng(results[0]))
        //     .then(latLng => console.log('Success', latLng))
        //     .catch(error => console.error('Error', error));
        setAddress(address)
    };

    const handlePhoneChange = (value) => {
        console.log(value)
        setPhone(value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }

    const handleHomeDelivery = () => {
        setHomeDelivery(true)
        setPickup(false)
    }

    const handlePickup = () => {
        setPickup(true)
        setHomeDelivery(false)
    }



    return (
        <div className="checkout">
            <Navbar />
            <div className="checkoutTitle">
                Checkout...
            </div>
            <div className="checkoutContainer">
                <div className="accordions">
                    <FormControl className='formControl' component="form">
                        <Accordion className='accordion'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />} id="accordionSummary">
                                <span>Delivery Options</span>
                            </AccordionSummary>
                            <AccordionDetails className='accordionDetails'>
                                <div className="address">
                                    <div className="delivery">
                                        <div className="homeDelivery" onClick={handleHomeDelivery} style={{ border: homeDelivery && 'solid 2px #1975d0', color: homeDelivery && '#1975d0' }}>
                                            <AirportShuttleIcon />
                                            <span>Home delivery</span>
                                        </div>
                                        <div className="pickUpDelivery" onClick={handlePickup} style={{ border: pickup && 'solid 2px #1975d0', color: pickup && '#1975d0' }}>
                                            <PlaceIcon />
                                            <span>Pick up from store</span>
                                        </div>
                                    </div>
                                    <div className="name">
                                        <TextField id="outlined-basic" label="First Name" variant="outlined" sx={{ margin: '5px', width: '100%' }} value={firstName} onChange={handleFirstNameChange} />
                                        <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{ margin: '5px', width: '100%' }} value={lastName} onChange={handleLastNameChange} />
                                    </div>
                                    <div className="addressInput">
                                        <PlacesAutocomplete
                                            value={address}
                                            onChange={handleChangeAddress}
                                            onSelect={handleSelectAddress}
                                            className='placesAutocomplete'
                                        >
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                <div className='autocompleteWrapper'>
                                                    <TextField id="outlined-basic" label="Address" variant="outlined" sx={{ margin: '5px', width: '100%' }}
                                                        {...getInputProps({
                                                            className: 'location-search-input',
                                                        })}
                                                    />
                                                    <div className="autocomplete-dropdown-container">
                                                        {loading && <div>Loading...</div>}
                                                        {suggestions.map(suggestion => {
                                                            const className = suggestion.active
                                                                ? 'suggestion-item--active'
                                                                : 'suggestion-item';
                                                            // inline style for demonstration purpose
                                                            const style = suggestion.active
                                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                            return (
                                                                <div
                                                                    {...getSuggestionItemProps(suggestion, {
                                                                        className,
                                                                        style,
                                                                    })}
                                                                >
                                                                    <span>{suggestion.description}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </PlacesAutocomplete>
                                    </div>
                                    <div className="contactDetails">
                                        <MuiTelInput label="Phone Number" value={phone} onChange={handlePhoneChange} focusOnSelectCountry preferredCountries={['RO']} defaultCountry='RO' sx={{ margin: '5px', width: '100%' }} />
                                        <TextField id="emailTextField" type='email' label="Email adress" variant='outlined' margin='normal' fullWidth onChange={handleEmailChange} value={email} sx={{ margin: '5px', width: '100%' }} />
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </FormControl>
                    <Accordion className='accordion'>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />} id="accordionSummary">
                            <span>Payment</span>
                        </AccordionSummary>
                        <AccordionDetails className='accordionDetails'>
                            <Payment homeDelivery={homeDelivery} pickupDelivery={pickup} firstName={firstName}
                                lastName={lastName} address={address} phone={phone} email={email} productsFromBasket={productsFromBasket}
                            />
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className="productsOverview">
                    <div className="productsOverviewTitle">
                        {productsFromBasket.length} products in your basket
                    </div>
                    <div className="productsOverviewContainer">
                        {productsFromBasket.map(product => {
                            return (
                                <div className="productOverview">
                                    <img src={`http://localhost:9993/${product.serialCode}.png`} alt="" />
                                    <span>{product.title}</span>
                                </div>
                            )
                        })}

                        <div className="totalToPay">
                            <span>Total to pay: </span>
                            <span>{productsFromBasket.reduce((a, b) => a + b.currentPrice, 0)} RON</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Checkout