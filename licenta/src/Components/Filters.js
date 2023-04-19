import React from 'react'
import './Filters.css'
import { Checkbox, FormControl, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import { useState } from 'react';
import Button from '@mui/material/Button'

function Filters() {

    const [sliderValue, setSliderValue] = useState([0, 1000]) //price range
    const [checkboxValue, setCheckboxValue] = useState({
        "dji": false,
        "autel": false,
        "parrot": false,
    }) //brand
    const [autonomy, setAutonomy] = useState('none') //autonomy
    const [distance, setDistance] = useState('none') //distance
    const [load, setLoad] = useState('none') //load


    const handleSliderChange = (event) => {
        console.log(event.target.value)
        setSliderValue(event.target.value);
    };

    const handleRadioAutonomy = (event) => {
        console.log(event.target.value)
        setAutonomy(event.target.value);
    };

    const handleRadioDistance = (event) => {
        console.log(event.target.value)
        setDistance(event.target.value);
    };

    const handleRadioLoad = (event) => {
        console.log(event.target.value)
        setLoad(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(checkboxValue)
        console.log(autonomy)
        console.log(distance)
        console.log(load)
        console.log(sliderValue)
    }

    return (
        <div className='filters'>
            <span id='filterTitle'>FILTRE</span>
            <FormControl className='formControl' component="form" onSubmit={handleSubmit}>
                <div className="formCategory">
                    <FormLabel id="formLabel">BRAND</FormLabel>
                    <FormControlLabel value="dji" control={<Checkbox />} label="DJI" onChange={(e) => {
                        setCheckboxValue({ ...checkboxValue, "dji": e.target.checked })
                    }} />
                    <FormControlLabel value="autel" control={<Checkbox />} label="AutelRobotics" onChange={(e) => {
                        setCheckboxValue({ ...checkboxValue, "autel": e.target.checked })
                    }} />
                    <FormControlLabel value="parrot" control={<Checkbox />} label="Parrot" onChange={(e) => {
                        setCheckboxValue({ ...checkboxValue, "parrot": e.target.checked })
                    }} />
                </div>

                <div className="separator" />

                <div className="formCategory">
                    <FormLabel id="formLabel">AUTONOMIE TIMP DE ZBOR</FormLabel>
                    <RadioGroup defaultValue="none" name="autonomy-radio-buttons-group" onChange={handleRadioAutonomy} >
                        <FormControlLabel value="none" control={<Radio />} label="Indiferent" />
                        <FormControlLabel value="35" control={<Radio />} label=">35min" />
                        <FormControlLabel value="25,35" control={<Radio />} label="25min-35min" />
                        <FormControlLabel value="10,25" control={<Radio />} label="10min-25min" />
                    </RadioGroup>
                </div>

                <div className="separator" />

                <div className="formCategory">
                    <FormLabel id="formLabel">DISTANTA MAX. DE OPERARE</FormLabel>
                    <RadioGroup defaultValue="none" name="distance-radio-buttons-group" onChange={handleRadioDistance}>
                        <FormControlLabel value="none" control={<Radio />} label="Indiferent" />
                        <FormControlLabel value="9000" control={<Radio />} label=">9000m" />
                        <FormControlLabel value="4000,9000" control={<Radio />} label="4000m-9000m" />
                        <FormControlLabel value="1000,4000" control={<Radio />} label="1000m-9000m" />
                    </RadioGroup>
                </div>

                <div className="separator" />

                <div className="formCategory">
                    <FormLabel id="formLabel">GREUTATE INCARCATURA</FormLabel>
                    <RadioGroup defaultValue="none" name="load-radio-buttons-group" onChange={handleRadioLoad}>
                        <FormControlLabel value="none" control={<Radio />} label="Indiferent" />
                        <FormControlLabel value="0,250" control={<Radio />} label="<250G" />
                        <FormControlLabel value="250,500" control={<Radio />} label="250g-500g" />
                        <FormControlLabel value="500,2000" control={<Radio />} label="500g-2kg" />
                        <FormControlLabel value="2000" control={<Radio />} label=">2kG" />
                    </RadioGroup>
                </div>

                <div className="separator" />

                <div className="formCategory">
                    <FormLabel id="formLabel">PRET</FormLabel>
                    <div className="priceRange">
                        <Slider value={sliderValue} onChange={handleSliderChange} disableSwap step={10} id="slider" />
                        <div className="priceLimits">
                            <span className="priceRangeMin">{`${sliderValue[0]} Lei`}</span>
                            <span className="priceRangeMax">{`${sliderValue[1]} Lei`}</span>
                        </div>
                    </div>
                </div>
                <Button variant='contained' className='applyFiltersButton' type='submit'>APPLY FILTERS</Button>
            </FormControl>
        </div>
    )
}

export default Filters