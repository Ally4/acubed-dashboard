import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'
import '../../style/Home.css'
import Card from './Card'
import { IoSearch } from "react-icons/io5";
import { searchFacility, searchTest, getFacilities, getTests } from '../../services/dashboardService';

const Home = () => {
    const navigate = useNavigate()
    const [testData, setTestData] = useState([]);
    const [facilityData, setFacilityData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(0)
    const [toggleView, setToggleView] = useState('Facilities');
    const [testSplitData, setTestSplitData] = useState([]);
    const [facilitySplitData, setFacilitySplitData] = useState([]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSearchInputPress = async (e) => {
        if(e.key == 'Enter') {
           await Search(searchTerm,toggleView)
        }
    }

    const fetchFacilities = async () => {
        setLoading(true)
        const data = await getFacilities()
        if (data) {
            console.log('facility data: ',data)
            setFacilityData(data);
        }
        setLoading(false);
    }

    const fetchTests = async () => {
        setLoading(true)
        const data = await getTests()
        if (data) {
            setTestData(data);
        }
        setLoading(false);
    }

    const Search = async (term,toggle) => {
        if(toggle == 'Facilities') {
            const results = await searchFacility(term)
            if (results != null) {
                console.log(`Faciliy search results for ${term}: `, results.data)
                setFacilityData(results.data)
            } else {
                setFacilityData([])
            }
        } else {
            const results = await searchTest(term)
            if (results != null) {
                console.log(`Test search results for ${term}: `, results.data)
                setTestData(results.data)
            } else {
                setTestData([])
            }
        }
    }

    useEffect(() => {
        fetchFacilities();
        fetchTests();
    }, [])

    const SplitData = (data) => {
        const pages = Math.ceil(data.length / 16)
        // console.log(`pages: ${pages}`)
        const split = []
        for (let i=0;i<pages;i++){
            let c = data.slice(i*16,(i+1)*16)
            split[i] = c
        }
        return split
    }

    useEffect(() => {
        setTestSplitData(SplitData(testData))
        setFacilitySplitData(SplitData(facilityData))
    }, [testData, facilityData])

    const navigateInfo = (id) => {
        if (toggleView == 'Facilities') {
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

                <div className='w-10/12 flex items-center rounded-2xl mt-10 px-5 py-2 bg-white border border-[#ccc] mb-4 m-w-4xl'>
                    <input className='w-full text-gray-400 text-sm md:text-base p-0 m-0 focus:outline-none' value={searchTerm} type='text' placeholder='Search...' onChange={handleSearch} onKeyDown={handleSearchInputPress}/>
                    <div className='icon'>
                        <IoSearch size={28} color='gray' onClick={()=>Search(searchTerm,toggleView)}/>
                    </div>
                    <p className="text-sm md:text-base ml-4 text-gray-400 cursor-pointer" onClick={()=>{
                        setSearchTerm('')
                        fetchFacilities()
                        fetchTests()
                        }}>Clear</p>
                    <select className='select text-gray-400 text-sm md:text-base' value={toggleView} onChange={(e) => setToggleView(e.target.value)}>
                        <option value='Facilities'>Facilities</option>
                        <option value='Tests'>Tests</option>
                    </select>
                </div>


            {loading && facilitySplitData.length != 0 && testSplitData.length != 0 ? (<><img src='/spinner-200px-200px.svg' alt="Loading..." /></>) :
            (<>
                <div className='w-full bg-white px-3 py-3 flex items-center justify-center border border-[#ccc] rounded-lg shadow-md'>

                {toggleView == 'Facilities' ? (
                <div className='data-container'>
                    <div className='pagination'>
                        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
                        <button onClick={() => setPage(page + 1)} disabled={page === facilitySplitData.length - 1}>Next</button>
                    </div>

                    <div className='viewable-data'>
                        {facilitySplitData[page]?.map((item,index) => (
                                    <Card key={index} onClick={()=>{navigateInfo(item['id'])}} name={item['name']} address={item['address']}/>                        
                            ))}
                    </div>
                </div>)
            :
            
            (
                <div className='data-container'>
                    <div className='pagination'>
                        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
                        <button onClick={() => setPage(page + 1)} disabled={page === testSplitData.length - 1}>Next</button>
                    </div>
                    
                    <div className='viewable-data'>
                        {testSplitData[page]?.map((item,index) => (               
                                    <Card key={index} onClick={()=>{navigateInfo(item['id'])}} name={item['name']} address={item['price']}/>                        
                                ))}
                    </div>
                </div>
            )} 
            </div>
            </>)
            
            }
            </div>

        </section>
    )
}

const HomeExport = () => (
    <div style={{width: '100%', height: '100%',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Sidebar />
        <Home />
    </div>
)
export default HomeExport

