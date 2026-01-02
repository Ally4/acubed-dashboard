import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar'
// import styles from '../../style/Profile.module.css'
// import EditProfile from './EditProfile';
// import profile from '../../images/profile.png'
// import { useForm } from 'react-hook-form';
// import { getUser, deleteChronicCondition, addNewChronicCondition, updateNotificationSettings } from '../../services/userService';
// import { getCountry } from '../../utils/userUtils';

//icons
// import { FiCamera } from "react-icons/fi";
// import { CgProfile } from "react-icons/cg";
// import { MdMarkEmailRead, MdOutlineCake } from "react-icons/md";
// import { MdOutlinePersonOutline } from "react-icons/md";
// import { MdOutlinePhoneEnabled } from "react-icons/md";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { AiOutlineHome } from "react-icons/ai";
// import { MdOutlineHomeWork } from "react-icons/md";
// import { PiCity, PiPhoneCallBold } from "react-icons/pi";
// import { MdOutlineWorkOutline } from "react-icons/md";
// import { IoGlobeOutline } from "react-icons/io5";
// import { MdOutlineSick } from "react-icons/md";
// import UploadProfileModal from './UploadProfileModal';
import UserProfile from './UserProfile'
import UserSettings from './UserSettings'


const Account = () => {
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState('Profile')
    
    const user = useSelector((state) => state.login.data);
    const userId = user ? user.id : null
    const token = user ? user.token : null
    const countryId = user ? user.countryId : null


    return(
        <section id='profile' className="w-full h-full min-h-screen flex flex-col overflow-y-auto items-center justify-start relative" style={{ background: "linear-gradient(to bottom, white 35%, #cddfef 85%)" }}>
            <div className='w-11/12 md:w-8/12 mb-8 mt-10'>
                    <h2 className='text-4xl font-semibold'>Account</h2>
                    <p className='text-base text-gray-500'>Manage your account preferences, security, and notification settings</p>
                </div>

                <div className='w-11/12 md:w-2/3 xl:w-3/5 mt-4 mb-10 grid grid-cols-2 gap-2 md:gap-6 xl:gap-12 h-16 md:h-17 xl:h-18 border-2 bg-white border-[var(--light-border-color)] rounded-full p-1'>
                    <div className={`rounded-full flex items-center justify-center w-full cursor-pointer h-full ${selected === 'Profile' ? 'bg-[var(--secondary-color)] hover:bg-[#228d8f]' : ''}`} onClick={() => setSelected('Profile')}>
                        <label className={`mt-2 cursor-pointer text-lg md:text-xl xl:text-2xl font-semibold ${selected === 'Profile' ? 'text-white' : 'text-[var(--secondary-color)]'}`}>Profile</label>
                    </div>

                    <div className={`rounded-full flex items-center justify-center w-full cursor-pointer h-full ${selected === 'Settings' ? 'bg-[var(--secondary-color)] hover:bg-[#228d8f]' : ''}`} onClick={() => setSelected('Settings')}>
                        <label className={`mt-2 cursor-pointer text-lg md:text-xl xl:text-2xl font-semibold ${selected === 'Settings' ? 'text-white' : 'text-[var(--secondary-color)]'}`}>Settings</label>
                    </div>
                </div>
            
            {selected == 'Profile' ? (<UserProfile />) : (<UserSettings />)}

        </section>
    )
}


const AccountExport = () => (
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
        <Sidebar />
        <Account />
    </div>
)
export default AccountExport