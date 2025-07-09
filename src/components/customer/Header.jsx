import React from 'react'
import { Link } from 'react-router-dom'
import '../../style/Header.css'
import profileImage from '../../images/profile.png'
import logo from '../../images/logo-white.png'

const Header = () => {
    return(
        <div className='header'>
            <nav className=''>
                <div className='logo-container'>
                    <img src={logo} alt='Logo' />
                </div>
                <ul>
                    <li className='links'> <Link to='' >Dashboard</Link></li>
                    <li className='links'><Link to='' >Orders</Link></li>
                </ul>

                <div className='profile-container'>
                    <img src={profileImage} alt='Profile'/>
                </div>
            </nav>
            </div>
    )
}

export default Header