import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFacilities } from '../../../services/dashboardService'
import Card from '../Card'
import '../../../style/Home.css'

const DashboardFacilities = (props) => {
    const [facilityData, setFacilityData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [maxPage,setMaxPage] = useState(12)
    const navigate = useNavigate()


    const fetchFacilities = async () => {
        setLoading(true)
        try {
            const data = await getFacilities(page,maxPage,null,props.countryId,props.token)
            if (data) {
                console.log('facility data:', data.data);
                    setFacilityData(data.data);
            }
        } catch (err) {
            console.error('Error getting tests for dashboard')
        } finally {
            setLoading(false)
        }
    }

    const navigateInfo = (id) => {
        console.log(`nav facility id=${id}`)
        navigate(`/facilities/${id}`)   
    }

    useEffect(() => {
        if (!props.token || props.countryId) return
        fetchFacilities()
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
                            {facilityData?.map((item,index) => (
                                                <Card key={index} onClick={()=>{navigateInfo(item.id)}} name={item.name} address={item.address} type={"facility"}/>                        
                                        ))}
                        </div>
                    </div>
                </div>
            </>)}

        </div>
    )
}

export default DashboardFacilities