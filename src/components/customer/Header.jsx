import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../style/Header.css'
import profileImage from '../../images/profile.png'
import logo from '../../images/logo-white.png'

const Header = () => {
    const navigate = useNavigate();
    const Signout = () => {
        console.log('signing out')
        //destroy jwt?
        navigate('/');
    }

    return(
        // <div className='header'>
            <nav className=''>
                <div className='logo-container'>
                    <img src={logo} alt='Logo' />
                </div>
                <ul>
                    <li className='links'> Dashboard</li>
                    <li className='links'>Orders</li>
                </ul>
                <div className='profile-box'>
                    <p className='signout' onClick={Signout}>Sign out</p>
                
                    <div className='profile-container'>
                        <img src={profileImage} alt='Profile'/>
                    </div>
                </div>
            </nav>
            // </div>
    )
}

export default Header