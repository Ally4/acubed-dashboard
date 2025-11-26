import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../../style/newOrder.css'
import { getTest } from '../../services/dashboardService';

const NewOrder = (props) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.data)
    const token = user ? user.token : null
    const { register, handleSubmit } = useForm()
    const [testData, setTestData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [facility, setFacility] = useState('')
    const [facilityId, setFacilityId] = useState('null')
    

    const ToCollection = async (immediate_order) => {
        const obj = {
            testId: props.testId,
            facilityId: facilityId,
            userId: props.userId,
            facilityName: facility,
            testName: testData?.name,
            price_per_pc: testData?.price,
            immediate_order: immediate_order
        }
        if(immediate_order) {
            navigate(`/collection/${facilityId}/${props.testId}/${testData.price}/${props.sampleType}/${testData.name}/order`, { state: obj})
        } else {
            navigate(`/collection/${facilityId}/${props.testId}/${testData.price}/${props.sampleType}/${testData.name}/`, { state: obj})
        }
       
    }

    const getTestInfo = async () => {
        setLoading(true);
        try {
            const result = await getTest(props.testId, token)

            if (result) {
                console.log('test data:', result)
                setTestData(result);

                //update the facility Info
                setFacility(result.facility.name);
                setFacilityId(result.facilityId)
                
            }
        } catch (e) {
            console.error('Error fetching test info:', e)
        } finally {
            setLoading(false);
        }
    }

    const handleOverlayClick = (e) => {
        // Only close if the clicked element is the overlay itself
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    useEffect(() => {
        getTestInfo()
    },[token])

    if (!props.open || props.testId == null || props.userId == null) {
        return null
    } else {
        return (
            <>
                <div className='overlay' onClick={handleOverlayClick}></div>
                <form className='border rounded-lg bg-white flex flex-col items-center justify-center h-auto w-8/12 md:w-1/2 xl:w-4/12 px-3 py-1' id='new-order' onClick={(e) => e.stopPropagation()}>
                    <div className='w-full flex items-center justify-end h-auto gap-3 px-3 mt-2'>
                        {/* <div className='flex items-center justify-center w-auto gap-2'>
                            <p className='text-[var(--secondary-color)] font-medium text-base md:text-lg xl:text-xl'>Quantity:</p>
                            <input className='border h-8 w-14 mt-3 border-[var(--secondary-color)] focus:outline-none hover:outline-none' type='number' min={1} max={10} value={qty} onChange={(e) => setQty(e.target.value)} />
                        </div> */}
                        <button className='text-[var(--secondary-color)] bg-[#ebeff3] hover:bg-[#e0eaf4] font-medium text-base xl:text-lg px-3 py-1' onClick={()=>ToCollection(false)}>Add</button>
                        <p className='h-9 w-9 flex items-center justify-center rounded-md bg-[#a3b1c0] text-white cursor-pointer' onClick={props.onClose}>✖</p>
                        </div>
                    {!testData ? (<><img src='/secondary_color_spinner.svg' className='h-20 w-20' alt="Loading..." /></>)
                    : (
                        <>
                        <h3 className='mt-4 mb-3 font-semibold text-3xl md:text-4xl xl:5xl'>{testData.name}</h3>

                        <div className='w-11/12 mb-2 flex flex-col items-center justify-center px-2 py-1'>
                            <h3 className='font-semibold text-lg md:text-xl text-[var(--secondary-color)]'>Facility: {testData?.facility.name}</h3>

                            <div className='mb-3 w-full flex items-center justify-between'>
                                <p className='text-[var(--secondary-color)] font-medium text-lg'>Price:</p> 
                                <span className='text-[var(--secondary-color)] font-semibold text-xl'>{testData.price} {testData.currency}</span>
                            </div>
                            <div className='mb-3 w-full flex items-center justify-between'>
                                <p className='text-[var(--secondary-color)] font-medium text-lg'>Turn around time:</p> 
                                <span className='text-[var(--secondary-color)] font-semibold text-xl'>{testData.turnaroundTime}</span>
                            </div>
                            <button className='w-full text-white bg-[#1c7d7f] hover:bg-opacity-80 rounded-md font-semibold text-xl md:text-2xl py-2 mt-2 mb-4' onClick={()=>ToCollection(true)}>Order</button>
                        </div>
                        </>
                    )}
                </form>
            </>
        )
    }
}


export default NewOrder