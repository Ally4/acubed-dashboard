import logo from '../images/colab_green_logo.png'
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import '../style/Sidebar.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/loginSlice';

import profileImage from '../images/profile.png'
import { RiListOrdered2 } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";


const DashHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(state => state.login.data)
    const profilePictureUrl = user ? user.profilePictureUrl : null

    const getActiveItem = () => {
        if (location.pathname.match(/^\/dashboard\/(All|Tests|Facilities)$/) || location.pathname.match(/^\/facility\/\d+$/) || location.pathname.match(/^\/Tests\/\d+$/)) return 'dashboard';
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
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <nav className='w-full bg-white h-14 py-4 px-4 gap-4 flex items-center justify-start sticky top-0 left-0 z-30 border-b border-[var(--light-border-color)] shadow-md'>
                <div onClick={()=>setShowSidebar(!showSidebar)} className='md:hidden flex flex-col gap-1 cursor-pointer m-0'>
                    <GiHamburgerMenu size={20} color="#1c7d7f" />
                </div>
                <Link to="/dashboard/All" className='h-4 lg:h-5 m-0'>
                    <img className='max-h-full w-auto cursor-pointer' src={logo} alt="logo" />
                </Link>
            </nav>

            {/* Sidebar */}
            <aside 
                className={`w-[220px] h-screen flex flex-col items-center justify-between bg-[#148486] fixed top-[56px] left-0 z-50 transition-all duration-300 ease-in-out`} 
                style={{
                    maxWidth: showSidebar ? '220px' : '0', 
                    overflow:'hidden', 
                    maxHeight: 'calc(100vh - 56px)'
                }}
            >
                <div className='sub-menu-container mt-2 md:mt-10'>
                    <ul>
                        <li className={`bars ${activeItem === 'dashboard' ? 'active' : ''}`}>
                            <Link to='/dashboard/All' className='sidebar-link' onClick={() => setShowSidebar(false)}>
                                <MdSpaceDashboard color={'white'} size={28}/>
                                <p className='text-white font-semibold text-lg xl:text-xl'>Dashboard</p>
                            </Link>
                        </li>
                        <li className={`bars ${activeItem === 'orders' ? 'active' : ''}`}>
                            <Link to='/my-orders' className='sidebar-link' onClick={() => setShowSidebar(false)}>
                                <RiListOrdered2 color={'white'} size={28}/>
                                <p className='text-white font-semibold text-lg xl:text-xl'>Orders</p>
                            </Link>
                        </li>
                        <li className={`bars ${activeItem === 'cart' ? 'active' : ''}`}>
                            <Link to='/cart' className='sidebar-link' onClick={() => setShowSidebar(false)}>
                                <FaCartPlus color={'white'} size={26}/>
                                <p className='text-white font-semibold text-lg xl:text-xl'>Cart</p>
                            </Link>
                        </li>
                    </ul>
                </div>
    
                <div className='flex items-center justify-between gap-6 w-full px-6 mb-4'>
                    <Link to="/account" className="h-16 w-16 flex items-center justify-center rounded-full border-2 border-white bg-gray-200">
                        <img className='object-cover max-h-full max-w-full w-full h-full rounded-full' src={profilePictureUrl ? profilePictureUrl : profileImage} alt='Profile'/>
                    </Link>
                    <p className='text-white font-semibold text-lg cursor-pointer' onClick={Signout}>Sign out</p>
                </div>
            </aside>

            {/* Overlay backdrop - only shows when sidebar is open */}
            {showSidebar && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setShowSidebar(false)}
                    style={{ top: '56px' }}
                />
            )}
        </>
    )
}



export default DashHeader;