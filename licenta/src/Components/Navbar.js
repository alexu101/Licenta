import React, { useState } from 'react'
import { useLogout } from '../hooks/useLogout'
import logo from '../assets/logo.png'
import search from '../assets/search.png'
import basketIcon from '../assets/basket.png'
import "./Navbar.css"
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'
import { useBasketContext } from '../hooks/useBasketContext'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import SearchBar from './SearchBar'
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material'

function Navbar() {
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false)
    const { logout } = useLogout()
    const handleLogout = () => {
        logout()
    }

    const user = JSON.parse(localStorage.getItem('user'))
    const logged = user ? true : false

    const openBurgerMenu = () => {
        setBurgerMenuOpen(!burgerMenuOpen)
    }

    return (
        <div className="navbar">
            <div className="innerContainer">
                {/* logo */}
                <img src={logo} alt="logo" id='logo' />

                {/* searchbar} */}
                <SearchBar />

                {/* rightcontainer */}
                <div className="navButtons">
                    <Link className="navButton" to="/login">
                        <p>Hello,</p>
                        <p>{user ? user?.email.split('@')[0] : "Guest"}</p>
                    </Link>
                    {
                        logged &&
                        <Link to={'/orders'} className='link'>
                            <div className="navButton">
                                <p>Your</p>
                                <p>Orders</p>
                            </div>
                        </Link>
                    }
                    <div className="navButton">
                        <Link to={'/basket'} className='link'>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </Link>
                    </div>
                    <div className="navButton">
                        <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} />
                    </div>
                </div>
            </div>

            {/* mobile searchbar} */}
            <div className="mobileSearchbar">
                {/* searchbar} */}
                <SearchBar />
                <div className="burgerMenu">
                    <IconButton onClick={openBurgerMenu}>
                        <MenuIcon />
                    </IconButton>
                </div>
                {burgerMenuOpen && <div className="burgerContent">
                    <Link className="navButton" to="/login">
                        <p>Hello,</p>
                        <p>{user ? user?.email.split('@')[0] : "Guest"}</p>
                    </Link>
                    {
                        logged &&
                        <Link to={'/orders'} className='link'>
                            <div className="navButton">
                                <p>You Orders</p>
                            </div>
                        </Link>
                    }
                    <div className="navButton">
                        <Link to={'/basket'} className='link'>
                            <p>Basket</p>
                        </Link>
                    </div>
                    <div className="navButton">
                        <p>Logout</p>
                    </div>

                </div>}
            </div>
        </div>
    )
}

export default Navbar