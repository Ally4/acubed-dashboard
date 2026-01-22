import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Sidebar from './Sidebar'
import '../../style/Home.css'
import Card from './Card'
// import Chat from './chat/Chat';
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
// import { MdOutlineChatBubbleOutline } from "react-icons/md";

import { getFacilities, getTests, testSearch, facilitySearch, getNotifications } from '../../services/dashboardService';
import { iconAssigner } from '../../utils/imageUtils';
import NotificationBar from './NotificationBar';

const Home = () => {
    const navigate = useNavigate()
    const { view } = useParams()
    const [testData, setTestData] = useState([]);
    const [facilityData, setFacilityData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCheck, setSearchCheck] = useState(null);
    const [loading,setLoading] = useState(false)
    const [displayLoading, setDisplayLoading] = useState(false)

    const [page,setPage] = useState(1)
    const [displayMaxPage,setDisplayMaxPage] = useState(8)
    const [facilityMaxPage,setFacilityMaxPage] = useState(12)
    const [testMaxPage,setTestMaxPage] = useState(12)
    const [showNotifications, setShowNotifications] = useState(false);
    const [openChat, setOpenChat] = useState(false)
    const [quickTests, setQuickTests] = useState([])
    const [recentTests, setRecentTests] = useState([]);
    // const [toggleView, setToggleView] = useState(section || 'All');
    const [notifications, setNotifications] = useState(false)  
    const user = useSelector((state) => state.login.data);
    // console.log('user: ',user)
    const countryId = user ? user.countryId : null;
    const userId = user ? user.id : null;
    const name = user ? user.name : ''
    const token = user ? user.token : null
    const facilityPageLimit = 12
    const testPageLimit = 12
    const displayPageLimit = 8

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSearchInputPress = async (e) => {
        if(e.key == 'Enter') {
           await Search(searchTerm,view)
            //   setSearchCheck(searchTerm)
        }
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

    const fetchData = async (token) => {
    setLoading(true);
        
        try {
            // Run all three requests in parallel
            const [facilitiesData, testsData, displayedData] = await Promise.all([
                getFacilities(page, facilityPageLimit, searchCheck, countryId, token),
                getTests(page, testPageLimit, searchCheck, countryId, token),
                getFacilities(page, displayPageLimit, searchCheck, countryId, token)
                // getRecentTests(token,countryId)
            ]);
            
            // All requests are complete - now update state
            if (facilitiesData) {
                console.log('facility data:', facilitiesData.data);
                setFacilityData(facilitiesData.data);
                setFacilityMaxPage(facilitiesData.max);
            }
            
            if (testsData) {
                console.log('test data:', testsData.data);
                setTestData(testsData.data);
                setTestMaxPage(testsData.max);
                if (quickTests.length == 0 && page == 1) {
                    setQuickTests(testsData.data.slice(0,7))
                } 
            }
            
            // For "All" view display data
            if (displayedData) {
                setDisplayData(displayedData.data);
                setDisplayMaxPage(displayedData.max);
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error appropriately
        } finally {
            setLoading(false); // Always runs, even if there's an error
        }
    };

    const Search = async (term,toggle) => {
        
        try {
            if(toggle == 'Facilities') {
                setLoading(true)
                const results = await facilitySearch(countryId,term,token)
                if (results != null) {
                    console.log(`Faciliy search results for ${term}: `, results.data)
                    setFacilityData(results.data)
                } else {
                    setFacilityData([])
                }
            } else if (toggle == 'Tests') {
                setLoading(true)
                const results = await testSearch(countryId,term,null,token)
                if (results != null) {
                    console.log(`Test search results for ${term}: `, results.data)
                    setTestData(results.data)
                } else {
                    setTestData([])
                }
            } else {
                setDisplayLoading(true)
                const results = await facilitySearch(countryId,term,token)
                if (results != null) {
                    console.log(`All (facility) search results for ${term}: `, results.data)
                    setDisplayData(results.data)
                } else {
                    setDisplayData([])
                }
            }
        } catch (err) {
            console.error('Error in Home search: ',err)
        } finally {
            setLoading(false)
            setDisplayLoading(false)
        }
        
        // setSearchCheck(term)
    }

    useEffect(() => {
        if(!token || !countryId) return
        fetchData(token);
    }, [page,countryId,token])

    const navigateInfo = (id,type) => {
        if (type == 'F') {
            console.log(`nav facility id=${id}`)
            navigate(`/facility/${id}`)
        } else {
            console.log(`nav test id=${id}`)
            navigate(`/tests/${id}`)
        }
        
    }

    console.log('view: ',view)
    return(
        <section id='dashboard'>
            <div className='w-11/12 md:w-10/12 mt-8 mb-4 flex items-center justify-between'>
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
            {/* {openChat && <Chat className='fixed right-10 bottom-10 z-40' onClose={()=>setOpenChat(false)}/>} */}
            
            

            <div className='w-full lg:w-11/12 h-auto flex flex-col items-center justify-center'>

                <div className=' w-11/12 flex items-center rounded-xl mt-10 px-5 py-3 bg-[#ebeff3] border border-[#1c7d7f] mb-4 m-w-4xl'>
                    <input className='w-full text-[#1c7d7f] bg-[#ebeff3] text-base xl:text-lg p-0 m-0 focus:outline-none placeholder:text-[#1c7d7f]' value={searchTerm} type='text' placeholder='Search...' onChange={handleSearch} onKeyDown={handleSearchInputPress}/>
                    <div className='icon'>
                        <IoSearch size={28} color='#1c7d7f' onClick={()=>Search(searchTerm,view)}/>
                    </div>
                    <p className="text-sm md:text-base ml-4 text-[#1c7d7f] cursor-pointer" onClick={()=>{
                        setSearchTerm('')
                        setSearchCheck(null)
                        setPage(1)
                        fetchData(token)
                        }}>Clear</p>
                    <select className='select text-[#1c7d7f] bg-[#ebeff3] text-sm md:text-base' value={view} onChange={(e) => {
                        // setToggleView(e.target.value) 
                        navigate(`/dashboard/${e.target.value}`)
                        fetchData(token)
                        setPage(1)
                    }}>
                        <option value='All'>All</option>
                        <option value='Facilities'>Facilities</option>
                        <option value='Tests'>Tests</option>
                    </select>
                </div>

            

            
            {loading ? (<><img src='/secondary_color_spinner.svg' className='w-28 h-28 self-center' alt="Loading..." /></>) :
            (<>
                <div className='w-full px-1 py-3 flex items-center h-auto justify-center rounded-lg'>

                {view == 'All' ? (<div className='data-container'>
                    {/* <div className='w-11/12 mb-2'><h3 className='ml-2 text-[#1c7d7f] font-medium text-xl lg:text-2xl xl:text-3xl mb-0'>Quick Lab Tests</h3></div> */}
                    <div className="w-11/12 rounded-lg bg-[#1c7d7f] bg-opacity-15 pt-8 min-h-80 h-auto flex items-center justify-center mb-6 relative">
                        <h3 className='absolute top-2 left-3 ml-2 text-[#1c7d7f] font-medium text-lg lg:text-xl xl:text-2xl mb-0'>Quick Lab Tests</h3>
                        {quickTests.length > 0 ? (<div className='w-full px-2 py-5 rounded-lg min-h-80 h-auto shadow-md grid xl:grid-cols-4 grid-cols-2 gap-6 xl:gap-4 overflow-y-auto'>
                            {quickTests.map((item,index) => {
                                return(
                                    <div key={index} className='flex flex-col gap-1 items-center justify-center cursor-pointer w-full' onClick={()=>navigate(`/facilities/test/${item.name}`)}>
                                        {iconAssigner(item.sampleType,80,"test")}
                                        <p className='font-semibold text-[#1c7d7f] text-lg text-center xl:text-xl'>{item.name}</p>
                                    </div>
                                )
                            })}
                            <div className='flex items-center justify-center cursor-pointer w-full' onClick={()=>{navigate('/dashboard/Tests')}}>
                                <p className='font-semibold text-[#1c7d7f] text-xl lg:text-2xl xl:text-3xl'>More</p>
                            </div>

                        </div>) : <h3 className="text-base md:text-lg xl:text-xl 2xl:text-2xl font-semibold text-[var(--secondary-color)]">Could not load quick lab tests</h3>}
                    </div>
                    <div className='pagination'>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page + 1)} disabled={page === displayMaxPage}>Next</button>
                    </div>
                    
                    <div className='w-11/12'><h3 className='ml-2 text-[#1c7d7f] font-medium text-xl lg:text-2xl xl:text-3xl mb-0'>Our Facilities</h3></div>
                    {displayLoading ? (<img src='/secondary_color_spinner.svg' className='w-28 h-28 self-center' alt="Loading..." />) : (
                    <div className='w-11/12 flex items-center justify-center'>
                        <div className='viewable-data'>
                            {displayData?.map((item,index) => {
                                console.log('item: ', item)
                                    return <Card key={index} onClick={()=>{navigateInfo(item.id,'F')}} name={item.name} address={item.address} type={"facility"}/>                        
                                })}
                        </div>
                    
                    </div>)}
                    


                </div>) : <>{view == 'Facilities' ? (
                <div className='data-container'>
                    <div className='pagination'>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page + 1)} disabled={page === facilityMaxPage}>Next</button>
                    </div>
                    <div className='w-11/12 flex items-center justify-center'>
                        <div className='viewable-data'>
                            {facilityData?.map((item,index) => (
                                        <Card key={index} onClick={()=>{navigateInfo(item.id,'F')}} name={item.name} address={item.address} type={"facility"}/>                        
                                ))}
                        </div>
                    </div>

                </div>) : (
                <div className='data-container'>
                    <div className='pagination'>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page + 1)} disabled={page === testMaxPage}>Next</button>
                    </div>
                    <div className='w-11/12 flex items-center justify-center'>
                        <div className='viewable-data'>
                            {testData?.map((item,index) => (               
                                        <Card key={index} onClick={()=>{navigateInfo(item.id,'T')}} name={item.name} facility={item.facility?.name} address={item.price} type={"test"} profile={item.sampleType}/>                        
                                    ))}
                        </div>
                    </div>
                </div>
                )}</>
             }
            </div>
            </>)
            
            }
            
            </div>
            {/* <div onClick={()=>setOpenChat(true)} className='right-4 bottom-4 absolute bg-gradient-to-r from-[#1a7071] to-[#26c5c7] rounded-full p-4 shadow-md flex items-center justify-center cursor-pointer'>
                <MdOutlineChatBubbleOutline className='text-white font-semibold w-8 h-8'/>
            </div> */}
        </section>
    )
}

export default Home

