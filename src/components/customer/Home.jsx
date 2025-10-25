import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar'
import '../../style/Home.css'
import Card from './Card'
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { getData, getFacilities, getTests } from '../../services/dashboardService';

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
    // const [toggleView, setToggleView] = useState(section || 'All');
    const [notifications, setNotifcations] = useState(true)  
    const user = useSelector((state) => state.login.data);
    const country = user ? user.data?.country : null;

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
        const data = await getData(page, dataPerPage, searchCheck, country)
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
            <div className='w-11/12 mt-16 mb-4 flex items-center justify-between'>
                <div>
                <h2 className='text-4xl font-semibold'>Our Tests and Facilities</h2>
                <p className='text-base text-gray-500'>Search for a specific test or facility</p>
                </div>
                <div className='w-auto h-auto flex justify-center items-center relative cursor-pointer'>
                    <FaRegBell size={35} color='#0d5d73'/>
                    {notifications && <div className='w-2 h-2 bg-red-500 rounded-full absolute z-20 top-1 right-1'></div>}
                </div>
            </div>
            <div className='w-full lg:w-11/12 h-auto flex flex-col items-center justify-center'>

                <div className=' w-11/12 md:w-10/12 flex items-center rounded-xl mt-10 px-5 py-3 bg-[#ebeff3] border border-[#0d5d73] mb-4 m-w-4xl'>
                    <input className='w-full text-[#0d5d73] bg-[#ebeff3] text-base xl:text-lg p-0 m-0 focus:outline-none placeholder:text-[#0d5d73]' value={searchTerm} type='text' placeholder='Search...' onChange={handleSearch} onKeyDown={handleSearchInputPress}/>
                    <div className='icon'>
                        <IoSearch size={28} color='#0d5d73' onClick={()=>Search(searchTerm,view)}/>
                    </div>
                    <p className="text-sm md:text-base ml-4 text-[#0d5d73] cursor-pointer" onClick={()=>{
                        setSearchTerm('')
                        setSearchCheck(null)
                        setPage(1)
                        fetchFacilities()
                        fetchTests()
                        fetchData()
                        }}>Clear</p>
                    <select className='select text-[#0d5d73] bg-[#ebeff3] text-sm md:text-base' value={view} onChange={(e) => {
                        // setToggleView(e.target.value) 
                        navigate(`/dashboard/${e.target.value}`)
                        setPage(1)
                    }}>
                        <option value='All'>All</option>
                        <option value='Facilities'>Facilities</option>
                        <option value='Tests'>Tests</option>
                    </select>
                </div>


            {loading && displayData.length != 0 && facilityData.length != 0 && testData.length != 0 ? (<><img src='/spinner-200px-200px.svg' alt="Loading..." /></>) :
            (<>
                <div className='w-full px-1 py-3 flex items-center justify-center rounded-lg'>

                {view == 'All' ? (<div className='data-container'>
                    <div className='pagination'>
                        <button className='text-sm md:text-base text-[#0d5d73] bg-[#ebeff3] hover:bg-[#cadeef] rounded-lg px-3 py-1' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className='text-sm md:text-base text-[#0d5d73] bg-[#ebeff3] hover:bg-[#cadeef] rounded-lg px-3 py-1' onClick={() => setPage(page + 1)} disabled={page === totalMaxPage}>Next</button>
                    </div>

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
                        <button className='text-sm md:text-base text-[#0d5d73] bg-[#ebeff3] hover:bg-[#cadeef] rounded-lg px-3 py-1' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className='text-sm md:text-base text-[#0d5d73] bg-[#ebeff3] hover:bg-[#cadeef] rounded-lg px-3 py-1' onClick={() => setPage(page + 1)} disabled={page === facilityMaxPage}>Next</button>
                    </div>

                    <div className='viewable-data'>
                        {facilityData?.map((item,index) => (
                                    <Card key={index} onClick={()=>{navigateInfo(item['id'],'F')}} name={item['name']} address={item['address']} type={item['type']}/>                        
                            ))}
                    </div>
                </div>) : (
                <div className='data-container'>
                    <div className='pagination'>
                        <button className='text-sm md:text-base text-[#0d5d73] bg-[#ebeff3] hover:bg-[#cadeef] rounded-lg px-3 py-1' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className='text-sm md:text-base text-[#0d5d73] bg-[#ebeff3] hover:bg-[#cadeef] rounded-lg px-3 py-1' onClick={() => setPage(page + 1)} disabled={page === testMaxPage}>Next</button>
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

