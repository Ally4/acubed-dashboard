import {useState} from 'react'
import { useSelector } from 'react-redux';
// import Sidebar from '../Sidebar'

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
            <div className='w-11/12 md:w-8/12 my-4'>
                    <h2 className='text-2xl lg:text-4xl font-semibold'>Account</h2>
                    <p className='text-sm lg:text-base text-gray-500'>Manage your account preferences, security, and notification settings</p>
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

export default Account