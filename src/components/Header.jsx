import logo from '../images/logo-blue.png'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/loginSlice';
import { GiHamburgerMenu } from "react-icons/gi";



const Header =() => {
    const user = useSelector((state) => state.login.data);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const auth = () => {
        if (user) {
            dispatch(logout());
        } else {
            navigate('/login');
        }
    }
    const signup = () => {
        navigate('/signup');
    }
    return (
        <div className='w-full bg-[var(--medium-gray)] h-16 py-4 flex items-center justify-center fixed top-0 left-0 z-30'>
        <nav className="w-full lg:w-11/12 xl:w-10/12 fixed top-0 bg-[var(--medium-gray)] z-30 flex items-center justify-between px-4 xl:px-16 py-4 h-16">
            <Link to="/"><img className='max-h-full cursor-pointer' src={logo} alt="logo" /></Link>
            <div className='hidden md:flex items-center justify-center gap-4 lg:gap-6 xl:gap-10'>
                <Link to="/dashboard/All">
                    <p className='text-base xl:text-lg'>Dashboard</p>
                </Link>
                <HashLink smooth to="/#how-it-works">
                    <p className='text-base xl:text-lg'>How it Works</p>
                </HashLink>
                <HashLink smooth to="/#features">
                    <p className='text-base xl:text-lg'>Features</p>
                </HashLink>
                <HashLink smooth to="/#about">
                    <p className='text-base xl:text-lg'>About Us</p>
                </HashLink>
                <HashLink smooth to="/#contact">
                    <p className='text-base xl:text-lg'>Contact</p>
                </HashLink>
            </div>
            <div className='hidden md:flex items-center justify-center gap-4 xl:gap-6'>
                <p onClick={() => auth()} className='text-base xl:text-lg text-[var(--secondary-color)]  cursor-pointer'>Log{user ? 'out' : 'in'}</p>
                <p onClick={() => signup()} className='text-base text-center xl:text-lg bg-[var(--secondary-color)] hover:bg-opacity-30 text-white  cursor-pointer rounded-md px-3 py-2'>Sign up</p>
            </div>
            <div onClick={()=>setShowMenu(!showMenu)} className='md:hidden flex flex-col gap-1 cursor-pointer'>
                <GiHamburgerMenu size={24} color="#136a82" />
            </div>


            <div className='w-full xs:w-40 flex md:hidden flex-col items-center justify-center bg-[var(--medium-gray)] absolute top-16 right-0 transition-all duration-300 ease-in-out' style={{maxHeight: showMenu ? '350px' : '0', overflow:'hidden'}}>
                <Link to="/dashboard/All" onClick={() => setShowMenu(false)} className='w-full text-center border-b border-gray-400 py-3 hover:bg-gray-200'>
                    <p className='text-base xl:text-lg'>Dashboard</p>
                </Link>
                <HashLink smooth to="/#how-it-works" onClick={() => setShowMenu(false)} className='w-full text-center border-b border-gray-400 py-3 hover:bg-gray-200'>
                    <p className='text-base xl:text-lg'>How it Works</p>
                </HashLink>
                <HashLink smooth to="/#features" onClick={() => setShowMenu(false)} className='w-full text-center border-b border-gray-400 py-3 hover:bg-gray-200'>
                    <p className='text-base xl:text-lg'>Features</p>
                </HashLink>
                <HashLink smooth to="/#about" onClick={() => setShowMenu(false)} className='w-full text-center border-b border-gray-400 py-3 hover:bg-gray-200'>
                    <p className='text-base xl:text-lg'>About Us</p>
                </HashLink>
                <HashLink smooth to="/#contact" onClick={() => setShowMenu(false)} className='w-full text-center border-b border-gray-400 py-3 hover:bg-gray-200'>
                    <p className='text-base xl:text-lg'>Contact</p>
                </HashLink>
                <p onClick={() => { auth(); setShowMenu(false); }} className='w-full font-medium text-center border-b border-gray-400 py-3 text-[var(--secondary-color)] cursor-pointer hover:bg-gray-200'>
                    Log{user ? 'out' : 'in'}
                </p>
                <p onClick={() => { signup(); setShowMenu(false); }} className='w-full font-medium text-center bg-[#136a82] hover:bg-opacity-80 text-white cursor-pointer px-3 py-3'>
                    Sign up
                </p>
            </div>
        </nav>
        </div>
    )
}


export default Header;