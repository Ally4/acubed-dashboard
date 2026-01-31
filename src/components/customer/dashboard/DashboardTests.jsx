import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTests } from '../../../services/dashboardService'
import Card from '../Card'
import '../../../style/Home.css'

const DashboardTests = (props) => {
    const [testData, setTestData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [maxPage,setMaxPage] = useState(12)
    const navigate = useNavigate()


    const fetchTests = async () => {
        setLoading(true)
        try {
            const data = await getTests(page,maxPage,null,props.countryId,props.token)
            if (data) {
                console.log('test data:', data.data);
                    setTestData(data.data);
            }
        } catch (err) {
            console.error('Error getting tests for dashboard')
        } finally {
            setLoading(false)
        }
    }

    const navigateInfo = (id) => {
        console.log(`nav test id=${id}`)
        navigate(`/tests/${id}`)   
    }

    useEffect(() => {
        if (!props.token || props.countryId) return
        fetchTests()
    }, [page,props.countryId,props.token])


    return(
        <div className='w-full p-2 flex items-center justify-center h-auto'>
            {loading ? (<><img src='/secondary_color_spinner.svg' className='w-28 h-28 self-center' alt="Loading..." /></>) :
            (<>

                
                <div className='data-container'>
                    <div className='pagination'>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className='text-sm md:text-base text-[#1c7d7f] bg-[#cadeef] hover:bg-[#bdd5eb] rounded-lg px-3 py-1' onClick={() => setPage(page + 1)} disabled={page === maxPage}>Next</button>
                    </div>
                    <div className='w-11/12 flex items-center justify-center'>
                        <div className='viewable-data'>
                            {testData?.map((item,index) => (               
                                        <Card key={index} onClick={()=>{navigateInfo(item.id)}} name={item.name} facility={item.facility?.name} address={item.price} type={"test"} profile={item.sampleType}/>                        
                                    ))}
                        </div>
                    </div>
                </div>
            
            </>)}
        </div>
    )
}

export default DashboardTests