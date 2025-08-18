import React from 'react'
import '../../style/Sidebar.css'
import { Link, useNavigate } from 'react-router-dom';
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
    
    const Signout = () => {
        dispatch(logout());
        navigate('/');
    }
    return (
        <div className='container'>
            <div className='sub-menu-container'>
                <div className='logo-container'>
                    <img className='big-logo' src={logo} alt='logo'></img>
                    <img className='small-logo' src={logo2} alt='logo'></img>
                </div>
                <ul>
                    <li className='bars'>
                        <MdSpaceDashboard color={'white'} size={28}/>
                        <Link to='/dashboard' className='links'>Dashboard</Link>
                    </li>
                    <li className='bars'>
                        <RiListOrdered2 color={'white'} size={28}/>
                        <Link to='/customer-orders' className='links'>Orders</Link>
                    </li>
                </ul>
            </div>

            <div className='profile-box'>
                <Link to="/profile">
                    <img className='profile-img' src={profileImage} alt='Profile'/>
                </Link>
                <p className='user-info' onClick={Signout}>Sign out</p>
            </div>

        </div>
    )
}

export default Sidebar