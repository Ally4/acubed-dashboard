import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar'
import '../../style/Home.css'
import Card from './Card'
import Chat from './Chat';
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineChatBubbleOutline } from "react-icons/md";

import { getData, getFacilities, getTests, getRecentTests } from '../../services/dashboardService';
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
    const [page,setPage] = useState(1)
    const [totalMaxPage,setTotalMaxPage] = useState(20)
    const [facilityMaxPage,setFacilityMaxPage] = useState(20)
    const [testMaxPage,setTestMaxPage] = useState(20)
    const [dataPerPage,setDataPerPage] = useState(16)
    const [showNotifications, setShowNotifications] = useState(false);
    const [openChat, setOpenChat] = useState(false)

    const [recentTests, setRecentTests] = useState([]);
    // const [toggleView, setToggleView] = useState(section || 'All');
    const [notifications, setNotifcations] = useState(true)  
    const user = useSelector((state) => state.login.data);
    const country = user ? user.data?.country : null;
    const userId = user ? user.data?.id : null;
    const name = user ? user.data?.name : ''

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSearchInputPress = async (e) => {
        if(e.key == 'Enter') {
        //    await Search(searchTerm,toggleView)
              setSearchCheck(searchTerm)
        }
    }

    const fetchFacilities = async () => {
        setLoading(true)
        const data = await getFacilities(page, dataPerPage, searchCheck, country)
        if (data) {
            console.log(`facility data, page: ${page}: `, data.data)
            setFacilityData(data.data);
            setFacilityMaxPage(data.max)
            console.log('facility max page: ', data.max)
        }
        setLoading(false);
    }

    const fetchTests = async () => {
        setLoading(true)
        const data = await getTests(page, dataPerPage, searchCheck, country)
        if (data) {
            console.log(`test data, page: ${page}: `, data.data)
            setTestData(data.data);
            setTestMaxPage(data.max)
            console.log('test max page: ', data.max)
        }
        setLoading(false);
    }

    const fetchData = async () => {
        setLoading(true)
        const data = await getFacilities(page, dataPerPage, searchCheck, country)
        const recent = await getRecentTests(userId, country)
        if (recent) {
            console.log('recent tests data: ', recent)
            setRecentTests(recent)
        }
        if (data) {
            console.log(`all data, page : ${page}, data: `, data.data)
            setDisplayData(data.data);
            setTotalMaxPage(data.max)
            console.log('total max page: ', data.max)
        }
        setLoading(false);
    }

    const Search = async (term,toggle) => {
        // if(toggle == 'Facilities') {
        //     const results = await searchFacility(term)
        //     if (results != null) {
        //         console.log(`Faciliy search results for ${term}: `, results.data)
        //         setFacilityData(results.data)
        //     } else {
        //         setFacilityData([])
        //     }
        // } else if (toggle == 'Tests') {
        //     const results = await searchTest(term)
        //     if (results != null) {
        //         console.log(`Test search results for ${term}: `, results.data)
        //         setTestData(results.data)
        //     } else {
        //         setTestData([])
        //     }
        // }
        setSearchCheck(term)
    }

    useEffect(() => {
        if(!country) return
        fetchFacilities();
        fetchTests();
        fetchData();
    }, [])

    useEffect(() => {
        if(!country) return
        fetchFacilities();
        fetchTests();
        fetchData();
    }, [page,searchCheck,country])

    const navigateInfo = (id,type) => {
        if (type == 'F') {
            console.log(`nav facility id=${id}`)
            navigate(`/facility/${id}`)
        } else {
            console.log(`nav test id=${id}`)
            navigate(`/tests/${id}`)
        }
        
    }
    return(
        <section id='dashboard'>
            <div className='w-11/12 mt-8 mb-4 flex items-center justify-between'>
                <div>
                <h3 className='font-semibold text-[#1c7d7f] text-lg lg:text-xl xl:text-2xl mb-0'>Hello {name}</h3>
                <h2 className='text-4xl font-semibold mt-1'>Our Tests and Facilities</h2>
                <p className='text-base text-gray-500'>Search for a specific test or facility</p>
                </div>
                <div onClick={()=>setShowNotifications(!showNotifications)} className='w-auto h-auto flex justify-center items-center relative cursor-pointer'>
                    <FaRegBell size={35} color='#1c7d7f'/>
                    {notifications && <div className='w-2 h-2 bg-red-500 rounded-full absolute z-10 top-1 right-1'></div>}
                </div>
            </div>
            {showNotifications && <NotificationBar onClose={() => setShowNotifications(false)} />}
            {openChat && <Chat onClose={()=>setOpenChat(false)}/>}
            <div onClick={()=>setOpenChat(true)} className='right-4 bottom-0 absolute bg-gradient-to-r from-[#1a7071] to-[#26c5c7] rounded-full p-4 shadow-md flex items-center justify-center cursor-pointer'>
                <MdOutlineChatBubbleOutline className='text-white font-semibold w-8 h-8'/>
            </div>
            

            <div className='w-full lg:w-11/12 h-auto flex flex-col items-center justify-center'>

                <div className=' w-11/12 md:w-10/12 flex items-center rounded-xl mt-10 px-5 py-3 bg-[#ebeff3] border border-[#1c7d7f] mb-4 m-w-4xl'>
                    <input className='w-full text-[#1c7d7f] bg-[#ebeff3] text-base xl:text-lg p-0 m-0 focus:outline-none placeholder:text-[#1c7d7f]' value={searchTerm} type='text' placeholder='Search...' onChange={handleSearch} onKeyDown={handleSearchInputPress}/>
                    <div className='icon'>
                        <IoSearch size={28} color='#1c7d7f' onClick={()=>Search(searchTerm,view)}/>
                    </div>
                    <p className="text-sm md:text-base ml-4 text-[#1c7d7f] cursor-pointer" onClick={()=>{
                        setSearchTerm('')
                        setSearchCheck(null)
                        setPage(1)
                        fetchFacilities()
                        fetchTests()
                        fetchData()
                        }}>Clear</p>
                    <select className='select text-[#1c7d7f] bg-[#ebeff3] text-sm md:text-base' value={view} onChange={(e) => {
                        // setToggleView(e.target.value) 
                        navigate(`/dashboard/${e.target.value}`)
                        setPage(1)
                    }}>
                        <option value='All'>All</option>
                        <option value='Facilities'>Facilities</option>
                        <option value='Tests'>Tests</option>
                    </select>
                </div>

            

            <div className='w-11/12 mb-0'><h3 className='ml-2 text-[#1c7d7f] font-medium text-xl lg:text-2xl xl:text-3xl'>Quick Lab Tests</h3></div>
            {loading && displayData.length != 0 && facilityData.length != 0 && testData.length != 0 ? (<><img src='/spinner-200px-200px.svg' alt="Loading..." /></>) :
            (<>
                <div className='w-full px-1 py-3 flex items-center justify-center rounded-lg'>

                {view == 'All' ? (<div className='data-container'>
                    <div className='w-11/12 px-2 py-5 rounded-lg bg-[#1c7d7f] bg-opacity-15 min-h-80 h-auto shadow-md grid xl:grid-cols-4 grid-cols-2 gap-6 xl:gap-4 overflow-y-auto mb-6'>
                        {recentTests.length != 0 && recentTests.map((item,index) => {
                            return(
                                <div className='flex flex-col gap-1 items-center justify-center cursor-pointer w-full' onClick={()=>navigate(`/Tests/${item.id}`)}>
                                    {iconAssigner(item.profilepicture,80,item.type)}
                                    <p className='font-semibold text-[#1c7d7f] text-lg text-center xl:text-xl'>{item.name}</p>
                                </div>
                            )
                        })}
                        <div className='flex items-center justify-center cursor-pointer w-full' onClick={()=>{navigate('/dashboard/Test')}}>
                            <p className='font-semibold text-[#1c7d7f] text-xl lg:text-2xl xl:text-3xl'>More</p>
                        </div>

                    </div>
                    <div className='pagination'>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page + 1)} disabled={page === totalMaxPage}>Next</button>
                    </div>
                    
                    <div className='w-11/12'><h3 className='ml-2 text-[#1c7d7f] font-medium text-xl lg:text-2xl xl:text-3xl'>Our Facilities</h3></div>
                    <div className='viewable-data'>
                        {displayData?.map((item,index) => {
                            console.log('item: ', item)
                                if (item['type'] == 'facility') {
                                   return <Card key={index} onClick={()=>{navigateInfo(item['id'],'F')}} name={item['name']} address={item['address']} type={item['type']}/>                        
                                } else {
                                   return <Card key={index} onClick={()=>{navigateInfo(item['id'],'T')}} name={item['name']} address={item['price']} type={item['type']} profile={item.profilepicture}/>;
                                }
                            })}
                    </div>


                </div>) : <>{view == 'Facilities' ? (
                <div className='data-container'>
                    <div className='pagination'>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page + 1)} disabled={page === facilityMaxPage}>Next</button>
                    </div>

                    <div className='viewable-data'>
                        {facilityData?.map((item,index) => (
                                    <Card key={index} onClick={()=>{navigateInfo(item['id'],'F')}} name={item['name']} address={item['address']} type={item['type']}/>                        
                            ))}
                    </div>
                </div>) : (
                <div className='data-container'>
                    <div className='pagination'>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page + 1)} disabled={page === testMaxPage}>Next</button>
                    </div>
                    
                    <div className='viewable-data'>
                        {testData?.map((item,index) => (               
                                    <Card key={index} onClick={()=>{navigateInfo(item['id'],'T')}} name={item['name']} address={item['price']} type={item['type']} profile={item.profilepicture}/>                        
                                ))}
                    </div>
                </div>
            )}</>
             }
            </div>
            </>)
            
            }
            </div>

        </section>
    )
}

const HomeExport = () => (
    <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
        <Sidebar />
        <Home />
    </div>
)
export default HomeExport

