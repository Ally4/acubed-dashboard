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
import { FaCartPlus } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";




const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const getActiveItem = () => {
        if (location.pathname === '/dashboard' || location.pathname === '/facility/:id' || location.pathname === '/tests/:id') return 'dashboard';
        if (location.pathname === '/my-orders' || location.pathname === '/order-details') return 'orders';
        if (location.pathname === '/cart') return 'cart';
        if (location.pathname === '/') return 'home';
        return '';
    };

    const activeItem = getActiveItem();

    const Signout = () => {
        dispatch(logout());
        navigate('/');
    }
    return (
        <div className='container'>
            <div className='sub-menu-container mt-2 md:mt-10'>
                <Link to='/' className='logo-container'>
                    <img className='big-logo' src={logo} alt='logo'></img>
                    <img className='small-logo' src={logo2} alt='logo'></img>
                </Link>
                <ul>
                    <li className={`bars ${activeItem === 'dashboard' ? 'active' : ''}`}>
                        <Link to='/dashboard' className='sidebar-link'>
                            <MdSpaceDashboard color={'white'} size={28}/>
                            <p className='link-text'>Home</p>
                        </Link>
                    </li>
                    <li className={`bars ${activeItem === 'orders' ? 'active' : ''}`}>
                        <Link to='/my-orders' className='sidebar-link'>
                            <RiListOrdered2 color={'white'} size={28}/>
                            <p className='link-text'>Orders</p>
                        </Link>
                    </li>
                    <li className={`bars ${activeItem === 'cart' ? 'active' : ''}`}>
                        <Link to='/cart' className='sidebar-link'>
                            <FaCartPlus color={'white'} size={26}/>
                            <p className='link-text'>Cart</p>
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