import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { iconAssigner } from '../../../utils/imageUtils'
import { getTests, getFacilities } from '../../../services/dashboardService'
import { FaPlus } from "react-icons/fa";
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
                getFacilities(1,8,null,props.countryId,props.token,props.geoLocation)
            ])

            if (tests) {
                const uniqueItems = tests.data?.filter((item, index, self) =>
                    index === self.findIndex(obj => obj.name.toLowerCase().trim() === item.name.toLowerCase().trim())
                    );
                setQuickTests(uniqueItems.slice(0,7))
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
                    <div className="w-11/12 rounded-lg bg-[#1c7d7f] bg-opacity-15 pt-8 px-2 sm:px-0 min-h-80 h-auto flex items-center justify-center mb-6 relative">
                        <h3 className='absolute top-2 left-3 ml-2 text-[#1c7d7f] font-medium text-lg lg:text-xl xl:text-2xl mb-2'>Quick Lab Tests</h3>
                        {quickTests.length > 0 ? (<div className='w-full mt-2 py-5 rounded-lg min-h-80 h-auto grid xl:grid-cols-4 grid-cols-2 gap-6 xl:gap-4 overflow-y-auto place-items-center'>
                            {quickTests.map((item,index) => {
                                return(
                                    <div key={index} className='flex flex-col gap-1 items-center justify-center cursor-pointer w-full p-1' onClick={()=>navigate(`/facilities/test/${item.name}/${item.sampleType}/${item.id}`)}>
                                        {iconAssigner(item.sampleType,55,"test")}
                                        <p className='font-semibold text-[#1c7d7f] text-sm sm:text-base text-center xl:text-lg truncate'>{item.name}</p>
                                    </div>
                                )
                            })}
                            <div className='flex flex-col gap-1 items-center justify-center cursor-pointer w-full h-full' onClick={()=>props.moreTests()}>
                                <FaPlus className='text-[#1c7d7f] h-8 w-8' />
                                <p className='font-semibold text-[#1c7d7f] text-base md:text-lg text-center xl:text-xl'>More</p>
                            </div>

                        </div>) : <h3 className="text-base md:text-lg xl:text-xl 2xl:text-2xl font-semibold text-[var(--secondary-color)]">Could not load quick lab tests</h3>}
                    </div>

                    <div className="w-11/12 rounded-lg bg-[#1c7d7f] bg-opacity-15 pt-8 px-2 sm:px-0 min-h-80 h-auto flex items-center justify-center mb-6 mt-6 relative">
                        <h3 className='absolute top-2 left-3 ml-2 text-[#1c7d7f] font-medium text-lg lg:text-xl xl:text-2xl mb-2'>Quick Facilities</h3>
                        {quickFacilities.length > 0 ? (<div className='w-full mt-2 py-5 rounded-lg min-h-80 h-auto grid xl:grid-cols-4 grid-cols-2 gap-6 xl:gap-4 overflow-y-auto place-items-center'>
                            {quickFacilities?.map((item,index) => {
                                return(
                                    <div key={index} className='flex py-3 sm:p-0 flex-col gap-1 px-1 items-center justify-center cursor-pointer w-full max-w-56 h-full max-h-56 aspect-1 bg-[#1c7d7f] hover:bg-opacity-80 rounded-md' onClick={()=>navigate(`/facility/${item.id}`)}>
                                        {iconAssigner("facility",24,"facility")}
                                        <p className='font-medium text-white text-sm sm:text-base text-center truncate'>{item.name}</p>
                                    </div>
                                )
                            })}
                            <div className='flex flex-col items-center justify-center cursor-pointer w-full max-w-56 h-full max-h-56 aspect-1 gap-1' onClick={()=>props.moreFacilities()}>
                                <FaPlus className='text-[#1c7d7f] h-8 w-8' />
                                <p className='font-semibold text-[#1c7d7f] text-base md:text-lg text-center xl:text-xl'>More</p>
                            </div>

                        </div>) : <h3 className="text-base md:text-lg xl:text-xl 2xl:text-2xl font-semibold text-[var(--secondary-color)]">Could not load quick facilities</h3>}
                    </div>
                </div>
            )}
        </>
    )
}

export default DashboardAll