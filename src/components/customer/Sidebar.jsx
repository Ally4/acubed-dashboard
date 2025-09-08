import React, { useState } from 'react'
import '../../style/Sidebar.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/loginSlice';

import profileImage from '../../images/profile.png'
import logo from '../../images/logo-white.png'
import logo2 from '../../images/acubed-logo.jpeg'

import { RiListOrdered2 } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";




const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const getActiveItem = () => {
        if (location.pathname === '/dashboard' || location.pathname === '/facility' || location.pathname === '/tests') return 'dashboard';
        if (location.pathname === '/my-orders') return 'orders';
        return '';
    };

    const activeItem = getActiveItem();

    const Signout = () => {
        dispatch(logout());
        navigate('/');
    }
    return (
        <div className='container'>
            <div className='sub-menu-container'>
                <Link to='/dashboard' className='logo-container'>
                    <img className='big-logo' src={logo} alt='logo'></img>
                    <img className='small-logo' src={logo2} alt='logo'></img>
                </Link>
                <ul>
                    <li className={`bars ${activeItem === 'dashboard' ? 'active' : ''}`}>
                        <Link to='/dashboard' className='sidebar-link'>
                            <MdSpaceDashboard color={'white'} size={28}/>
                            <p className='link-text'>Dashboard</p>
                        </Link>
                    </li>
                    <li className={`bars ${activeItem === 'orders' ? 'active' : ''}`}>
                        <Link to='/my-orders' className='sidebar-link'>
                            <RiListOrdered2 color={'white'} size={28}/>
                            <p className='link-text'>Orders</p>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='profile-box'>
                <Link to="/profile">
                    <img className='profile-img' src={profileImage} alt='Profile'/>
                </Link>
                <p className='signout' onClick={Signout}>Sign out</p>
            </div>

        </div>
    )
}

export default Sidebar