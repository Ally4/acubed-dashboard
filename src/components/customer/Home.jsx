import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header'
import Sidebar from './Sidebar'
import '../../style/Home.css'
import Card from './Card'
import { IoSearch } from "react-icons/io5";

const Home = () => {
    const navigate = useNavigate()
    const [testData, setTestData] = useState([]);
    const [facilityData, setFacilityData] = useState([]);
    const [searchedData, setSearchedData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(0)
    const [toggleView, setToggleView] = useState('Facilities');

    const [testSplitData, setTestSplitData] = useState([]);
    const [facilitySplitData, setFacilitySplitData] = useState([]);

    const getFacilities = async () => {
        setLoading(true)

        const response = await fetch('http://localhost:4000'+'/getFacilities', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            const result = await response.json();
            console.log('facilities:', result.data)
            setFacilityData(result.data);
            console.log('facility data', result.data)
            setLoading(false);
        }
    }

    const getTests = async () => {
        setLoading(true)

        const response = await fetch('http://localhost:4000'+'/getTests', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            const result = await response.json();
            console.log('tests:', result.data)
            setTestData(result.data);
            setLoading(false);
        }
    }

    useEffect(() => {
        getFacilities();
        getTests();
    }, [])

    const SplitData = (data) => {
        const pages = Math.ceil(data.length / 12)
        // console.log(`pages: ${pages}`)
        const split = []
        for (let i=0;i<pages;i++){
            let c = data.slice(i*12,(i+1)*12)
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
            <div className='welcome'>
                <h2>Find test or facility</h2>
            </div>

            <div className='wrapper'>
            <input className='search' type='text' placeholder='Search...'/>
            <div className='icon'>
                <IoSearch size={28}/>
            </div>
            <select className='select' value={toggleView} onChange={(e) => setToggleView(e.target.value)}>
                <option value='Facilities'>Facilities</option>
                <option value='Tests'>Tests</option>
            </select>
            </div>


            {!loading && toggleView == 'Facilities' ? (
                <div className='data-container'>
                    <div className='pagination'>
                        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
                        <button onClick={() => setPage(page + 1)} disabled={page === facilitySplitData.length - 1}>Next</button>
                    </div>

                    <div className='viewable-data'>
                        {facilitySplitData[page]?.map((item) => (               
                                    <Card onClick={()=>{navigateInfo(item['id'])}} name={item['name']} address={item['address']}/>                        
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
                        {testSplitData[page]?.map((item) => (               
                                    <Card onClick={()=>{navigateInfo(item['id'])}} name={item['name']} address={item['price']}/>                        
                                ))}
                    </div>
                </div>
            )}

        </section>
    )
}

const HomeExport = () => (
    <div style={{width: '100%', height: '100vh',minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Sidebar />
        <Home />
    </div>
)
export default HomeExport

