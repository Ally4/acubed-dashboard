import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import '../../style/newOrder.css'
import { getTest } from '../../services/dashboardService';
import { createOrder } from '../../services/orderService';
import { getUser } from '../../services/userService';

const NewOrder = (props) => {
    const { register, handleSubmit } = useForm()
    const [testData, setTestData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [facilities, setFacilities] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState('');



    const onSubmit = async () => {
        try {
            const obj = {
                patientId: props.userId,
                patientName: profileData.firstname + ' ' + profileData.lastname,
                patientEmail: profileData.email,
                patientPhone: profileData.phonenumber,
                patientAddress: profileData.address,
                diagnosis: testData.name,
                facilityName: Object.keys(facilities).find(key => facilities[key] === selectedEmail),
                facilityEmail: selectedEmail,
                user: profileData
            }

            const result = await createOrder(obj);

            if (result && result.success) {
                setOrderSuccess('success');
            } else {
                setOrderSuccess('fail');
            }
        } catch (err) {
            console.log('Error creating order:', err)
        }
    }


    const handleFacilityChange = (e) => {
        const facilityName = e.target.value;
        console.log('Selected facility email:', facilities[facilityName]);
        setSelectedEmail(facilities[facilityName] || '');
    };


    const getTestInfo = async () => {
        setLoading(true);
        try {
            const result = await getTest(props.testId)

            if (result) {
                console.log('test data:', result)
                setTestData(result);

                //update the facility Info
                const facilityList = result.facilities;
                const fData = {}
                facilityList.forEach((item) => {
                    fData[item.name] = item.email
                });
                setFacilities(fData);
                setSelectedEmail(Object.values(fData)[0]);
                console.log('facility data:', fData);
            }
        } catch (e) {
            console.error('Error fetching test info:', e)
        } finally {
            setLoading(false);
        }
    }

    const getProfileInfo = async () => {
        try {
            const result = await getUser(props.userId)
            if (result) {
                console.log('profile data:', result)
                setProfileData(result.data);
            }
        } catch (e) {
            console.error('Error fetching profile info:', e)
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
        getProfileInfo()
    },[])

    if (!props.open || props.testId == null || props.userId == null) {
        return null
    } else {
        return (
            <>
                <div className='overlay' onClick={handleOverlayClick}></div>
                <form className='border rounded-lg bg-white flex flex-col items-center justify-center h-auto w-7/12 md:w-1/2 xl:w-4/12 px-3 py-1' id='new-order' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit(onSubmit)}>
                    <div className='close' onClick={props.onClose}>✖</div>
                    <h3 className='mt-4'>New Order</h3>
                    {!profileData || !testData || !facilities ? (<><img src='/spinner-200px-200px.svg' alt="Loading..." /></>)
                    : (
                        <>
                        <div className='w-10/12 mb-2'>
                            <label className='text-lg font-semibold'>Name</label>
                            <p className=' w-full text-base md:text-lg border rounded-md px-3 py-1 border-[#ccc]'>{profileData?.firstname + ' ' + profileData?.lastname}</p>
                        </div>
                        <div className='w-10/12 mb-2'>
                            <label className='text-lg font-semibold'>Email</label>
                            <p className=' w-full text-base md:text-lg border rounded-md px-3 py-1 border-[#ccc]'>{profileData?.email}</p>
                        </div>

                        <div className='w-10/12 mb-2'>
                            <label className='text-lg font-semibold'>Phone Number</label>
                            <p className='w-full text-base md:text-lg border rounded-md px-3 py-1 border-[#ccc]'>{profileData?.phonenumber}</p>
                        </div>
                        <div className='w-10/12 mb-2'>
                            <label className='text-lg font-semibold'>Address</label>
                            <p className='w-full text-base md:text-lg border rounded-md px-3 py-1 border-[#ccc]'>{profileData?.address}</p>
                        </div>

                        <div className='w-10/12 mt-6 mb-2'>
                            <p><span className='text-lg font-semibold'>Test Type:</span> {testData?.name}</p>
                        </div>

                        <div className='w-10/12 mb-3'>
                            <label className='text-lg font-semibold' htmlFor="facilityname">Facility</label>
                            <select className='border rounded-lg px-3 py-1 text-base md:text-lg' id='facilityname' {...register("facilityname")} defaultValue={Object.keys(facilities)[0]} onChange={handleFacilityChange}>
                                {facilities && Object.keys(facilities).map((key) => (
                                    <option key={key} value={key}>{key}</option>
                                ))}
                            </select>
                        </div>
                        <div className='w-10/12 mb-2'>
                            <p className='text-base md:text-lg'>Facility email: {selectedEmail}</p>
                        </div>

                        <div className='w-10/12 mb-3'>
                            <p className='text-base md:text-lg'>Price: {testData?.price}</p>
                        </div>

                        {!orderSuccess && (<button className='text-base xl:text-lg rounded-lg px-3 py-1 mb-6' type="submit">Create Order</button>)}
                        {orderSuccess === 'success' && <p className='response-msg mb-6 font-semibold md:text-xl text-lg' id='success'>Order submitted</p>}
                        {orderSuccess === 'fail' && <p className='response-msg mb-6 font-semibold md:text-xl text-lg' id='error'>Could not complete order</p>}
                        </>
                    )}
                </form>
            </>
        )
    }
}


export default NewOrder