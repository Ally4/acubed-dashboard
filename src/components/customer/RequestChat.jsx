import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getRequestableFacilities } from '../../services/chatService';
import { PiBuildingApartmentFill } from "react-icons/pi";
import { submitFacilityChatRequest } from '../../services/chatService';


const RequestChat = (props) => {
    const user = useSelector(state => state.login.data)
    const countryId = user ? user.countryId : null;
    const userId = user ? user.id : null;
    const name = user ? user.username : ''
    const token = user ? user.token : null

    const [requestableFacilities, setRequestableFacilities] = useState([])
    const [selectedFacility, setSelectedFacility] = useState(null)
    const [loading, setLoading] = useState(false)
    const [requestLoading, setRequestLoading] = useState(false)
    const [requestSuccess, setRequestSuccess] = useState(null)
    const [requestMessage, setRequestMessage] = useState('')

    const handleMessageChange = (e) => {
        setRequestMessage(e.target.value)
    }

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

    const submitRequest = async (facilityId) => {
        setRequestLoading(true)
        const obj = {
            message: requestMessage,
            facilityId: facilityId
        }
        try {
            const result = await submitFacilityChatRequest(token,obj)
            if (result.success) {
                setRequestSuccess(true)
            } else {
                setRequestSuccess(false)
            }
        } catch (err) {
            setRequestSuccess(false)
        } finally {
            setRequestLoading(false)
        }
    }

    useEffect(() => {
        if(!token || !userId || !countryId) return
        getRequestedFacilities()

    }, [token,countryId,userId])

    return(
        <div className='min-w-full min-h-full  grid grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] lg:rounded-br-lg lg:rounded-bl-lg'>
            {/*Message Request */}
            
                <div className='h-full w-full border-r border-[var(--light-border-color)] overflow-y-auto'>
                    {loading ? (<div className='text-base text-gray-400 md:text-lg ml-2'>Loading...</div>) 
                    : requestableFacilities ? (requestableFacilities?.map((item,index) => (<div key={index} className='w-full hover:bg-gray-50 border-[var(--light-border-color)] h-20 flex items-center justify-start gap-2 cursor-pointer relative' onClick={()=>setSelectedFacility(item)}>
                        {item.profilepicture ? (<img src={''}/>) : (
                        <div className='border rounded-full h-10 w-10 bg-gray-200 border-[var(--light-border-color)] ml-2 flex items-center justify-center'>
                            <PiBuildingApartmentFill className='text-gray-500 h-7 w-7' />
                        </div>)}
                        <p className='text-sm md:text-base text-gray-400'>{item.name}</p>
                        {/* <MdAddCircleOutline  className='absolute right-1 text-[var(--secondary-color)] h-8 w-8'/> */}
                    </div>)))
                    : (<div className='text-wrap text-base text-gray-400 text-center'>No Facilities to request</div>)}
                    

                </div>
                <div className='w-full h-full flex flex-col items-center justify-center gap-1 px-6'>
                        {selectedFacility == null ? (<div className='text-lg md:text-xl text-gray-500'>Select a facility to make a request</div>) 
                        :
                         (<div className='flex flex-col items-center justify-center h-auto mb-3 w-full'>
                            <h3 className='text-gray-500 text-lg md:text-xl font-medium'>{selectedFacility?.name}</h3>
                            <input type='text' placeholder='Enter request message' className='focus:outline-none border border-[var(--light-border-color)] w-full md:w-10/12 mb-4 px-2 py-2 rounded-md' onChange={handleMessageChange}/>
                            <button onClick={()=>submitRequest(selectedFacility.id)} className='text-white flex items-center justify-center w-11/12 md:w-10/12'>
                                {requestLoading ? <img src='/gray_spinner.svg' className='m-0 h-8 w-8 p-0' /> : "Submit Chat Request"}
                                </button>
                            </div>)}

                            {requestSuccess == false && <p className='text-base text-red-500 font-medium md:text-lg'>Failed to submit request</p>}
                            {requestSuccess == true && <p className='text-base text-green-500 font-medium md:text-lg'>Request Made Successfully</p>}
                </div>

        </div>
    )
}

export default RequestChat