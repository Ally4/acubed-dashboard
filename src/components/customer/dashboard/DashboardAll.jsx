import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { iconAssigner } from '../../../utils/imageUtils'
import { getTests, getFacilities } from '../../../services/dashboardService'
import '../../../style/Home.css'
import SearchModal from './SearchModal'


const DashboardAll = (props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [quickTests, setQuickTests] = useState([])
    const [quickFacilities, setQuickFacilities] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const [tests, facilities] = await Promise.all([
                getTests(1,8,null,props.countryId,props.token),
                getFacilities(1,8,null,props.countryId,props.token)
            ])

            if (tests) {
                setQuickTests(tests.data.slice(0,7))
            }
            if (facilities) {
                setQuickFacilities(facilities.data.slice(0,7))
            }
        } catch (err) {
            console.error('Error loading dashboard all page: ',err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!props.token || !props.countryId) return
        fetchData()
    }, [props.countryId, props.token])

    useEffect(() => {
        if (!props.token || !props.countryId || !props.searchTerm) return
        setModalOpen(true)
    },[props.searchTerm])

    return(
        <>
            {modalOpen && <SearchModal token={props.token} countryId={props.countryId} searchTerm={props.searchTerm} onClose={()=>{
                setModalOpen(false)
                props.closeModal()
            }} />} 
            {loading ? (<img src='\secondary_color_spinner.svg' className="w-28 h-28 self-center"
            alt="Loading..." />) :
            (
                <div className='data-container'>
                    <div className="w-11/12 rounded-lg bg-[#1c7d7f] bg-opacity-15 pt-8 min-h-80 h-auto flex items-center justify-center mb-6 relative">
                        <h3 className='absolute top-2 left-3 ml-2 text-[#1c7d7f] font-medium text-lg lg:text-xl xl:text-2xl mb-0'>Quick Lab Tests</h3>
                        {quickTests.length > 0 ? (<div className='w-full px-2 py-5 rounded-lg min-h-80 h-auto shadow-md grid xl:grid-cols-4 grid-cols-2 gap-6 xl:gap-4 overflow-y-auto'>
                            {quickTests.map((item,index) => {
                                return(
                                    <div key={index} className='flex flex-col gap-1 items-center justify-center cursor-pointer w-full' onClick={()=>navigate(`/facilities/test/${item.name}/${item.sampleType}/${item.id}`)}>
                                        {iconAssigner(item.sampleType,80,"test")}
                                        <p className='font-semibold text-[#1c7d7f] text-lg text-center xl:text-xl truncate'>{item.name}</p>
                                    </div>
                                )
                            })}
                            <div className='flex items-center justify-center cursor-pointer w-full' onClick={()=>props.moreTests()}>
                                <p className='font-semibold text-[#1c7d7f] text-xl lg:text-2xl xl:text-3xl'>More</p>
                            </div>

                        </div>) : <h3 className="text-base md:text-lg xl:text-xl 2xl:text-2xl font-semibold text-[var(--secondary-color)]">Could not load quick lab tests</h3>}
                    </div>

                    <div className="w-11/12 rounded-lg bg-[#1c7d7f] bg-opacity-15 pt-8 min-h-80 h-auto flex items-center justify-center mb-6 mt-6 relative">
                        <h3 className='absolute top-2 left-3 ml-2 text-[#1c7d7f] font-medium text-lg lg:text-xl xl:text-2xl mb-0'>Quick Facilities</h3>
                        {quickFacilities.length > 0 ? (<div className='w-full px-2 py-5 rounded-lg min-h-80 h-auto shadow-md grid xl:grid-cols-4 grid-cols-2 gap-6 xl:gap-4 overflow-y-auto'>
                            {quickFacilities?.map((item,index) => {
                                return(
                                    <div key={index} className='flex flex-col gap-1 items-center justify-center cursor-pointer w-full' onClick={()=>navigate(`/facility/${item.id}`)}>
                                        {iconAssigner("facility",32,"facility")}
                                        <p className='font-semibold text-[#1c7d7f] text-lg text-center xl:text-xl truncate'>{item.name}</p>
                                    </div>
                                )
                            })}
                            <div className='flex items-center justify-center cursor-pointer w-full' onClick={()=>props.moreFacilities()}>
                                <p className='font-semibold text-[#1c7d7f] text-xl lg:text-2xl xl:text-3xl'>More</p>
                            </div>

                        </div>) : <h3 className="text-base md:text-lg xl:text-xl 2xl:text-2xl font-semibold text-[var(--secondary-color)]">Could not load quick facilities</h3>}
                    </div>
                </div>
            )}
        </>
    )
}

export default DashboardAll