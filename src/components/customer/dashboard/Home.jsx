import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import '../../../style/Home.css'
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { allSearch, getNotifications } from '../../../services/dashboardService';
import { iconAssigner } from '../../../utils/imageUtils';
import NotificationBar from '../NotificationBar';
//New
import DashboardTests from './DashboardTests'
import DashboardFacilities from './DashboardFacilities'
import DashboardAll from './DashboardAll'

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCheck, setSearchCheck] = useState(null);
    const [loading,setLoading] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false);

    const [toggleView, setToggleView] = useState('All');
    const [notifications, setNotifications] = useState(false)  
    const [testSearchTerm, setTestSearchTerm] = useState(null)
    const [facilitySearchTerm, setFacilitySearchTerm] = useState(null)
    const [allSearchTerm, setAllSearchTerm] = useState(null)
    const user = useSelector((state) => state.login.data);
    // console.log('user: ',user)
    const countryId = user ? user.countryId : null;
    const userId = user ? user.id : null;
    const name = user ? user.name : ''
    const token = user ? user.token : null


    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const fetchNotifications = async () => {
        const result = await getNotifications(token)
        console.log('notifications: ',result)
        if (result.length > 0) {
            setNotifications(true)
        }
    }

    useEffect(() => {
        if (!token) return
        fetchNotifications()
    },[token])

    const moreTests = () => {
        setToggleView('Tests')
    }

    const moreFacilities = () => {
        setToggleView('Facilities')
    }

    const clear = () => {
        setSearchTerm('')
        setSearchCheck(null)
        setAllSearchTerm(null)
        setTestSearchTerm(null)
        setFacilitySearchTerm(null)
    }


    return(
        <section id='dashboard'>
            <div className='w-11/12 md:w-10/12 my-4 flex items-center justify-between'>
                <div>
                <h3 className='font-semibold text-[#1c7d7f] text-lg lg:text-xl xl:text-2xl mb-0'>Hello {name}</h3>
                <h2 className='text-2xl lg:text-4xl font-semibold mt-1'>Our Tests and Facilities</h2>
                <p className='text-sm xl:text-base text-gray-500'>Search for a specific test or facility</p>
                </div>
                <div onClick={()=>setShowNotifications(!showNotifications)} className='w-auto h-auto flex justify-center items-center relative cursor-pointer'>
                    <FaRegBell size={35} color='#1c7d7f'/>
                    {notifications && <div className='w-2 h-2 bg-red-500 rounded-full absolute z-10 top-1 right-1'></div>}
                </div>
            </div>
            {showNotifications && <NotificationBar onClose={() => setShowNotifications(false)} />}
            
            

            <div className='w-full lg:w-11/12 h-auto flex flex-col items-center justify-center'>

                <div className=' w-11/12 flex items-center rounded-xl mt-10 px-5 py-3 bg-[#ebeff3] border border-[#1c7d7f] mb-4 m-w-4xl'>
                    <input className='w-full text-[#1c7d7f] bg-[#ebeff3] text-base xl:text-lg p-0 m-0 focus:outline-none placeholder:text-[#1c7d7f]' value={searchTerm} type='text' placeholder='Search...' onChange={handleSearch} onKeyDown={(e)=>{
                        if (e.key != 'Enter' || searchTerm === '') return
                        console.log('User searches for: ', searchTerm)
                        if (toggleView == 'All') {
                            setAllSearchTerm(searchTerm)
                        } else if (toggleView == 'Facilities') {
                            setFacilitySearchTerm(searchTerm)
                        } else {
                            setTestSearchTerm(searchTerm)
                        }
                    }}/>
                    <div className='icon' onClick={()=>{
                            if (searchTerm === '') return
                            if (toggleView == 'All') {
                                setAllSearchTerm(searchTerm)
                            } else if (toggleView == 'Facilities') {
                                setFacilitySearchTerm(searchTerm)
                            } else {
                                setTestSearchTerm(searchTerm)
                            }
                        }}>
                        <IoSearch size={28} color='#1c7d7f'/>
                    </div>
                    <p className="text-sm md:text-base ml-4 text-[#1c7d7f] cursor-pointer" onClick={()=>clear()}>Clear</p>
                    <select className='select text-[#1c7d7f] bg-[#ebeff3] text-sm md:text-base' value={toggleView} onChange={(e) => {
                        setToggleView(e.target.value) 

                    }}>
                        <option value='All'>All</option>
                        <option value='Facilities'>Facilities</option>
                        <option value='Tests'>Tests</option>
                    </select>
                </div>

            

            
            {loading ? (<><img src='/secondary_color_spinner.svg' className='w-28 h-28 self-center' alt="Loading..." /></>) :
                <div className='w-full px-1 py-3 flex items-center h-auto justify-center rounded-lg'>

                    {toggleView == 'All' ? (
                        <DashboardAll token={token} countryId={countryId} moreTests={moreTests} moreFacilities={moreFacilities} searchTerm={allSearchTerm} closeModal={()=>clear()} />
                    ) : toggleView == 'Facilities' ? (
                        <DashboardFacilities token={token} countryId={countryId} searchTerm={facilitySearchTerm} />
                    ) : (
                        <DashboardTests token={token} countryId={countryId} searchTerm={testSearchTerm}/>
                    )}
                </div>
             }
            
            </div>
        </section>
    )
}

export default Home

