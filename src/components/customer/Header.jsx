import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../style/Header.css'
import profileImage from '../../images/profile.png'
import logo from '../../images/logo-blue.png'
import { GiHamburgerMenu } from "react-icons/gi";


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
                <div className='nav-container'>
                    <div className='sandwhich'>
                        <GiHamburgerMenu size={28} color='#000'/>
                    </div>
                <div className='logo-container'>
                    <img src={logo} alt='Logo' />
                </div>
                </div>
                
                {/* <ul>
                    <li className='links'> <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/dashboard'>Dashboard</Link></li>
                    <li className='links'> <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/customer-orders'>Orders</Link></li>
                </ul>
                <div className='profile-box'>
                    <p className='signout' onClick={Signout}>Sign out</p>
                
                    <div className='profile-container'>
                        <img src={profileImage} alt='Profile'/>
                    </div>
                </div> */}
            </nav>
            // </div>
    )
}

export default Header