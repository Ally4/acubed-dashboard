import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { submitFacilityChatRequest, getRequestableFacilities } from '../../../services/chatService';

import FacilityRequests from './requests/FacilityRequests'

const RequestChat = (props) => {
    const user = useSelector(state => state.login.data)
    const countryId = user ? user.countryId : null;
    const userId = user ? user.id : null;
    const name = user ? user.username : ''
    const token = user ? user.token : null

    const [showFacilities, setShowFacilities] = useState(false)
    const [showDeliveries, setShowDeliveries] = useState(false)
    const [selectedFacility, setSelectedFacility] = useState(null)
    const [loading, setLoading] = useState(false)
    const [requestLoading, setRequestLoading] = useState(false)
    const [requestSuccess, setRequestSuccess] = useState(null)
    const [requestMessage, setRequestMessage] = useState('')

    const handleMessageChange = (e) => {
        setRequestMessage(e.target.value)
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


    return(
        <div className='min-w-full min-h-96 h-full md:h-[450px] lg:h-[500px] grid grid-cols-[18 0px_1fr] md:grid-cols-[210px_1fr] lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr] lg:rounded-br-lg lg:rounded-bl-lg'>
            {/*Message Request */}
            
                <div className='h-full w-full border-r border-[var(--light-border-color)] overflow-y-auto flex flex-col items-center justify-start'>
                    <div className='w-full h-10 border-b border-[var(--light-border-color)] flex items-center justify-between px-3 py-2'>
                        <p className='text-base md:text-lg text-gray-500'>Facilities</p>
                        {!showFacilities ? <IoIosArrowUp className='text-gray-400 h-7 w-7 cursor-pointer' onClick={()=>setShowFacilities(true)} /> : <IoIosArrowDown className='text-gray-400 h-7 w-7 cursor-pointer' onClick={()=> setShowFacilities(false)} />}
                    </div>
                    {showFacilities && <FacilityRequests onClick={(item)=>{
                        setRequestSuccess(null)
                    setRequestMessage('')
                    setSelectedFacility(item)
                    }} />}
                    <div className='w-full h-10 border-b border-t border-[var(--light-border-color)] flex items-center justify-between px-3 py-2'>
                        <p className='text-base md:text-lg text-gray-500'>Deliveries</p>
                        {!showDeliveries ? <IoIosArrowUp className='text-gray-400 h-7 w-7 cursor-pointer' onClick={()=>setShowDeliveries(true)} /> : <IoIosArrowDown className='text-gray-400 h-7 w-7 cursor-pointer' onClick={()=> setShowDeliveries(false)} />}
                    </div>

                </div>
                <div className='w-full h-full flex flex-col items-center justify-center gap-1 px-6'>
                        {selectedFacility == null ? (<div className='text-gray-400 text-base xl:text-lg '>Select a facility to make a request</div>) 
                        : selectedFacility?.requested ? (<div className="flex flex-col items-center justify-center h-auto mb-3 w-full">
                                <h3 className='text-gray-500 text-lg md:text-xl font-medium'>{selectedFacility?.name}</h3>
                                <p className="text-[var(--secondary-color)] text-base xl:text-lg">A chat request has an already been made for this facility.</p>
                        </div>) 
                        :
                         (<div className='flex flex-col items-center justify-center h-auto mb-3 w-full'>
                            <h3 className='text-gray-500 text-lg md:text-xl font-medium'>{selectedFacility?.name}</h3>
                            {requestSuccess != true && (<>
                                <input type='text' placeholder='Enter request message' className='focus:outline-none border border-[var(--light-border-color)] w-full md:w-10/12 mb-4 px-2 py-2 rounded-md' onChange={handleMessageChange}/>
                                <button onClick={()=>submitRequest(selectedFacility.id)} className='text-white flex items-center justify-center w-11/12 md:w-10/12'>
                                    {requestLoading ? <img src='/gray_spinner.svg' className='m-0 h-8 w-8 p-0' /> : "Submit Chat Request"}
                                </button></>)}
                            </div>)}

                            {requestSuccess == false && <p className='text-base text-red-500 font-medium md:text-lg'>Failed to submit request</p>}
                            {requestSuccess == true && <p className='text-base text-green-500 font-medium md:text-lg'>Request Made Successfully</p>}
                </div>

        </div>
    )
}

export default RequestChat