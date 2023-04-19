import React from 'react'
import { useLogout } from '../hooks/useLogout'
import logo from '../assets/logo.png'
import search from '../assets/search.png'
import basketIcon from '../assets/basket.png'
import "./Navbar.css"

function Navbar() {
    const { logout } = useLogout()
    const handleClick = () => {
        logout()
    }

    // return (
    //     <div>Navbar
    //         <button onClick={handleClick}>Log out</button>
    //     </div>
    // )

    let user = ''
    let basket = 'ok'


    return (
        <div className="navbar">
            <div className="innerContainer">
                {/* logo */}
                <img src={logo} alt="logo" id='logo' />

                {/* searchbar} */}
                <div className="searchbar">
                    <input type="text" placeholder="Search" className='searchInput' />
                    <img src={search} alt="search" className="searchIcon" />
                </div>

                {/* rightcontainer */}
                <div className="navButtons">
                    <div className="navButton">
                        <p>Hello,</p>
                        <p>{user ? user?.email : "Guest"}</p>
                    </div>
                    <div className="navButton">
                        <p>Return</p>
                        <p>& Orders</p>
                    </div>
                    <div className="navButton">
                        <img src="http://localhost:9993/pic1.png" alt="basket" />
                        <p>{basket?.length}</p>
                    </div>
                </div>
            </div>

            {/* mobile searchbar} */}
            <div className="mobileSearchbar">
                <input type="text" placeholder="Search" className='searchInput' />
                <img src={search} alt="search" className="searchIcon" />
            </div>
        </div>
    )
}

export default Navbar