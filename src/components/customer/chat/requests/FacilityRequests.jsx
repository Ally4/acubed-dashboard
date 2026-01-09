import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getRequestableFacilities } from '../../../../services/chatService';
import { PiBuildingApartmentFill } from "react-icons/pi";

const FacilityRequests = (props) => {
    const user = useSelector(state => state.login.data)
    const userId = user ? user.id : null
    const token = user ? user.token : null
    const countryId = user ? user.countryId : null

    const [requestableFacilities, setRequestableFacilities] = useState([])
    const [loading, setLoading] = useState(false)

    const getRequestedFacilities = async () => {
        setLoading(true)
        try {
            const data = await getRequestableFacilities(token,countryId,userId)
            if (data) {
                setRequestableFacilities(data)
            }
        } catch (err) {
            console.log('error getting requestable facilities: ',err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(!token || !userId || !countryId) return
        getRequestedFacilities()

    }, [token,countryId,userId])

    return(
        <>
            {loading ? (<div className='text-base text-gray-400 md:text-lg ml-2'>Loading...</div>) 
            : requestableFacilities.length > 0 ? (requestableFacilities?.map((item,index) => (<div key={index} className='w-full hover:bg-gray-50 border-[var(--light-border-color)] h-20 flex items-center justify-start gap-2 cursor-pointer relative py-2' onClick={() => props.onClick(item)}>
                {item.profilepicture ? (<img src={''}/>) : (
                <div className='border rounded-full h-10 w-10 bg-gray-200 border-[var(--light-border-color)] ml-2 flex items-center justify-center'>
                    <PiBuildingApartmentFill className='text-gray-500 h-7 w-7' />
                </div>)}
                <p className='text-sm md:text-base text-gray-400'>{item.name}</p>
                {/* <MdAddCircleOutline  className='absolute right-1 text-[var(--secondary-color)] h-8 w-8'/> */}
            </div>)))
            : (<div className='text-wrap text-base text-gray-400 text-center mt-16'>No Facilities to request</div>)}
        </>
    )

}

export default FacilityRequests
