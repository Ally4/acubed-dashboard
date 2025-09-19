import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'
import '../../style/Home.css'
import Card from './Card'
import { IoSearch } from "react-icons/io5";
import { searchFacility, searchTest, getData, getFacilities, getTests } from '../../services/dashboardService';

const Home = () => {
    const navigate = useNavigate()
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
    const [toggleView, setToggleView] = useState('All');   

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
        const data = await getFacilities(page, dataPerPage, searchCheck)
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
        const data = await getTests(page, dataPerPage, searchCheck)
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
        const data = await getData(page, dataPerPage, searchCheck)
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
        fetchFacilities();
        fetchTests();
        fetchData();
    }, [])

    useEffect(() => {
        fetchFacilities();
        fetchTests();
        fetchData();
    }, [page,searchCheck])

    const navigateInfo = (id,type) => {
        if (type == 'F') {
            console.log(`nav facility id=${id}`)
            navigate('/facility', {
                state: {
                    id: id
                }
            })
        } else {
            console.log(`nav test id=${id}`)
            navigate('/tests', {
                state: {
                    id: id
                }
            })
        }
        
    }
    return(
        <section id='dashboard'>
            <div className='w-11/12 mt-16 mb-4'>
                <h2 className='text-4xl font-semibold'>Find test or facility</h2>
                <p className='text-base text-gray-500'>Enter the name of a test or facility</p>
            </div>
            <div className='w-11/12 h-auto flex flex-col items-center justify-center'>

                <div className=' w-11/12 md:w-10/12 flex items-center rounded-2xl mt-10 px-5 py-2 bg-white border border-[#ccc] mb-4 m-w-4xl'>
                    <input className='w-full text-gray-400 text-sm md:text-base p-0 m-0 focus:outline-none' value={searchTerm} type='text' placeholder='Search...' onChange={handleSearch} onKeyDown={handleSearchInputPress}/>
                    <div className='icon'>
                        <IoSearch size={28} color='gray' onClick={()=>Search(searchTerm,toggleView)}/>
                    </div>
                    <p className="text-sm md:text-base ml-4 text-gray-400 cursor-pointer" onClick={()=>{
                        setSearchTerm('')
                        setSearchCheck(null)
                        setPage(1)
                        fetchFacilities()
                        fetchTests()
                        fetchData()
                        }}>Clear</p>
                    <select className='select text-gray-400 text-sm md:text-base' value={toggleView} onChange={(e) => {setToggleView(e.target.value) 
                        setPage(1)}}>
                        <option value='All'>All</option>
                        <option value='Facilities'>Facilities</option>
                        <option value='Tests'>Tests</option>
                    </select>
                </div>


            {loading && displayData.length != 0 && facilityData.length != 0 && testData.length != 0 ? (<><img src='/spinner-200px-200px.svg' alt="Loading..." /></>) :
            (<>
                <div className='w-full bg-white px-3 py-3 flex items-center justify-center border border-[#ccc] rounded-lg shadow-md'>

                {toggleView == 'All' ? (<div className='data-container'>
                    <div className='pagination'>
                        <button className='text-sm md:text-base bg-[#00c2cb] rounded-lg px-3 py-1' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className='text-sm md:text-base bg-[#00c2cb] rounded-lg px-3 py-1' onClick={() => setPage(page + 1)} disabled={page === totalMaxPage}>Next</button>
                    </div>

                    <div className='viewable-data'>
                        {displayData?.map((item,index) => {
                                if (item['type'] == 'facility') {
                                   return <Card key={index} onClick={()=>{navigateInfo(item['id'],'F')}} name={item['name']} address={item['address']}/>                        
                                } else {
                                   return <Card key={index} onClick={()=>{navigateInfo(item['id'],'T')}} name={item['name']} address={item['price']}/>;
                                }
                            })}
                    </div>


                </div>) : <>{toggleView == 'Facilities' ? (
                <div className='data-container'>
                    <div className='pagination'>
                        <button className='text-sm md:text-base bg-[#00c2cb] rounded-lg px-3 py-1' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className='text-sm md:text-base bg-[#00c2cb] rounded-lg px-3 py-1' onClick={() => setPage(page + 1)} disabled={page === facilityMaxPage}>Next</button>
                    </div>

                    <div className='viewable-data'>
                        {facilityData?.map((item,index) => (
                                    <Card key={index} onClick={()=>{navigateInfo(item['id'],'F')}} name={item['name']} address={item['address']}/>                        
                            ))}
                    </div>
                </div>) : (
                <div className='data-container'>
                    <div className='pagination'>
                        <button className='text-sm md:text-base bg-[#00c2cb] rounded-lg px-3 py-1' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className='text-sm md:text-base bg-[#00c2cb] rounded-lg px-3 py-1' onClick={() => setPage(page + 1)} disabled={page === testMaxPage}>Next</button>
                    </div>
                    
                    <div className='viewable-data'>
                        {testData?.map((item,index) => (               
                                    <Card key={index} onClick={()=>{navigateInfo(item['id'],'T')}} name={item['name']} address={item['price']}/>                        
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
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
        <Sidebar />
        <Home />
    </div>
)
export default HomeExport

